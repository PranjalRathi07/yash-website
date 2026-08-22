/** @format */

import Redis from "ioredis";

// In-memory fallback store when Redis URL is not provided or connection fails
const memoryStore = new Map();

let redis = null;
let isRedisReady = false;

const redisUrl = process.env.REDIS_URL;

if (redisUrl) {
	try {
		redis = new Redis(redisUrl, {
			maxRetriesPerRequest: 1,
			retryStrategy(times) {
				if (times > 3) {
					console.warn("Redis unavailable, falling back to in-memory cache.");
					return null; 
				}
				return Math.min(times * 200, 1000);
			},
			lazyConnect: true,
		});

		redis.connect().catch((err) => {
			console.warn("Redis connection failed:", err.message);
		});

		redis.on("connect", () => {
			isRedisReady = true;
			console.log("Redis connected successfully");
		});

		redis.on("error", (err) => {
			isRedisReady = false;
			console.warn("Redis error, using in-memory cache fallback:", err.message);
		});

		redis.on("close", () => {
			isRedisReady = false;
		});
	} catch (err) {
		console.warn("Failed to initialize Redis client:", err.message);
	}
} else {
	console.log("No REDIS_URL configured; using high-performance in-memory cache.");
}


export const getCache = async (key) => {
	try {
		if (isRedisReady && redis) {
			const data = await redis.get(key);
			return data ? JSON.parse(data) : null;
		}

		// In-memory fallback
		const entry = memoryStore.get(key);
		if (entry) {
			if (Date.now() < entry.expiry) {
				return entry.value;
			}
			memoryStore.delete(key);
		}
		return null;
	} catch (error) {
		console.error(`Cache get error for key "${key}":`, error.message);
		return null;
	}
};

export const setCache = async (key, value, ttlInSeconds = 600) => {
	try {
		if (isRedisReady && redis) {
			await redis.set(key, JSON.stringify(value), "EX", ttlInSeconds);
			return;
		}

		// In-memory fallback
		memoryStore.set(key, {
			value,
			expiry: Date.now() + ttlInSeconds * 1000,
		});

		// Clean stale memory entries if store grows
		if (memoryStore.size > 1000) {
			const now = Date.now();
			for (const [k, v] of memoryStore.entries()) {
				if (now >= v.expiry) {
					memoryStore.delete(k);
				}
			}
		}
	} catch (error) {
		console.error(`Cache set error for key "${key}":`, error.message);
	}
};


export const deleteCache = async (patternOrKey) => {
	try {
		if (isRedisReady && redis) {
			if (patternOrKey.includes("*")) {
				const keys = await redis.keys(patternOrKey);
				if (keys.length > 0) {
					await redis.del(...keys);
				}
			} else {
				await redis.del(patternOrKey);
			}
			return;
		}

		// In-memory fallback
		if (patternOrKey.includes("*")) {
			const prefix = patternOrKey.replace("*", "");
			for (const key of memoryStore.keys()) {
				if (key.startsWith(prefix)) {
					memoryStore.delete(key);
				}
			}
		} else {
			memoryStore.delete(patternOrKey);
		}
	} catch (error) {
		console.error(`Cache delete error for "${patternOrKey}":`, error.message);
	}
};


export const setHttpCacheHeaders = (res, maxAgeSeconds = 300) => {
	res.set("Cache-Control", `public, max-age=${maxAgeSeconds}, stale-while-revalidate=60`);
};

export default {
	getCache,
	setCache,
	deleteCache,
	setHttpCacheHeaders,
};
