import { Routes, Route } from "react-router-dom";

// scroll to top
import ScrollToTop from "./ScrollToTop";

// routes
import Landing from "../pages/Landing";
import Register from "../pages/Register";
import Success from "../pages/Success";
import RegStatus from "../pages/RegStatus";
import Tag from "../pages/Tag";
import PanelList from "../pages/PanelList";

const RootRouter = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reg-status" element={<RegStatus />} />
        <Route path="/success" element={<Success />} />
        <Route path="/tag" element={<Tag />} />

        {/* panel routes */}
        <Route path="/panel/list" element={<PanelList />} />
      </Routes>
    </ScrollToTop>
  );
};

export default RootRouter;
