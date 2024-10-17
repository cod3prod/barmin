import { useState } from "react";
import { authStore } from "../../zustand/AuthStore";
import LargeMenu from "./LargeMenu";
import SmallMenu from "./SmallMenu";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { username } = authStore();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50">
      <LargeMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} username={username}/>
      <SmallMenu isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} username={username}/>
    </header>
  );
}