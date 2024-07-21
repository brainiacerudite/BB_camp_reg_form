import { useState, ChangeEvent } from "react";
import useInput from "react-lite-input";
import LabelInput from "../ui/inputs/LabelInput";
import UploadImage from "../ui/inputs/UploadImage";
import LabelSelect from "../ui/inputs/LabelSelect";

const RegisterForm = () => {
  const [image, setImage] = useState<string | null>(null);

  const [selectedOption, setSelectedOption] = useState("");
  const initValues = {
    name: "",
    email: "",
    description: "",
  };

  const { values, handleLiteChange } = useInput(initValues);

  const options = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedOption(value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(image);
  };

  return (
    <div className="w-full min-h-[100svh] relative bg-cover bg-center pt-20 px-4 bg-defaultBgImage">
      <div className="px-8 py-16 border-gradient rounded-2xl bg-bgGlassMorphism backdrop-blur-sm">
        <form
          onSubmit={handleSubmit}
          className="w-full flex items-center justify-center flex-col gap-6"
        >
          <UploadImage image={image} setImage={setImage} />
          <div className="space-y-4">
            <LabelInput
              id="name"
              name="name"
              type="text"
              label="Your Full Name"
              placeholder="Name"
              value={values.name}
              onChange={handleLiteChange}
            />
            <LabelSelect
              id="gender"
              name="gender"
              label="Gender"
              options={options}
              selectedOption={selectedOption}
              handleSelectChange={handleSelectChange}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
