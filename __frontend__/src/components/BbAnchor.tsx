import { Link } from "react-router-dom";
import images from "../constants/images";

const BbAnchor = () => {
  return (
    <Link to="/">
      <img src={images.bbAnchor.src} alt={images.bbAnchor.alt} />
    </Link>
  );
};

export default BbAnchor;
