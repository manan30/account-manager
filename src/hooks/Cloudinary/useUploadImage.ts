import { useState } from 'react';
import axios, { Response } from 'redaxios';

const CLOUDINARY_UPLOAD_URL =
  'https://api.cloudinary.com/v1_1/wave-studios/upload';

export type CloudinaryResponse = {
  asset_id: string;
  public_id: string;
  version: number;
  version_id: string;
  signature: string;
  width: number;
  height: number;
  format: string;
  resource_type: string;
  created_at: Date;
  bytes: number;
  type: string;
  etag: string;
  placeholder: boolean;
  url: string;
  secure_url: string;
  access_mode: string;
  existing: boolean;
  original_filename: string;
};

export const useUploadImage = () => {
  const [data, setData] = useState<Response<CloudinaryResponse> | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const formData = new FormData();

  const handleImageUpload = (file: File) => {
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default');

    setLoading(true);

    axios
      .post(CLOUDINARY_UPLOAD_URL, formData)
      .then((data) => setData(data.data))
      .catch((err) => {
        console.error(err);
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { data, loading, error, handleImageUpload };
};
