import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to="/" >Home</Link>
          <Link to="/tools">Tools</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/settings">Settings</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
