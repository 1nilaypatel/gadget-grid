import { useState, useEffect } from "react"
import { getDownloadURL, getStorage, ref, uploadBytesResumable, } from 'firebase/storage';
import { app } from '../firebase';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

export default function UpdateListing() {
  const navigate = useNavigate();
  const params = useParams();
  const { currentUser } = useSelector((state) => state.user);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    offer: false,
    price: 99,
    offerPrice: 0,
    leftUnits: 1,
    // color: [],
    imageUrls: [],
  });
  const [imageUploadError, setImageUploadError] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  console.log(formData);

  useEffect(() => {
    const fetchListing = async () => {
      const listingId = params.listingId;
      const response = await fetch(`/server/listing/get/${listingId}`);
      const data = await response.json();
      if(data.success === false){
        console.log(data.message);
        return;
      }
      setFormData(data);
    };
    fetchListing();
  }, []);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises)
        .then((urls) => {
          setFormData({
            ...formData,
            imageUrls: formData.imageUrls.concat(urls),
          });
          setImageUploadError(false);
          setUploading(false);
        })
        .catch((err) => {
          setImageUploadError('Image upload failed (2 mb max per image)');
          setUploading(false);
        });
    } else {
      setImageUploadError('You can only upload 6 images per listing');
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Upload is ${progress}% done`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData,
      imageUrls: formData.imageUrls.filter((_, i) => i !== index),
    });
  };

  const handleChange = (e) => {
    if(e.target.id === 'offer'){
      setFormData({
        ...formData, 
        [e.target.id]: e.target.checked,
      });
    }
    if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      if(formData.imageUrls.length < 1){
        return setError("At least one image need to be uploaded");
      }
      if(+formData.price < +formData.offerPrice){
        return setError("Offer Price must be lower than Original Price");
      }
      setLoading(true);
      setError(true);
      const response = await fetch(`/server/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          userRef: currentUser._id,
        }),
      });
      const data = await response.json();
      setLoading(false);
      if(data.success === false){
        setError(data.message);
      }
      navigate(`/listing/${data._id}`);
    }catch(error){
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <main className="p-3 max-w-5xl mx-auto">
      <h1 className='text-slate-100 text-3xl font-semibold text-center mb-8 mt-6'>
        Update Listing
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col sm:flex-row gap-7'>
        <div className='flex flex-col flex-1 gap-5'>
          <input
            type="text"
            placeholder="Gadget Name"
            className="border rounded-lg p-3 focus:outline-green-500"
            id="name"
            maxLength="100"
            minLength="10"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            placeholder="Product Overview"
            className="border rounded-lg p-3 focus:outline-green-500"
            id="description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <div className="flex items-center gap-2">
            <input 
              type="checkbox" 
              id="offer" 
              className="w-6 h-6"
              onChange={handleChange}
              checked={formData.offer}
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
                onChange={handleChange}
                value={formData.price}
              />
              <div className="text-slate-400 flex flex-col items-center">
                <p>Price</p>
                <span className="text-sm">[max Rs.300000]</span>
              </div>
            </div>
            {formData.offer && (<div className="flex items-center gap-2">
              <input
                type="number"
                id="offerPrice"
                min='0'
                max='300000'
                className="border rounded-lg p-3 focus:outline-green-500"
                required
                onChange={handleChange}
                value={formData.offerPrice}
              />
              <div className="text-slate-400 flex flex-col items-center">
                <p>Offer Price</p>
                <span className="text-sm">[max Rs.300000]</span>
              </div>
            </div>
            )}
          </div>
          {/* <div className="flex gap-4"> */}
            {/* <div className="flex items-center gap-2">
              <input
                type="array"
                id="color"
                className="border rounded-lg p-3 focus:outline-green-500"
                required
                /////////
              />
              <span className="text-slate-400">Add Color</span>
            </div> */}
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="leftUnits"
                min='0'
                max='100'
                className="border rounded-lg p-3 focus:outline-green-500 w-13"
                required
                onChange={handleChange}
                value={formData.leftUnits}
              />
              <div className="text-slate-400 flex flex-col items-center">
                <p>Left Units</p>
                <span className="text-sm">[0 - 100]</span>
              </div>
            </div>
          {/* </div> */}
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
                onChange={(e) => setFiles(e.target.files)}
                type="file" 
                id="images"
                accept="image/*"
                className="p-3 rounded-lg w-full"
                multiple
              />
              <button
                onClick={handleImageSubmit}
                type='button'
                className="p-3 text-green-500 border border-green-500 rounded-lg uppercase hover:shadow-lg disabled:bg-opacity-40"
              >
                {uploading ? 'Uploading...' : 'Upload'}
              </button>
            </div>
          </div>
          <p className='text-red-500 text-sm'>
            {imageUploadError && imageUploadError}
          </p>
          {formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div
              key={url}
              className='flex justify-between p-3 border border-green-500 items-center '
            >
              <img
                src={url}
                alt='listing image'
                className='w-20 h-20 object-contain rounded-lg'
              />
              <button
                type='button'
                onClick={() => handleRemoveImage(index)}
                className='p-3 text-red-500 rounded-lg uppercase hover:opacity-75'
              >
                Delete
              </button>
            </div>
          ))}
          <button disabled={loading || uploading} className="p-3 bg-green-500 text-black rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40">
            {loading ? "Updating..." : "Update Listing"}
          </button>
          {error && <p className='text-red-500 text-sm'>{error}</p> }
        </div>
      </form>
    </main>
  )
}
