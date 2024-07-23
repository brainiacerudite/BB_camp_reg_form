import { useState, ChangeEvent } from "react";
import useInput from "react-lite-input";
import LabelInput from "../ui/inputs/LabelInput";
import UploadImage from "../ui/inputs/UploadImage";
import LabelSelect from "../ui/inputs/LabelSelect";
import SolidButton from "../ui/buttons/SolidButton";
import apiClient from "../../libs/apiClient";
import SuccessMessage from "../hi-fi/SuccessMessage";

const RegisterForm = () => {
  const [image, setImage] = useState<string | null>(null);
  const [companyOtherValue, setCompanyOtherValue] = useState("");

  const initialValues = {
    name: "",
    email: "",
    phone: "",
    guardian_name: "",
    guardian_number: "",
  };
  const { values, handleLiteChange } = useInput(initialValues);

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSection, setSelectedSection] = useState("");

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
  ];

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGender(value);
  };

  const companyOptions = [
    { value: "Brainiacerudite", label: "Brainiacerudite" },
    { value: "YourmixJNR", label: "YourmixJNR" },
    { value: "Other", label: "Other" },
  ];

  const sectionOptions = [
    { value: "", label: "Select Your Section" },
    { value: "anchor", label: "Anchor Section" },
    { value: "junior", label: "Junior Section" },
    { value: "company", label: "Company Section" },
    { value: "senior", label: "Senior Section" },
    { value: "officer", label: "Officer" },
    { value: "newmember", label: "New Member" },
  ];

  const handleCompanyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCompany(value);
  };

  const handleCompanyOtherValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCompanyOtherValue(value);
  };

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSection(value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registrationData = {
      image,
      ...values,
      gender: selectedGender,
      company: selectedCompany,
      section: selectedSection,
    };
    try {
      await apiClient.post("/register", registrationData);
      return <SuccessMessage />;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full min-h-[100svh] relative bg-cover bg-center flex justify-center pt-20 px-4 bg-defaultBgImage">
      <div className="w-full text-center">
        <div className="md:inline-block md:mx-auto">
          <div className="px-8 py-16 border-gradient rounded-2xl bg-bgGlassMorphism backdrop-blur-sm lg:px-12">
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center justify-center flex-col space-y-4 text-left md:w-[488px] lg:space-y-8"
            >
              <UploadImage image={image} setImage={setImage} />
              <div className="w-full space-y-4 lg:space-y-6">
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
                  options={genderOptions}
                  selectedOption={selectedGender}
                  onChange={handleGenderChange}
                />
                <LabelInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleLiteChange}
                />
                <LabelInput
                  id="phone"
                  name="phone"
                  type="number"
                  label="Your Phone Number"
                  placeholder="Phone Number"
                  value={values.number}
                  onChange={handleLiteChange}
                />
                <LabelInput
                  id="guardian_name"
                  name="guardian_name"
                  type="text"
                  label="Your Guardian Name"
                  placeholder="Guardian Name"
                  value={values.guardian_name}
                  onChange={handleLiteChange}
                />
                <LabelInput
                  id="guardian_number"
                  name="guardian_number"
                  type="number"
                  label="Your Guardian Phone Number"
                  placeholder="Guardian Phone Number"
                  value={values.guardian_number}
                  onChange={handleLiteChange}
                />
                <LabelSelect
                  id="company"
                  name="company"
                  label="Company"
                  options={companyOptions}
                  selectedOption={selectedCompany}
                  onChange={handleCompanyChange}
                  inputId="companyId"
                  inputName="companyId"
                  otherValue={companyOtherValue}
                  inputChange={handleCompanyOtherValue}
                />
                <LabelSelect
                  id="section"
                  name="section"
                  label="Section"
                  options={sectionOptions}
                  selectedOption={selectedSection}
                  onChange={handleSectionChange}
                />
              </div>
              <div className="w-full relative">
                <SolidButton type="submit" text="SUBMIT" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
