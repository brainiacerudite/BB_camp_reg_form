import images from "../../constants/images";
import Anchor from "../BbAnchor";
import LinkOutlineButton from "../ui/buttons/LinkOutlineButton";
import LinkSolidButton from "../ui/buttons/LinkSolidButton";

function Hero() {
  return (
    <div
      style={{ backgroundImage: `url(${images.heroBgImage.src})` }}
      className="w-full min-h-[100svh] relative bg-cover bg-center py-20 px-4 lg:flex lg:justify-center lg:items-center"
    >
      <div className="flex flex-col space-y-16 lg:space-y-0">
        <div className="flex flex-col justify-center items-center gap-4 lg:hidden">
          <Anchor />
          <h4 className="text-2xl text-center text-white font-bold">
            2024 ACB <br />
            CAMP EXERCISE
          </h4>
        </div>
        <div className="">
          <div className="max-w-[499px] m-auto rounded-2xl bg-gradient-to-br from-[#FEFE00] to-[#FF3D00] p-[1px] lg:max-w-[1120px] lg:w-[768px] xl:w-[840px]">
            <div className="bg-black rounded-2xl">
              <div className="flex flex-col gap-12 justify-center items-center px-4 py-12 rounded-2xl bg-bgGlassMorphism lg:flex-row lg:px-12 lg:gap-0 lg:space-x-4 lg:py-24">
                <div className="hidden w-full lg:max-w-[360px] lg:flex lg:flex-col lg:justify-center lg:items-center lg:gap-4">
                  <Anchor />
                  <h4 className="text-2xl text-center text-white font-bold">
                    2024 ACB <br />
                    CAMP EXERCISE
                  </h4>
                </div>
                <div className="w-full max-w-[360px] p-4 flex flex-col gap-4 flex-nowrap lg:gap-0 lg:space-y-8">
                  <LinkSolidButton to="/" text="REGISTER NOW" type="button" />
                  <LinkOutlineButton to="/" text="CHECK REG STATUS" type="button" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
