import { useState } from "react";
import LabelInput from "../components/ui/inputs/LabelInput";
import SolidButton from "../components/ui/buttons/SolidButton";
import useInput from "react-lite-input";
import apiClient from "../libs/apiClient";
import images from "../constants/images";
import Spinner from "../components/Spinner";

const RegStatus = () => {
  const [errors, setErrors] = useState<string | null>("");
  // interface DataType {
  //   id: number;
  //   name: string;
  //   image: string;
  // }
  // const [lists, setLists] = useState<DataType[] | null>([]);

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
                  hasError={hasError("surname")}
                  errorMessage={getError("surname")}
                />
                <LabelInput
                  id="firstname"
                  name="firstname"
                  type="text"
                  label="Your First Name"
                  placeholder="First Name"
                  value={values.firstname}
                  onChange={handleLiteChange}
                  hasError={hasError("firstname")}
                  errorMessage={getError("firstname")}
                />
              </div>
              <div className="w-full relative">
                <SolidButton type="submit" text="SUBMIT" disabled={isLoading} />
              </div>
            </form>

<div className="mt-16"></div>
            <hr />
            {/* <div className="h-43">
              <Spinner className="!h-12 !w-12" />
              </div> */}
              <div className="mt-16"></div>
            <div className="flex flex-col gap-4 md:flex-row flex-wrap">
              {lists.map(({ id, name, image }) => {
                return (
                  <div
                    key={id}
                    className="w-full flex gap-4 p-4 bg-white border shadow-md rounded-lg md:basis-[300px] md:flex-shrink-0"
                  >
                    <div>
                      <img src={image} alt={name} className="w-20" />
                    </div>
                    <div>
                      <h4>{name}</h4>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegStatus;

interface DataType {
  id: number;
  name: string;
  image: string;
}

const lists: DataType[] = [
  {
    id: 1,
    name: "John Doe",
    image: images.avatar.src,
  },
  {
    id: 2,
    name: "John Doe",
    image: images.avatar.src,
  },
];
