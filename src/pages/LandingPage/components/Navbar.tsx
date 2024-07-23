import { logo } from "../../../assets";
import { SignInForm, SignUpForm } from "../../../components";

const Navbar = () => {
  return (
    <nav className="w-full flex py-6 justify-between items-center navbar">
      <img src={logo} alt="ourbank" className="w-[120px] h-[32px]" />

      <div className="flex flex-row gap-4">
        <SignInForm />

        <SignUpForm />
      </div>
    </nav>
  );
};

export default Navbar;
