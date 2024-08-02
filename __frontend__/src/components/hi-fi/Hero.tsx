import Anchor from "../BbAnchor";
import LinkOutlineButton from "../ui/buttons/LinkOutlineButton";
import LinkSolidButton from "../ui/buttons/LinkSolidButton";

function Hero() {
  return (
    <div className="w-full min-h-[100svh] relative bg-cover bg-center flex justify-center items-center px-4 bg-defaultBgImage">
      <div className="w-full flex flex-col space-y-16 -mt-12">
        <div className="flex flex-col justify-center items-center gap-4 lg:hidden">
          <Anchor />
          <h4 className="text-2xl text-center text-white font-bold">
            2024 ACB <br />
            CAMP EXERCISE
          </h4>
        </div>

        <div className="lg:inline-block lg:mx-auto">
          <div className="px-4 py-10 border-gradient rounded-2xl bg-bgGlassMorphism backdrop-blur-sm lg:p-12">
            <div className="lg:flex lg:items-center lg:space-x-12">
              <div className="hidden w-full flex-col justify-center items-center gap-4 lg:flex lg:w-[488px]">
                <Anchor />
                <h4 className="text-2xl text-center text-white font-bold">
                  2024 ACB <br />
                  CAMP EXERCISE
                </h4>
              </div>

              <div className="w-full mx-auto max-w-[360px] p-4 flex flex-col justify-center space-y-4 lg:w-[488px] lg:px-8 lg:py-8 lg:space-y-8 lg:h-96">
                <LinkSolidButton
                  to="/register"
                  text="REGISTER NOW"
                  type="button"
                />
                <LinkOutlineButton
                  to="/reg-status"
                  text="CHECK REG STATUS"
                  type="button"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
