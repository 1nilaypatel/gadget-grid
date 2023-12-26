

export default function Search() {
  return (
    <div className='text-slate-300 flex flex-col md:flex-row'>
      <div className='p-7  border-b md:border-r border-slate-700 md:min-h-screen'>
        <form className='flex flex-col gap-8'>
          <div className='flex items-center gap-2'>
            <label className='whitespace-nowrap font-semibold'>Gadget Specs:</label>
            <input
              type='text'
              id='searchTerm'
              placeholder='type Apple Air...'
              className='border rounded-lg p-3 w-full focus:outline-none text-black'
            />
          </div>
          <div className='flex gap-2 flex-wrap items-center'>
            <div className='flex gap-2'>
              <input type='checkbox' id='offer' className='w-5' />
              <span>Offer</span>
            </div>
          </div>
          <div className='flex items-center gap-2'>
            <label className='font-semibold'>Sort:</label>
            <select id='sort_order' className='border rounded-lg p-3 text-black'>
              <option>Price high to low</option>
              <option>Price low to high</option>
              <option>Latest</option>
              <option>Oldest</option>
            </select>
          </div>
          <button className='text-center bg-slate-950 text-slate-200 shadow-lg p-3 rounded-lg uppercase hover:opacity-85'>
            Search
          </button>
        </form>
      </div>
      <div className=''>
        <h1 className='text-3xl font-semibold border-b border-slate-700 p-3 mt-5'>Look what we found:</h1>
      </div>
    </div>
  );
}