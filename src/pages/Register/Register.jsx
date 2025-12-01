import React from "react";
import { Link } from "react-router";
import Logo from "../../components/logo/Logo";
import { useForm } from "react-hook-form";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import axios from "axios";
import { imageUpload } from "../../utils/upload";
import { Store } from "react-notifications-component";

const Register = () => {
  const { user, createUser, updateUserProfile } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegister = async (data) => {
    const { name, image, email, password } = data;
    const imageFile = image[0];
    // const formData=new FormData();
    // formData.append('image',imageFile)

    // console.log(data);

    try {

    // const {data} = await axios.post(
    //   `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_API_KEY}`,
    //   formData
    // );
    const imageURL=await imageUpload(imageFile)


      const result =await createUser(email, password);
      
      await updateUserProfile(name,imageURL)

      console.log(result);


      toast.success('Account Register Successful' );



Store.addNotification({
  title: "You unlocked Dashboard!",
  message: "Welcome gamer!",
  type: "info", 
  container: "bottom-left", 
  animationIn: ["animate__animated", "animate__fadeIn"],
  animationOut: ["animate__animated", "animate__fadeOut"],
  dismiss: {
    duration: 5000,
    onScreen: true,
  },
 
  className: "purple-notification",
});



    } 
    
    catch (err) {
      console.log(err);
      toast.error(err?.message);
    }
  };

  return (
    <div className="my-10 mono">
      <div className="flex text-4xl mono justify-center items-center text-center">
        <h2 className="font-extrabold  ">
          Be a Member of <Logo></Logo>{" "}
        </h2>
      </div>

      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl mx-auto mt-10">
        <div className="card-body">
          <h2>Hey Gamer,</h2>
          <h3>Register Now for Next Rock</h3>

          <form onSubmit={handleSubmit(handleRegister)}>
            <fieldset className="fieldset">
              <label className="label">Name</label>
              <input
                type="text"
                {...register("name")}
                className="input"
                placeholder="Your Name"
              />

              <label className="label">Email</label>
              <input
                type="email"
                {...register("email")}
                className="input"
                placeholder="Email"
              />

              <fieldset className="fieldset">
                <label className="label">Pick a profile image</label>
                <input
                  type="file"
                  {...register("image")}
                  className="file-input"
                />
              </fieldset>

              <label className="label">Password</label>
              <input
                type="password"
                {...register("password")}
                className="input"
                placeholder="Password"
              />

              <button className="btn btn-neutral mt-4">Register</button>
              {/* <button className="btn bg-white text-black border-[#e5e5e5]">
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
              </button> */}
              <p>
                Have an account{" "}
                <Link to={"/login"} className="text-red-600 font-semibold">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
