import { useState } from "react";
import LargeMenu from "./LargeMenu";
import SmallMenu from "./SmallMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      <LargeMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
      <SmallMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </header>
  );
}