import { useSelector } from "react-redux"


export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className='text-slate-100 text-center text-3xl font-semibold my-8'>Profile</h1>
      <form className="flex flex-col gap-5">
        <img 
          src={currentUser.profilephoto} 
          alt="profile" 
          className="rounded-full w-25 h-25 self-center cursor-pointer mt-2"
        />
        <input 
          type="username"
          placeholder="username"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input 
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input 
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <button className="bg-green-500 text-black p-3 rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40">
          Update
        </button>
      </form>
      <div className="mt-5 flex justify-between">
        <span className="text-red-500 cursor-pointer font-semibold">Delete account</span>
        <span className="text-red-500 cursor-pointer font-semibold">Sign out</span>
      </div>
    </div>
  )
}
