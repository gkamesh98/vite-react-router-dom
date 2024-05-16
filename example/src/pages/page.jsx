import { NavLink } from "vite-react-router-dom";

const Page = () => {
  return (
    <NavLink to="/test/test">
      <p>Redirect to test</p>
    </NavLink>
  );
};

export default Page;
