"use client";

import { Plus, X } from "lucide-react";
import React, { useEffect } from "react";

const ImageUploader = React.forwardRef(function ImageUploader(
  { imageUrl, onChange, width = 167, height = 167 },
  ref
) {
  const [image, setImage] = React.useState(imageUrl);

  const handleRemoveImage = (e) => {
    e.preventDefault();
    setImage("");
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImage(reader.result);
    };
    reader.readAsDataURL(file);
    onChange({ url: reader.result, file });
  };

  useEffect(() => {
    if (imageUrl) {
      setImage(imageUrl);
    }
  }, [imageUrl]);

  return (
    <div
      className="relative group"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <input
        type="file"
        id="image-uploader"
        accept="image/*"
        className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
        onChange={handleImageChange}
      />
      {image && (
        <button
          className="absolute flex items-center justify-center p-1 cursor-pointer
                -top-1 -right-1 size-6 rounded-full bg-util-red"
          onClick={handleRemoveImage}
        >
          <X className="text-util-white" />
        </button>
      )}
      <label
        htmlFor="image-uploader"
        className="w-full h-full flex items-center justify-center"
      >
        <div className="bg-gray-200 group-hover:bg-gray-300 rounded-sm w-full h-full flex flex-col items-center justify-center gap-2 overflow-hidden">
          {image ? (
            <img src={image} alt="" className="w-full h-full object-cover" />
          ) : (
            <>
              <Plus className="size-4 text-orange-500" />
              <p className="text-orange-500 text-sm">Upload photo</p>
            </>
          )}
        </div>
      </label>
    </div>
  );
});

export default ImageUploader;
