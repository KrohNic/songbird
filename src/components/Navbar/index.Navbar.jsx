import React from "react";
import "./Navbar.scss";

const NavbarItem = ({ active, children }) => {
  const classNames = ["navbar--item"];

  if (active) classNames.push("navbar--item-active");

  return <span className={classNames.join(" ")}>{children}</span>;
};

const Navbar = ({ activeItem }) => {
  const items = [
    "Разминка",
    "Воробьиные",
    "Лесные птицы",
    "Певчие птицы",
    "Хищные птицы",
    "Морские птицы"
  ];

  return (
    <nav className="navbar">
      {items.map((label, i) => (
        <NavbarItem key={label} active={activeItem === i}>
          {label}
        </NavbarItem>
      ))}
    </nav>
  );
};

export default Navbar;
