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

  interface Errors {
    [key: string]: string | null;
  }
  const [errors, setErrors] = useState<Errors>({});

  const [companyOtherValue, setCompanyOtherValue] = useState("");
  const [success, setSuccess] = useState<boolean>(false);

  const initialValues = {
    surname: "",
    firstname: "",
    middlename: "",
    email: "",
    phone: "",
    guardian_name: "",
    guardian_number: "",
  };
  const { values, handleLiteChange } = useInput(initialValues);

  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [showOtherInput, setShowOtherInput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const genderOptions = [
    { value: "", label: "Select Your Gender" },
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Other" },
  ];

  const handleGenderChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedGender(value);
  };

  const companyOptions = [
    { value: "", label: "Select Company / Church" },
    {
      value: "1st",
      label: "1st Ogbomoso Coy St. David Anglican Church, Agbonin",
    },
    {
      value: "4th",
      label: "4th Ogbomoso Coy St. Stephen Anglican Church, Isale-Alasa",
    },
    {
      value: "14th",
      label: "14th Ogbomoso Coy St. Michael Anglican Church, Ayegun",
    },
    {
      value: "17th",
      label: "17th Ogbomoso Coy Salvation Anglican Church, Papa Adeyemo",
    },
    {
      value: "16th",
      label: "16th Ogbomoso Coy Christ Anglican Church, Kajola",
    },
    {
      value: "30th",
      label: "30th Ogbomoso Coy All Saints Anglican Church, Apake",
    },
    {
      value: "32nd",
      label: "32nd Ogbomoso Coy St. Paul Anglican Church, Iresaapa",
    },
    {
      value: "41st",
      label: "41st Ogbomoso Coy St. Peter Anglican Church, Randa",
    },
    { value: "church=messiah", label: "Messiah Anglican Church, Owode" },
    {
      value: "church=ascension",
      label: "Anglican Church of Ascension, Oke Anu",
    },
    {
      value: "prosp=allsouls",
      label: "All Souls Anglican Church, Isale General",
    },
    { value: "prosp=standrew", label: "St Andrew Anglican Church, Pooro" },
    { value: "prosp=mercyseat", label: "Mercy Seat Anglican Church, Abaa " },
    { value: "prosp=ileewe", label: "Anglican Church, Ile Ewe" },
    { value: "prosp=emmanuel", label: "Emmanuel Anglican Church" },
    { value: "prosp=stpeter", label: "St. Peter Anglican Church, Pontela" },
    { value: "prosp=trinity", label: "Trinity Anglican Church, Oke Owode" },
    { value: "prosp=stpaul", label: "St. Paul Anglican Church, Iresaadu" },
    { value: "prosp=advent", label: "Advent Anglican Church, Molete" },
    { value: "other", label: "Other" },
  ];

  const sectionOptions = [
    { value: "", label: "Select Your Section" },
    { value: "anchor", label: "Anchor Boys" },
    { value: "junior", label: "Junior Boys" },
    { value: "company", label: "Company Section" },
    { value: "senior", label: "Senior Boys" },
    { value: "officer", label: "Officers" },
    { value: "newmember", label: "New Member" },
  ];

  const handleCompanyChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedCompany(value);
    setShowOtherInput(value === "other");
  };

  const handleCompanyOtherValue = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setCompanyOtherValue(value);
  };

  const handleSectionChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedSection(value);
  };

  const hasError = (field: string) => {
    if (errors) {
      return Object.prototype.hasOwnProperty.call(errors, field);
    }
  };
  const getError = (field: string) => {
    if (errors && Object.prototype.hasOwnProperty.call(errors, field)) {
      return errors[field];
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const registrationData = {
      image,
      ...values,
      gender: selectedGender,
      company:
        selectedCompany === "other"
          ? `church=${companyOtherValue}`
          : selectedCompany,
      section: selectedSection,
    };
    try {
      setIsLoading(true);
      const res = await apiClient.post("/register", registrationData);
      if (res) setSuccess(true);
      // return <SuccessMessage />;
    } catch (err) {
      const errObj = err as {
        response?: { status: number; data: { errors: object } };
      };
      if (errObj.response?.status === 422) {
        setErrors(errObj.response.data.errors as Errors);
      }
      console.log(errObj);
    } finally {
      setIsLoading(false);
    }
  };

  if (success) return <SuccessMessage />;

  return (
    <div className="w-full min-h-[100svh] relative bg-cover bg-center flex justify-center pt-20 pb-16 px-4 bg-defaultBgImage">
      <div className="w-full text-center">
        <div className="md:inline-block md:mx-auto">
          <div className="px-8 py-16 border-gradient rounded-2xl bg-bgGlassMorphism backdrop-blur-sm lg:px-12">
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center justify-center flex-col space-y-4 text-left md:w-[488px] lg:space-y-8"
            >
              <UploadImage
                image={image}
                setImage={setImage}
                hasError={hasError("image")}
                errorMessage={getError("image")}
              />
              <div className="w-full space-y-4 lg:space-y-6">
                <LabelInput
                  id="surname"
                  name="surname"
                  type="text"
                  label="Your Surname"
                  placeholder="Surname"
                  required
                  value={values.surname}
                  onChange={handleLiteChange}
                  hasError={hasError("surname")}
                  errorMessage={getError("surname")}
                />
                <LabelInput
                  id="firstname"
                  name="firstname"
                  type="text"
                  label="Your First Name"
                  placeholder="First Name"
                  required
                  value={values.firstname}
                  onChange={handleLiteChange}
                  hasError={hasError("firstname")}
                  errorMessage={getError("firstname")}
                />
                <LabelInput
                  id="middlename"
                  name="middlename"
                  type="text"
                  label="Your Middle Name"
                  placeholder="Middle Name"
                  value={values.middlename}
                  onChange={handleLiteChange}
                  hasError={hasError("middlename")}
                  errorMessage={getError("middlename")}
                />
                <LabelSelect
                  id="gender"
                  name="gender"
                  label="Gender"
                  required
                  options={genderOptions}
                  selectedOption={selectedGender}
                  onChange={handleGenderChange}
                  hasError={hasError("gender")}
                  errorMessage={getError("gender")}
                />
                <LabelInput
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  placeholder="Email"
                  value={values.email}
                  onChange={handleLiteChange}
                  hasError={hasError("email")}
                  errorMessage={getError("email")}
                />
                <LabelInput
                  id="phone"
                  name="phone"
                  type="number"
                  label="Your Phone Number"
                  placeholder="Phone Number"
                  value={values.number}
                  onChange={handleLiteChange}
                  hasError={hasError("phone")}
                  errorMessage={getError("phone")}
                />
                <LabelInput
                  id="guardian_name"
                  name="guardian_name"
                  type="text"
                  label="Your Guardian Name"
                  placeholder="Guardian Name"
                  value={values.guardian_name}
                  onChange={handleLiteChange}
                  hasError={hasError("guardian_name")}
                  errorMessage={getError("guardian_name")}
                />
                <LabelInput
                  id="guardian_number"
                  name="guardian_number"
                  type="number"
                  label="Your Guardian Phone Number"
                  placeholder="Guardian Phone Number"
                  value={values.guardian_number}
                  onChange={handleLiteChange}
                  hasError={hasError("guardian_number")}
                  errorMessage={getError("guardian_number")}
                />
                <LabelSelect
                  id="company"
                  name="company"
                  label="Company"
                  required
                  options={companyOptions}
                  selectedOption={selectedCompany}
                  onChange={handleCompanyChange}
                  hasError={hasError("company")}
                  errorMessage={getError("company")}
                />
                {showOtherInput && (
                  <LabelInput
                    id="other_company"
                    name="other_company"
                    type="text"
                    label="Your Church Name"
                    placeholder="Church Name"
                    required
                    value={values.companyOtherValue}
                    onChange={handleCompanyOtherValue}
                    hasError={hasError("other_company")}
                    errorMessage={getError("other_company")}
                  />
                )}
                <LabelSelect
                  id="section"
                  name="section"
                  label="Section"
                  required
                  options={sectionOptions}
                  selectedOption={selectedSection}
                  onChange={handleSectionChange}
                  hasError={hasError("section")}
                  errorMessage={getError("section")}
                />
              </div>
              <div className="w-full relative">
                <SolidButton type="submit" text="SUBMIT" disabled={isLoading} />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
