import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ListingItem from '../components/ListingItem';

export default function Search() {
  const navigate = useNavigate();
  const [sidebardata, setSidebardata] = useState({
    searchTerm: '',
    type: 'all',
    offer: false,
    sort: 'created_at',
    order: 'desc',
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    const typeFromUrl = urlParams.get('type');
    const offerFromUrl = urlParams.get('offer');
    const sortFromUrl = urlParams.get('sort');
    const orderFromUrl = urlParams.get('order');

    if (searchTermFromUrl || typeFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
      setSidebardata({
        searchTerm: searchTermFromUrl || '',
        type: typeFromUrl || 'all',
        offer: offerFromUrl === 'true' ? true : false,
        sort: sortFromUrl || 'created_at',
        order: orderFromUrl || 'desc',
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const response = await fetch(`/server/listing/get?${searchQuery}`);
      const data = await response.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };
    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    if (e.target.id === 'searchTerm') {
      setSidebardata({ ...sidebardata, searchTerm: e.target.value });
    }
    if (e.target.id === 'offer') {
      setSidebardata({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === 'true' ? true : false,
      });
    }
    if (e.target.id === 'sort_order') {
      const sort = e.target.value.split('_')[0] || 'created_at';
      const order = e.target.value.split('_')[1] || 'desc';
      setSidebardata({ ...sidebardata, sort, order });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set('searchTerm', sidebardata.searchTerm);
    urlParams.set('type', sidebardata.type);
    urlParams.set('offer', sidebardata.offer);
    urlParams.set('sort', sidebardata.sort);
    urlParams.set('order', sidebardata.order);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex', startIndex);
    const searchQuery = urlParams.toString();
    const response = await fetch(`/server/listing/get?${searchQuery}`);
    const data = await response.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };

  return (
    <div className='text-slate-300 flex flex-col md:flex-row mt-20'>
      <div className='p-7  border-b md:border-r border-slate-700 md:min-h-screen'>
        <form onSubmit={handleSubmit} className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Gadget Specs:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='type Apple Airp...'
              value={sidebardata.searchTerm}
              onChange={handleChange}
              className='border rounded-lg p-3 w-full focus:outline-green-500 text-black'
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <div className='flex gap-2'>
              <input 
                type='checkbox' 
                id='offer' 
                className='w-5' 
                onChange={handleChange}
                checked={sidebardata.offer}
              />
              <span>Offer Applicable</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort Gadgets:</label>
            <select 
              onChange={handleChange}
              defaultValue={'created_at_desc'}
              id='sort_order' 
              className='border rounded-lg p-3 text-black focus:outline-green-500'
            >
              <option value='price_desc'>Price high to low</option>
              <option value='price_asc'>Price low to high</option>
              <option value='createdAt_desc'>Latest</option>
              <option value='createdAt_asc'>Oldest</option>
            </select>
          </div>
          <button className='text-center bg-slate-950 text-slate-200 shadow-lg p-3 rounded-lg uppercase hover:opacity-85'>
            Search
          </button>
        </form>
      </div>
      <div className='flex-1'>
        <h1 className='text-3xl font-semibold border-b border-slate-700 p-3 mt-5'>
          Look what we found:
        </h1>
        <div className='p-4 flex flex-wrap gap-4'>
          {!loading && listings.length === 0 && (
            <p className='text-xl text-slate-300'>No Gadgets in the Grid!</p>
          )}
          {loading && (
            <p className='text-xl text-slate-300 text-center w-full'>
              Loading...
            </p>
          )}
          {!loading && listings && listings.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
            {showMore && (
            <button
              onClick={onShowMoreClick}
              className='text-green-500 text-lg hover:underline p-7 text-center w-full'
            >
              Show more
            </button>
          )}
        </div>
      </div>
    </div>
  );
}