/** @format */

/**
 * Generic Zod validation middleware for Express requests.
 * Validates req.body, req.query, or req.params and sanitizes data.
 */
export const validateBody = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.body);

	if (!result.success) {
		const formattedErrors = result.error.errors.map((err) => ({
			field: err.path.join("."),
			message: err.message,
		}));

		return res.status(400).json({
			success: false,
			message: formattedErrors[0]?.message || "Invalid input data",
			errors: formattedErrors,
		});
	}

	req.body = result.data;
	next();
};

export const validateQuery = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.query);

	if (!result.success) {
		const formattedErrors = result.error.errors.map((err) => ({
			field: err.path.join("."),
			message: err.message,
		}));

		return res.status(400).json({
			success: false,
			message: formattedErrors[0]?.message || "Invalid query parameters",
			errors: formattedErrors,
		});
	}

	req.query = result.data;
	next();
};

export const validateParams = (schema) => (req, res, next) => {
	const result = schema.safeParse(req.params);

	if (!result.success) {
		const formattedErrors = result.error.errors.map((err) => ({
			field: err.path.join("."),
			message: err.message,
		}));

		return res.status(400).json({
			success: false,
			message: formattedErrors[0]?.message || "Invalid URL parameters",
			errors: formattedErrors,
		});
	}

	req.params = result.data;
	next();
};
