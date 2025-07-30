import { useEffect, useRef, useState } from "react";

const useNavbarMonitor = () => {
  const [isOutOfView, setIsOutOfView] = useState(false);
  // Ref to attach to the navbar element for intersection observation
  const navbarRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsOutOfView(!entry.isIntersecting); // Update state based on visibility
      },
      { root: null, threshold: 0.1 } // Adjust threshold for sensitivity
    );

    if (navbarRef.current) {
      observer.observe(navbarRef.current);
    }

    return () => {
      if (navbarRef.current) {
        observer.unobserve(navbarRef.current);
      }
    };
  }, []);

  return { navbarRef, isOutOfView };
};

export default useNavbarMonitor;
