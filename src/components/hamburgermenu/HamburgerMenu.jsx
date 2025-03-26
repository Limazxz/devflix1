import React, { useState } from "react";
import MenuIcon from "../../assets/menu-outline.svg"; // Ícone do menu
import "./HamburgerMenu.css"; // Estilos do menu hamburger

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="hamburger-menu-container">
      <img
        src={MenuIcon}
        alt="Menu"
        className="menu-icon"
        onClick={toggleMenu}
      />
      {isOpen && (
        <div className="menu-dropdown">
          <ul>
            <li><a href="#home">Filmes</a></li>
            <li><a href="#popular">Séries</a></li>
            <li><a href="#popular">Inicío</a></li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HamburgerMenu;
