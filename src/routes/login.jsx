import { useContext } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { CurrentUserDispatchContext } from "../App";

const schema = yup.object({
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
}).required();

export default function Login() {
    const navigate = useNavigate();
    const setCurrentUser = useContext(CurrentUserDispatchContext)
    const { register, handleSubmit, formState:{errors}} =  useForm({
      defaultValues:{email:"", password:""},
      resolver: yupResolver(schema)
    })

    function onSubmit(data){
      setCurrentUser(data)
      navigate("/")
    }

  return (
    <div className="w-full min-h-[80vh] flex items-center">
      <div className="w-4/5 md:w-2/6 mx-auto bg-white px-8 py-8 rounded-xl shadow-lg shadow-gray-200/75">
      <h2 className="text-3xl font-bold text-black">Login</h2>
        <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)} >
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm text-black">Email</label>
            <input className="border bg-light p-2 rounded-md outline-none" type="email" required placeholder="email@example.com" {...register("email")} />
            <span className="text-red-500 text-xs first-letter:capitalize">{errors.email?.message}</span>
          </div>
          <div className="w-full flex flex-col gap-1.5">
            <label className="text-sm text-black">Password</label>
            <input className="border bg-light p-2 rounded-md outline-none" type="password" required placeholder="password" {...register("password")}/>
            <span className="text-red-500 text-xs first-letter:capitalize">{errors.password?.message}</span>
          </div>
          <button type="submit" className="bg-primary/90 hover:bg-primary w-full  text-white font-medium rounded-md py-1.5">Login</button>
        </form>
      </div>
    </div>
  );
}