import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profilephoto: downloadURL })
        );
      }
    );
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className='text-slate-100 text-center text-3xl font-semibold my-8'>Profile</h1>
      <form className="flex flex-col gap-5">
        <input 
          onChange={(e) => setFile(e.target.files[0])}
          type="file" 
          ref={fileRef} 
          hidden 
          accept="image/*" 
        />
        <img 
          onClick={() => fileRef.current.click()}
          src={formData.profilephoto || currentUser.profilephoto} 
          alt="profile" 
          className="rounded-full w-25 h-25 self-center cursor-pointer mt-2"
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-500 font-semibold'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-200'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-500'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input 
          type="username"
          placeholder="username"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input 
          type="email"
          placeholder="email"
          id="email"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <input 
          type="password"
          placeholder="password"
          id="password"
          className="border rounded-lg p-3 focus:outline-none"
        />
        <button className="bg-green-500 text-black p-3 rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40">
          Update
        </button>
      </form>
      <div className="mt-5 flex justify-between">
        <span className="text-red-500 cursor-pointer font-semibold">Delete account</span>
        <span className="text-red-500 cursor-pointer font-semibold">Sign out</span>
      </div>
    </div>
  )
}
