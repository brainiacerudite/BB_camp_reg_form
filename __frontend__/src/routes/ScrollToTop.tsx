import { FC, useEffect } from "react";
import { useLocation } from "react-router";

interface ScrollToTopProps {
  children: React.ReactNode;
}

const ScrollToTop: FC<ScrollToTopProps> = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return <>{children}</>;
};

export default ScrollToTop;
