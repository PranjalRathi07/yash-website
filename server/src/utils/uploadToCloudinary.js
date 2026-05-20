/** @format */

import cloudinary from "../config/cloudinary.js";

export const uploadToCloudinary = (fileBuffer, folderName) => {
	return new Promise((resolve, reject) => {
		const uploadStream = cloudinary.uploader.upload_stream(
			{
				folder: folderName,
				resource_type: "image",
			},
			(error, result) => {
				if (error) {
					reject(error);
				} else {
					resolve(result);
				}
			},
		);

		uploadStream.end(fileBuffer);
	});
};
