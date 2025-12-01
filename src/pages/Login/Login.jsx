import React from "react";
import { Link } from "react-router";
import Logo from "../../components/logo/Logo";
import useAuth from "../../hooks/useAuth";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const Login = () => {
  const { signInWithGoogle, signInUser,logOut } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    const { email, password } = data;

 try {
   await signInUser(email, password);
   toast.success('login successful');
 } 
 catch (err) {
   console.log(err);
   toast.error(err?.message);
 }
  };

  const hanldeGoogleSignIn=async()=>{
    await signInWithGoogle();
    toast.success("Login Successful,Lets Rock")
  }

  return (
    <div className="my-10 mono">
      <div className="flex text-4xl mono justify-center items-center text-center">
        <h2 className="font-extrabold ">
          Welcome to <Logo></Logo>{" "}
        </h2>
      </div>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
        <div className="card-body">
          <h2>Hey Gamer,</h2>
          <h3>Login Now for Next Rock</h3>
          <form onSubmit={handleSubmit(handleLogin)}>
            <fieldset className="fieldset">
              <label className="label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input"
                placeholder="Email"
              />
              <label className="label">Password</label>
              <input
                type="password"
                {...register("password")}
                className="input"
                placeholder="Password"
              />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>
              <button className="btn btn-neutral mt-4">Login</button>
              <button type="button" onClick={hanldeGoogleSignIn} className="btn bg-white text-black border-[#e5e5e5]">
                <svg
                  aria-label="Google logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 512 512"
                >
                  <g>
                    <path d="m0 0H512V512H0" fill="#fff"></path>
                    <path
                      fill="#34a853"
                      d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                    ></path>
                    <path
                      fill="#4285f4"
                      d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                    ></path>
                    <path
                      fill="#fbbc02"
                      d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                    ></path>
                    <path
                      fill="#ea4335"
                      d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                    ></path>
                  </g>
                </svg>
                Login with Google
              </button>
              <p>
                New at Fakegamers{" "}
                <Link to={"/register"} className="text-red-600 font-semibold">
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
