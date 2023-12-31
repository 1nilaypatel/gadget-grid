import { Link } from 'react-router-dom';
import { FaShieldAlt, FaCubes } from 'react-icons/fa';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

export default function ListingItem({ listing }) {
  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]'>
      <Link to={`/listing/${listing._id}`}>
        <img
          src={
            listing.imageUrls[0] ||
            'https://media-ik.croma.com/prod/https://media.croma.com/image/upload/v1669124939/Croma%20Assets/Entertainment/Headphones%20and%20Earphones/Images/262565_0_gsz0tr.png'
          }
          alt='Gadget cover'
          className='h-[320px] sm:h-[220px] w-full object-contain hover:scale-105 transition-scale duration-300'
        />
        <div className='p-3 flex flex-col gap-2 w-full'>
          <p className='truncate text-lg font-semibold text-slate-700'>
            {listing.name}
          </p>
          <div className='flex items-center gap-1'>
            <FaCubes className='h-4 w-4 text-green-700' />
            <div className='text-sm text-gray-600 w-full'>
              {listing.leftUnits}{' '}{listing.leftUnits > 1 ? "Units Left" : "Unit Left"}
            </div>
          </div>
          <p className='text-sm text-gray-600 line-clamp-2'>
            {listing.description}
          </p>
          <p className='text-slate-500 mt-2 font-semibold '>
            ₹{listing.offer ? listing.offerPrice.toLocaleString('en-US') : listing.price.toLocaleString('en-US')}
          </p>
          <div className='text-slate-700 flex items-center gap-4'>
            <div className='flex items-center gap-1'>
              <FaShieldAlt className='h-4 w-4 text-green-700'/>
              <div className='font-bold text-xs'>
                {listing.warranty > 1 ? `${listing.warranty} years ` : `${listing.warranty} year `}
              </div>
            </div>
            <div className='flex items-center gap-1'>
              <FontAwesomeIcon icon={faClock} className='h-4 w-4 text-green-700'/>
              <div className='font-bold text-xs'>
                {listing.playbackTime}{" hours"}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}