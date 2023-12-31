import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch('/server/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto mt-20">
      <h1 className='text-slate-100 text-center text-3xl font-semibold my-8'>Sign Up</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <input 
          type="text"
          placeholder="username"
          id="username"
          className="border rounded-lg p-3 focus:outline-green-500"
          onChange={handleChange}
        />
        <input 
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 focus:outline-green-500"
          onChange={handleChange}
        />
        <input 
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 focus:outline-green-500"
          onChange={handleChange}
        />
        <button 
          disabled={loading}
          className="bg-green-500 text-black p-3 rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40"
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <OAuth />
      </form>
      <div className="flex gap-3 mt-5">
        <p className="text-slate-200">Already a user!</p>
        <Link to={'/sign-in'}>
          <span className="text-green-500">Sign In</span>
        </Link>
      </div>
      {error && <p className='text-red-600 mt-5'>{error}</p>}
    </div>
  );
}