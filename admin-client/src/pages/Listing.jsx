import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore from 'swiper';
import { useSelector } from 'react-redux';
import { Navigation } from 'swiper/modules';
import 'swiper/css/bundle';
import { FaShare, FaShieldAlt, FaCubes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';
import Contact from '../components/Contact';

export default function Listing() {
  SwiperCore.use([Navigation]);
  const params = useParams();
  const {currentUser} = useSelector((state) => state.user);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const fetchListing = async () => {
      try{
        setLoading(true);
        const response = await fetch(`/server/listing/get/${params.listingId}`);
        const data = await response.json();
        if(data.success === false){
          setError(true);
          setLoading(false);
          return;
        }
        setListing(data);
        setError(false);
        setLoading(false);
      }catch(error){
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.listingId]);

  return(
    <main className='mt-20'>
      {loading && <p className='text-slate-100 text-center my-7 text-2xl'>Loading...</p>}
      {error && <p className='text-slate-100 text-center my-7 text-2xl'>Somethig went wrong</p>}
      {listing && !loading && !error && (
        <div>
          <Swiper navigation className='custom-swiper' loop={true}>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'contain'
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
          <div className='fixed top-[13%] right-[3%] z-10 border rounded-full w-12 h-12 flex justify-center items-center bg-slate-100 cursor-pointer'>
            <FaShare
              className='text-slate-500'
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            />
          </div>
          {copied && (
            <p className='fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2'>
              Link copied!
            </p>
          )}
          <div className='flex flex-col max-w-4xl mx-auto p-6 my-7 gap-4'>
            <p className='text-2xl text-slate-100 font-semibold'>
              {listing.name} 
              <br></br>
              <p className='text-xl font-semibold'>
                {'MRP: ₹'}
                {listing.price}
                {listing.offer && (
                  <span className='text-red-500 w-full text-lg'>
                    {" ₹"}{+listing.price - +listing.offerPrice} off
                  </span>
                )}
              </p>
            </p>
            <div className='flex gap-4'>
              <p className='bg-green-500 w-full max-w-[200px] text-slate-100 text-xl text-center font-semibold p-1 rounded-md'>
              ₹{listing.offer ? listing.offerPrice.toLocaleString('en-US') : listing.price.toLocaleString('en-US')}
              </p>
            </div>
            <p className='text-slate-300'>
              <span className='font-semibold text-slate-100'>Description </span>
              <br></br>
              <br></br>
              {listing.description}
            </p>
            <ul className='text-green-600 font-semibold text-sm flex flex-wrap items-center gap-6 sm:gap-14'>
              <li className='flex items-center gap-2 whitespace-nowrap '>
                <FaCubes size={30}/>
                <div className='flex flex-col items-center'>
                  <p>
                  {listing.leftUnits > 1 ? "Units Left" : "Unit Left"}
                  </p>
                  {listing.leftUnits}
                </div>
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap '>
                <FontAwesomeIcon icon={faClock} size="2x"/>
                <div className='flex flex-col items-center'>
                  <p>Playback time</p>
                  {listing.playbackTime} hours
                </div>
              </li>
              <li className='flex items-center gap-2 whitespace-nowrap '>
                <FaShieldAlt size={30}/>
                <div className='flex flex-col items-center'>
                  <p>Warranty</p>
                  {listing.warranty} years
                </div>
              </li>
            </ul>
            {currentUser && listing.userRef !== currentUser._id && !contact && (
              <button 
                onClick={() => setContact(true)}
                className='text-center bg-slate-950 text-slate-200 shadow-lg p-3 rounded-lg uppercase hover:opacity-85'
              >
                Contact Seller
              </button>
            )}
            {contact && <Contact listing={listing} />}
          </div>
        </div>
      )}
    </main>
  );
};
