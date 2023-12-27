import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import SwiperCore from 'swiper';
import 'swiper/css/bundle';
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [offerListings, setOfferListings] = useState([]);
  SwiperCore.use([Navigation]);
  console.log(offerListings);

  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const response = await fetch('/server/listing/get?offer=false&limit=9');
        const data = await response.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);

  return(
    <div>
      <div className='flex flex-col gap-6 p-28 px-3 max-w-6xl mx-auto'>
        <h1 className='text-slate-200 font-bold text-3xl lg:text-6xl'>
          Guiding You to <span className='text-slate-500'>Discover your</span>
          <br />
          Next Ear-Catching Gadget
        </h1>
        <div className='text-gray-300 text-sm sm:text-sm'>
          Explore a diverse collection of headphones and earphones, curated just for you
          <br />
          at GadgetGrid by Nilay Patel
        </div>
        <Link
          to={'/search'}
          className='text-xs sm:text-sm text-green-500 font-bold hover:underline'
        >
          Explore latest Gadgets...
        </Link>
      </div>

      <Swiper navigation className='custom-swiper' loop={true}>
        {offerListings && offerListings.length > 0 && offerListings.map((listing) => (
          <SwiperSlide>
            <div
              style={{
                background: `url(${listing.imageUrls[0]}) center no-repeat`,
                backgroundSize: 'contain',
              }}
              className='h-[500px]'
              key={listing._id}
            ></div>
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {offerListings && offerListings.length > 0 && (
          <div className=''>
            <div className='my-3'>
              <h2 className='text-2xl font-semibold text-slate-200'>Gadget Lineup</h2>
              <Link className='text-sm text-green-500 hover:underline' to={'/search?offer=false'}>
                Show more Gadgets
              </Link>
            </div>
            <div className='flex flex-wrap gap-4'>
              {offerListings.map((listing) => (
                <ListingItem listing={listing} key={listing._id} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
