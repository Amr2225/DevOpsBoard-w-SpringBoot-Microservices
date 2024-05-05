import { NavLink } from "react-router-dom";

const NavLinks = ({ children, name, link }) => {
  return (
    <NavLink
      to={link}
      className={({ isActive }) =>
        `flex p-1 rounded cursor-pointer  hover:stroke-neutral-100 stroke-neutral-400 text-neutral-400 hover:text-neutral-400 place-items-center gap-3 hover:bg-neutral-700/30 transition-colors duration-100 ${
          isActive && "stroke-neutral-100 bg-neutral-700/30"
        }`
      }
    >
      {children}
      <p className='overflow-clip whitespace-nowrap tracking-wide'>{name}</p>
    </NavLink>
  );
};

export default NavLinks;
