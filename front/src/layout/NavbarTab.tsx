import { NavLink } from "react-router-dom";

interface INavbarTab {
  endpoint: string;
}

const NavbarTab = ({ endpoint }: INavbarTab) => {
  return (
    <div className="">
      <NavLink
        to={endpoint}
        className={({ isActive }) =>
          `inline-block h-4/4 w-full text-4xl rounded-full ${
            isActive ? " navtab-active" : undefined
          }`
        }
      ></NavLink>
    </div>
  );
};

export default NavbarTab;
