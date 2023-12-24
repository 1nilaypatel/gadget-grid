

export default function CreateListing() {
  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className='text-slate-100 text-3xl font-semibold text-center mb-8 mt-6'>
        Create a Listing
      </h1>
      <form className='flex flex-col sm:flex-row gap-7'>
        <div className='flex flex-col flex-3 gap-5'>
          <input
            type="text"
            placeholder="Gadget Name"
            className="border rounded-lg p-3 focus:outline-green-500"
            id="name"
            maxLength="100"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Product Overview"
            className="border rounded-lg p-3 focus:outline-green-500"
            id="description"
            required
          />
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="offer" 
              className="w-6 h-6"
            />
            <span className="text-slate-400">Offer</span>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="price"
                min='1'
                max='300000'
                className="border rounded-lg p-3 focus:outline-green-500"
                required
              />
              <div className="text-slate-400 flex flex-col items-center">
                <p>Price</p>
                <span className="text-sm">[max Rs.300000]</span>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="offerPrice"
                min='0'
                max='300000'
                className="border rounded-lg p-3 focus:outline-green-500"
                required
              />
              <div className="text-slate-400 flex flex-col items-center">
                <p>Offer Price</p>
                <span className="text-sm">[max Rs.300000]</span>
              </div>
            </div>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <input
                type="array"
                id="color"
                className="border rounded-lg p-3 focus:outline-green-500"
                required
              />
              <span className="text-slate-400">Add Color</span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="leftUnits"
                min='0'
                max='100'
                className="border rounded-lg p-3 focus:outline-green-500 w-13"
                required
              />
              <div className="text-slate-400 flex flex-col items-center">
                <p>Left Units</p>
                <span className="text-sm">[0 - 100]</span>
              </div>
            </div>
          </div>
        </div>

        <div className='flex flex-col flex-1 gap-5'>
          <div className="flex flex-col gap-2">
            <p className='font-semibold text-slate-300'>
              Images:
              <span className="font-normal text-slate-400 ml-2">
                Upload images for Product Display (max 6)
              </span>
            </p>
            <div className="flex gap-2 bg-slate-950 text-slate-200 rounded-lg">
              <input 
                type="file" 
                id="imagesTop"
                accept="image/*"
                className="p-3 rounded-lg w-full"
                multiple
              />
              <button
                type='button'
                className="p-3 text-green-500 border border-green-500 rounded-lg uppercase hover:shadow-lg disabled:bg-opacity-40"
              >
                Upload
              </button>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p className='font-semibold text-slate-300'>
              Images:
              <span className="font-normal text-slate-400">
                Upload images for Product Showcase (max 3)
              </span>
            </p>
            <div className="flex gap-2 bg-slate-950 text-slate-200 rounded-lg">
              <input 
                type="file" 
                id="imagesTop"
                accept="image/*"
                className="p-3 rounded-lg w-full"
                multiple
              />
              <button
                type='button'
                className="p-3 text-green-500 border border-green-500 rounded-lg uppercase hover:shadow-lg disabled:bg-opacity-40"
              >
                Upload
              </button>
            </div>
          </div>
          <button className="p-3 bg-green-500 text-black rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40">Create Listing</button>
        </div>
      </form>
    </main>
  )
}
