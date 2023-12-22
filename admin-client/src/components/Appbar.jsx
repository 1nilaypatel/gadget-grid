import { FaSearch } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {Link} from 'react-router-dom';

export default function Appbar() {
  const {currentUser} = useSelector((state) => state.user);

  return (
    <header className='bg-black shadow-md'>
      <div className='flex justify-between items-center p-3 max-w-6xl mx-auto'>
        <Link to='/'>
          <h1 className='flex fex-wrap font-bold text-sm sm:text-xl'>
            <span className='text-slate-100'>Gadget</span>
            <span className='text-slate-400'>Grid</span>
          </h1>
        </Link>
        <form className='p-3 rounded-lg flex items-center bg-slate-100'>
          <input 
            type='text'
            placeholder='What are you looking for ?'
            className='focus:outline-none w-64 bg-transparent'
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
