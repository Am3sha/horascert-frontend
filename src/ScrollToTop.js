import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Use timeout to ensure scroll runs after route render
    setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "auto", // use auto for consistent behavior in hosting
      });
    }, 0);
  }, [pathname]);

  return null;
}

