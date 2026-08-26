import { useEffect, useState, useRef, type ReactNode } from "react";
import logo from "@/assets/logo.png";

interface PremiumPreloaderProps {
  children?: ReactNode;
  maxDisplayTime?: number;
  minDisplayTime?: number;
}

export function PremiumPreloader({
  children,
  maxDisplayTime = 2000,
  minDisplayTime = 800,
}: PremiumPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const startTimeRef = useRef<number>(Date.now());
  const contentLoadedRef = useRef(false);

  useEffect(() => {
    const handleLoad = () => {
      contentLoadedRef.current = true;
      checkAndHide();
    };

    const checkAndHide = () => {
      const elapsed = Date.now() - startTimeRef.current;

      if (contentLoadedRef.current && elapsed >= minDisplayTime) {
        setIsFadingOut(true);
        setTimeout(() => setIsVisible(false), 600);
      } else if (elapsed >= maxDisplayTime) {
        setIsFadingOut(true);
        setTimeout(() => setIsVisible(false), 600);
      } else {
        setTimeout(checkAndHide, 50);
      }
    };

    if (document.readyState === "complete") {
      handleLoad();
    } else {
      window.addEventListener("load", handleLoad);
    }

    const handleDOMReady = () => {
      contentLoadedRef.current = true;
    };
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", handleDOMReady);
    } else {
      handleDOMReady();
    }

    const timer = setTimeout(checkAndHide, 100);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("load", handleLoad);
      document.removeEventListener("DOMContentLoaded", handleDOMReady);
    };
  }, [minDisplayTime, maxDisplayTime]);

  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    if (!isFirstLoad) {
      setIsVisible(false);
      return;
    }
    setIsFirstLoad(false);
  }, [isFirstLoad]);

  if (!isVisible) return null;

  return (
    <div
      id="premium-preloader"
      className={`premium-preloader ${isFadingOut ? "fade-out" : ""}`}
      role="status"
      aria-label="Loading"
      aria-busy="true"
    >
      <div className="premium-preloader__backdrop" />

      <div className="premium-preloader__content">
        <div className="premium-preloader__logo-wrapper">
          <div className="premium-preloader__accent-ring" aria-hidden="true" />
          <div
            className="premium-preloader__accent-ring premium-preloader__accent-ring--2"
            aria-hidden="true"
          />
          <div
            className="premium-preloader__accent-ring premium-preloader__accent-ring--3"
            aria-hidden="true"
          />
        </div>

        <div
          className="premium-preloader__progress"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Loading progress"
        >
          <div className="premium-preloader__progress-bar" />
        </div>

        <p className="premium-preloader__text">Loading honey experience...</p>
      </div>
    </div>
  );
}
