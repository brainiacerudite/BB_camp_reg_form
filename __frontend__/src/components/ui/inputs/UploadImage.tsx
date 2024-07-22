import React, { useRef } from "react";
import { IoCloudUploadSharp } from "react-icons/io5";
import images from "../../../constants/images";

interface UploadImageProps {
  image: string | null;
  setImage: (image: string | null) => void;
}

const UploadImage = ({ image, setImage }: UploadImageProps) => {
  //   const [image, setImage] = useState<string | null>(null);

  // Function to handle when a file is selected
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImage = event.target.files ? event.target.files[0] : null;

    if (selectedImage) {
      // Validate selected file type
      if (!selectedImage.type.startsWith("image/")) {
        console.error("Invalid file type. Please select an image.");
        return;
      }

      try {
        setImage(URL.createObjectURL(selectedImage));
      } catch (error) {
        console.error("Error creating image URL:", error);
      }
    }
  };

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Function to handle when the default image is clicked
  const handleDefaultImageClick = () => {
    // Trigger input file click event
    fileInputRef.current?.click();
  };

  return (
    <div className="">
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
    </div>
  );
};

export default UploadImage;
