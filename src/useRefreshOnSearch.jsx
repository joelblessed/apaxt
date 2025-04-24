import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useRefreshOnSearch = () => {
  const location = useLocation();

  useEffect(() => {
    const searchTriggered = sessionStorage.getItem("searchTriggered");
    const lastVisitedPath = sessionStorage.getItem("lastVisitedPage");

    if (searchTriggered === "true" && lastVisitedPath !== location.pathname) {
      window.location.reload(); // Refresh other pages
      sessionStorage.removeItem("searchTriggered"); // Reset after refresh
    }

    sessionStorage.setItem("lastVisitedPage", location.pathname);
  }, [location]);
};

export default useRefreshOnSearch;