import { useState } from "react";
import LabelInput from "../components/ui/inputs/LabelInput";
import SolidButton from "../components/ui/buttons/SolidButton";
import useInput from "react-lite-input";
import apiClient from "../libs/apiClient";

const RegStatus = () => {
  const [errors, setErrors] = useState<string | null>("");

  const initialValues = {
    surname: "",
    firstname: "",
  };
  const { values, handleLiteChange } = useInput(initialValues);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const hasError = (field) => {
    if (errors) {
      return Object.prototype.hasOwnProperty.call(errors, field);
    }
  };
  const getError = (field) => {
    if (errors && Object.prototype.hasOwnProperty.call(errors, field)) {
      return errors[field];
    }
    return null;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payloadData = {
      ...values,
    };
    try {
      setIsLoading(true);
      const res = await apiClient.post("/check", payloadData);
      // return <SuccessMessage />;
    } catch (err) {
      if (err.response?.status === 422) {
        setErrors(err.response.data.errors);
      }
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full min-h-[100svh] relative bg-cover bg-center flex justify-center pt-20 pb-16 px-4 bg-defaultBgImage">
      <div className="w-full text-center">
        <div className="md:inline-block md:mx-auto">
          <div className="px-8 py-16 border-gradient rounded-2xl bg-bgGlassMorphism backdrop-blur-sm lg:px-12">
            <form
              onSubmit={handleSubmit}
              className="w-full flex items-center justify-center flex-col space-y-4 text-left md:w-[488px] lg:space-y-8"
            >
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

export default RegStatus;
