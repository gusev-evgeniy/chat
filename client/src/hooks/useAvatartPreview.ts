import { useEffect, useState } from 'react';

export const useAvatartPreview = (photo: File | null) => {
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    if (!photo) {
      setPreview(null);
      return;
    }
    const objectUrl = URL.createObjectURL(photo);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [photo]);

  return {
    preview,
  };
};
