import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { ClipLoader } from "react-spinners";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const { Register, loading } = useAuth();

  const onSubmit = async (data) => {
    await Register(data);
  };

  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gray-100 absolute inset-0">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="bg-white md:p-5 md:shadow-2xl rounded-md w-full md:w-[380px] w-[340px] p-6">
            <div className="mb-6">
              <span className="font-semibold text-2xl">Register now</span>
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="name" className="text-gray-800">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter Your Full Name"
                id="name"
                className="mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1"
                {...register("name")}
              />
            </div>
            <div className="flex flex-col my-4">
              <label htmlFor="email" className="text-gray-800">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter Your Email"
                id="email"
                className="mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1"
                {...register("email")}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="password" className="text-gray-800">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter Your Password"
                id="password"
                className="mt-1 outline-0 bg-gray-100 focus:ring-1 ring-gray-200 rounded-md px-2 py-1"
                {...register("password")}
              />
            </div>
            <div className="mt-6">
              <button className="bg-blue-600 text-white w-full rounded-md cursor-pointer py-1">
                {loading ? <ClipLoader size={19} /> : 'register'}
              </button>
            </div>
            <div className="text-gray-500 text-center mt-3">
              <span>
                Already have an account?{" "}
                <Link to="/login" className="text-blue-600 underline">
                  Login
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Register;
