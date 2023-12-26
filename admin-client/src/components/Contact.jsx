import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Contact({listing}){
  const [seller, setSeller] = useState(null);
  const [message, setMessage] = useState("");
  const onChange = (e) => {
    setMessage(e.target.value);
  }

  useEffect(() => {
    const fetchSeller = async () => {
      try{
        const response = await fetch(`/server/user/${listing.userRef}`);
        const data = await response.json();
        setSeller(data);
      }catch(error){
        console.log(error);
      }
    };
    fetchSeller();
  }, [listing.userRef]);

  return (
    <>
      {seller && (
        <div className='flex flex-col gap-2'>
          <p className='text-slate-100'>
            Contact <span className='font-semibold'>{seller.username}</span>{" "}
            for{" "}
            <span className='font-semibold'>{listing.name.toLowerCase()}</span>
          </p>
          <textarea
            name='message'
            id='message'
            rows='2'
            value={message}
            onChange={onChange}
            placeholder='Enter your message to Seller here...'
            className='w-full border p-3 rounded-lg focus:outline-green-500'
          ></textarea>
          <Link 
            to={`mailto:${seller.email}?subject=Regarding${listing.name}&body=${message}`}
            className='text-center bg-slate-950 text-slate-200 shadow-lg p-3 rounded-lg uppercase hover:bg-opacity-85'
          >
            Send Message
          </Link>
        </div>
      )}
    </>
  );
}