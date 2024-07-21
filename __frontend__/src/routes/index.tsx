import { Routes, Route } from "react-router-dom";

// scroll to top
import ScrollToTop from "./ScrollToTop";

// routes
import Landing from "../pages/Landing";
import Register from "../pages/Register";

const RootRouter = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </ScrollToTop>
  );
};

export default RootRouter;
