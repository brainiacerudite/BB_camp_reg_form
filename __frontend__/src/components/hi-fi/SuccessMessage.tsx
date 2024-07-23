import images from "../../constants/images";
import SolidButton from "../ui/buttons/SolidButton";

const SuccessMessage = () => {
  return (
    <div className="w-full min-h-[100svh] relative bg-cover bg-center flex justify-center pt-20 px-4 bg-defaultBgImage">
      <div className="w-full text-center">
        <div className="md:w-[600px] md:inline-block md:mx-auto">
          <div className="px-8 py-16 border-gradient rounded-2xl bg-bgGlassMorphism backdrop-blur-sm lg:px-12">
            <div className="flex flex-col items-center justify-center gap-10">
              <img src={images.done.src} alt={images.done.alt} />
              <div className="space-y-4">
                <h4 className="text-3xl text-center text-white font-bold">
                  Success!
                </h4>
                <p className="text-sm text-center text-white">
                  Registration completed
                </p>
              </div>
              <SolidButton text="CONTINUE" type="button" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
