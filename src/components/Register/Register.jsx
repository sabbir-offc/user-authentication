import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { sendEmailVerification, updateProfile } from "firebase/auth";

const Register = () => {
  const { signUp, googleSign } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSign = () => {
    googleSign();
    navigate("/profile");
  };
  const handleSignUp = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const name = e.target.name.value;

    if (!/^(?=.*[a-z])(?=.*[A-Z]).+$/.test(password)) {
      return Swal.fire(
        "Warning",
        "Your password should have at least one uppercase and lower case character.",
        "warning"
      );
    }

    signUp(email, password)
      .then((result) => {
        const currentUser = result.user;
        e.target.reset();
        updateProfile(currentUser, { displayName: name })
          .then()
          .catch((error) => console.error(error));
        sendEmailVerification(currentUser)
          .then()
          .catch((error) => {
            Swal.fire(
              "Error!",
              `Verification Email Send Failed. Error: ${error.message}`,
              "error"
            );
          });
        navigate("/login");
        Swal.fire(
          "SuccessFull",
          `Account Create Successfull. 
          Please Check your email for Verify your account.`,
          "success"
        );
      })
      .catch((error) => {
        Swal.fire(
          "Error!",
          `Register Failed. Error: ${error.message}`,
          "error"
        );
      });
  };
  return (
    <div className="relative w-fit md:w-96 flex flex-col rounded-xl bg-white bg-clip-border text-gray-700 mx-auto mt-20 shadow-md">
      <div className="relative mx-4 -mt-6 mb-4 grid h-28 place-items-center overflow-hidden rounded-xl bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-border text-white shadow-lg shadow-pink-500/40">
        <h3 className="block font-sans text-3xl font-semibold leading-snug tracking-normal text-white antialiased">
          Sign Up
        </h3>
      </div>
      <div className="flex flex-col gap-4 p-6">
        <form onSubmit={handleSignUp}>
          <div className="flex flex-col   w-full min-w-[200px]">
            <label className="" htmlFor="name">
              Name
            </label>
            <input
              className="px-3 py-4 mb-3 rounded-md bg-transparent"
              placeholder="Enter you Name."
              id="name"
              name="name"
              type="text"
              required
            />
          </div>
          <div className="flex flex-col   w-full min-w-[200px]">
            <label className="" htmlFor="email">
              Email
            </label>
            <input
              className="px-3 py-4 rounded-md bg-transparent"
              placeholder="Enter you email."
              id="email"
              name="email"
              type="email"
              required
            />
          </div>
          <div className="flex flex-col my-4 w-full min-w-[200px]">
            <label className="" htmlFor="password">
              Password
            </label>
            <input
              className="px-3 py-4 bg-transparent rounded-md"
              placeholder="Enter Your Password."
              id="password"
              type="password"
              name="password"
              required
            />
          </div>
          <div>
            <input
              className="btn border-none block w-full select-none rounded-lg bg-gradient-to-tr from-pink-600 to-pink-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-pink-500/20 transition-all hover:shadow-lg hover:shadow-pink-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
              type="submit"
              value="Sign Up"
            />
          </div>
        </form>
        <div>
          <button
            onClick={handleGoogleSign}
            className="btn border-none block w-full select-none rounded-lg bg-gradient-to-tr from-violet-600 to-violet-400 py-3 px-6 text-center align-middle font-sans text-xs font-bold uppercase text-white shadow-md shadow-violet-500/20 transition-all hover:shadow-lg hover:shadow-violet-500/40 active:opacity-[0.85] disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          >
            Sign Up With Google
          </button>
        </div>
      </div>
      <div className="p-6 pt-0">
        <p className="mt-6 flex justify-center font-sans text-sm font-light leading-normal text-inherit antialiased">
          Already have an Account?
          <Link
            to="/login"
            className="ml-1 block font-sans text-sm font-bold leading-normal text-pink-500 antialiased"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
