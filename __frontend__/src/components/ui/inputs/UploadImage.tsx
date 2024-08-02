import React, { useRef } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import images from "../../../constants/images";

interface UploadImageProps {
  image: string | null;
  setImage: (image: string | null) => void;
  hasError?: boolean;
  errorMessage?: string | null;
}

const UploadImage = ({
  image,
  setImage,
  hasError,
  errorMessage,
}: UploadImageProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];

    if (!selectedFile) {
      return; // Handle no file selected case
    }

    if (!selectedFile.type.startsWith("image/")) {
      console.error("Invalid file type. Please select an image.");
      return;
    }

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (!e.target?.result) {
        console.error("Error reading image file.");
        return;
      }

      const imageDataUrl = e.target.result as string;

      // Update state with the image data URL
      setImage(imageDataUrl);
    };

    reader.readAsDataURL(selectedFile);
  };

  const handleDefaultImageClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center">
      <label htmlFor="imageInput" className="sr-only">
        Image
      </label>
      <input
        type="file"
        id="imageInput"
        className="hidden"
        onChange={handleImageChange}
        ref={fileInputRef}
      />
      <div className="w-fit h-auto border-gradient before:!rounded-full p-0.5">
        <div className="">
          <img
            src={image || images.avatar.src}
            alt={images.avatar.alt}
            className="relative w-24 h-24 object-center object-cover rounded-full cursor-pointer"
            onClick={handleDefaultImageClick}
          />
        </div>
        <span
          className="absolute right-0 bottom-0 text-2xl font-bold text-white opacity-80 cursor-pointer"
          onClick={handleDefaultImageClick}
        >
          <IoCloudUploadSharp />
        </span>
      </div>
      {hasError && (
        <span className="relative text-sm text-red-400 font-medium ml-2 pt-1">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default UploadImage;
