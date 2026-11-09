import {
  CLOUDINARY_UPLOAD_URL,
  CLOUDINARY_UPLOAD_PRESET
} from "../firebase/cloudinaryConfig";

export const uploadImageToCloudinary = async (file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

  const res = await fetch(CLOUDINARY_UPLOAD_URL, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  return data.secure_url;
};
