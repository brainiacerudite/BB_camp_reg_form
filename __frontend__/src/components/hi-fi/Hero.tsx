import images from "../../constants/images";
import Anchor from "../BbAnchor";
import LinkOutlineButton from "../ui/buttons/LinkOutlineButton";
import LinkSolidButton from "../ui/buttons/LinkSolidButton";

function Hero() {
  return (
    <div
      style={{ backgroundImage: `url(${images.heroBgImage.src})` }}
      className="w-full min-h-screen relative bg-cover bg-center py-20 px-4"
    >
      <div className="max-w-[499px] m-auto flex flex-col gap-12 justify-center items-center px-4 py-12 border border-borderColor rounded-3xl bg-bgGlassMorphism">
        <div className="flex flex-col justify-center items-center gap-4">
          <Anchor />
          <h4 className="text-2xl text-center text-white font-bold">
            2024 ACB <br />
            CAMP EXERCISE
          </h4>
        </div>
        <div className="w-full max-w-[360px] p-4 flex flex-col gap-4">
          <LinkSolidButton to="/" text="REGISTER NOW" type="button" />
          <LinkOutlineButton to="/" text="CHECK REG STATUS" type="button" />
        </div>
      </div>
    </div>
  );
}

export default Hero;
