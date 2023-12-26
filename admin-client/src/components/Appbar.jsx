import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {Link, useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function Appbar() {
  const {currentUser} = useSelector((state) => state.user);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    if (searchTermFromUrl) {
      setSearchTerm(searchTermFromUrl);
    }
  }, [location.search]);

  return (
    <header className='bg-black shadow-md'>
      <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <Link to='/'>
          <h1 className='flex fex-wrap font-bold text-sm sm:text-xl'>
            <span className='text-slate-100'>Gadget</span>
            <span className='text-slate-400'>Grid</span>
          </h1>
        </Link>
        <form onSubmit={handleSubmit} className='p-3 rounded-lg flex items-center bg-slate-100'>
          <input 
            type='text'
            placeholder='What are you looking for ?'
            className='focus:outline-none w-64 bg-transparent'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button>
              <FaSearch className='text-black' />
            </button>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='text-slate-400 hidden sm:inline hover:underline'>
              Home
            </li>
          </Link>
          <Link to='/about'>
            <li className='text-slate-400 hidden sm:inline hover:underline'>
              About
            </li>
          </Link>

          <Link to='/profile'>
            {currentUser ?(
              <img className='rounded-full h-8 w-8 object-cover' src={currentUser.profilephoto} alt='profile' />
            ): (
              <li className='text-slate-400 hover:underline'> SignIn </li>
            )}
          </Link>
        </ul>
      </div>
    </header>
  );
}
