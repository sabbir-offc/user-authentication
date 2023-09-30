import { useContext, useRef } from "react";
import { AuthContext } from "../../AuthProvider/AuthProvider";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../../firebase/firebase.config";

const Login = () => {
  const { signIn } = useContext(AuthContext);
  const navigate = useNavigate();
  const emailRef = useRef();
  const hanldeForgot = () => {
    const email = emailRef.current.value;
    sendPasswordResetEmail(auth, email)
      .then(() => {
        return Swal.fire(
          "Successfull.",
          `Password Reset link send to this email: ${email}`,
          "success"
        );
      })
      .catch((error) => console.error(error));
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    signIn(email, password)
      .then((result) => {
        const currentUser = result.user;
        e.target.reset();
        if (!currentUser.emailVerified) {
          return Swal.fire(
            "Error!",
            `Email Not Verified, Please check your Email for verification link.`,
            "error"
          );
        }
        navigate("/profile");

        return Swal.fire("Successfull.", "Login Successfull.", "success");
      })
      .catch((error) => {
        return Swal.fire(
          "Error!",
          `Login Failed. Error: ${error.message}`,
          "error"
        );
      });
  };
  return (
    <div className="card mx-auto max-w-sm flex-shrink-0 w-full shadow-lg mt-10 shadow-gray-50 bg-base-100">
      <div className="card-body">
        <form onSubmit={handleLogin}>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              ref={emailRef}
              name="email"
              placeholder="Email"
              className="input input-bordered"
              required
            />
          </div>
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="input input-bordered"
              required
            />
            <label className="label">
              <a
                onClick={hanldeForgot}
                className="label-text-alt link link-hover"
              >
                Forgot password?
              </a>
            </label>
          </div>
          <div className="form-control mt-6">
            <input className="btn btn-primary" type="submit" value="Login" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
