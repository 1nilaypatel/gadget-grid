import { Link } from "react-router-dom";


export default function SignUp() {
  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className='text-slate-100 text-center text-3xl font-semibold my-8'>Sign Up</h1>
      <form className="flex flex-col gap-5">
        <input 
          type="text"
          placeholder="username"
          id="username"
          className="border rounded-lg p-3"
        />
        <input 
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3"
        />
        <input 
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3"
        />
        <button className="bg-green-500 text-black p-3 rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40">Sign Up</button>
      </form>
      <div className="flex gap-3 mt-5">
        <p className="text-slate-200">Already a user!</p>
        <Link to={'/sign-in'}>
          <span className="text-green-500">Sign In</span>
        </Link>
      </div>
    </div>
  )
}
