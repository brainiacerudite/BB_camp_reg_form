import { Routes, Route } from "react-router-dom";

// scroll to top
import ScrollToTop from "./ScrollToTop";

// routes
import Landing from "../pages/Landing";
import Register from "../pages/Register";
import Success from "../pages/Success";

const RootRouter = () => {
  return (
    <ScrollToTop>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/register" element={<Register />} />
        {/* <Route path="/reg-status" element={<RegStatus />} /> */}
        <Route path="/success" element={<Success />} />

        {/* panel routes */}
        {/* <Route path="/panel/list" element={<PanelList />} /> */}
      </Routes>
    </ScrollToTop>
  );
};

export default RootRouter;
