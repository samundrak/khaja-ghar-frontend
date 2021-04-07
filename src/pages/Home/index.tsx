import { Link } from "react-router-dom";
import GuestLayout from "../../components/layouts/GuestLayout";
import Login from "../../components/Login";
import StylishTitle from "../../components/StylishTitle";

const Home = () => {
  return (
    <GuestLayout>
      <StylishTitle>Log in!</StylishTitle>
      <Login />
      <StylishTitle level={3}>
        First Time? <Link to="/register">Register Now!</Link>
      </StylishTitle>
    </GuestLayout>
  );
};
export default Home;
