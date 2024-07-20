import images from "../../constants/images";
import Anchor from "../BbAnchor";
import LinkOutlineButton from "../ui/buttons/LinkOutlineButton";
import LinkSolidButton from "../ui/buttons/LinkSolidButton";

function Hero() {
  return (
    <div
      style={{ backgroundImage: `url(${images.heroBgImage.src})` }}
      className="w-full min-h-[100svh] relative bg-cover bg-center flex justify-center items-center px-4"
    >
      <div className="w-full flex flex-col space-y-16">
        <div className="flex flex-col justify-center items-center gap-4">
          <Anchor />
          <h4 className="text-2xl text-center text-white font-bold">
            2024 ACB <br />
            CAMP EXERCISE
          </h4>
        </div>

        <div className="px-4 py-10 border-gradient rounded-2xl bg-bgGlassMorphism backdrop-blur-sm">
          <div className="w-full max-w-[360px] p-4 flex flex-col gap-4">
            <LinkSolidButton to="/" text="REGISTER NOW" type="button" />
            <LinkOutlineButton to="/" text="CHECK REG STATUS" type="button" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Hero;
