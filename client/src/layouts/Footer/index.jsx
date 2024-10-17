import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Reference from "./Reference";

export default function Footer() {
  const urlLocation = useLocation();
  const [isHome, setIsHome] = useState(false);

  useEffect(() => {
    setIsHome(urlLocation.pathname === "/");
  }, [urlLocation]);

  return (
    <footer className="bg-black py-3 mt-auto">
      {isHome && <Reference />}
      <div className="container mx-auto text-center text-gray-400">
        <span>BARMIN 2024</span>
      </div>
    </footer>
  );
}
