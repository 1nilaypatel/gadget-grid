import { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../firebase';
import { updateUserStart, updateUserSuccess, updateUserFailure, deleteUserFailure, deleteUserStart, deleteUserSuccess, signOutUserStart, signOutUserFailure, signOutUserSuccess, } from "../redux/user/userSlice";
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";

export default function Profile() {
  const {currentUser, loading, error} = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const dispatch = useDispatch();

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

  const handleChange = (e) => { 
    setFormData({...formData, [e.target.id]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      dispatch(updateUserStart());
      const response = await fetch(`/server/user/update/${currentUser._id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if(data.success === false){
        dispatch(updateUserFailure(data.message));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    }catch(error){
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    try{
      dispatch(deleteUserStart());
      const response = await fetch(`/server/user/delete/${currentUser._id}`, {
        method: 'DELETE'
      });
      const data = await response.json();
      if(data.success === false){
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  };

  const handleSignOut = async () => {
    try{
      dispatch(signOutUserStart());
      const response = await fetch(`/server/auth/signout`, {
        method: 'GET'
      });
      const data = await response.json();
      if(data.success === false){
        dispatch(signOutUserFailure(data.message));
        return;
      }
      dispatch(signOutUserSuccess(data));
    }catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className='text-slate-100 text-center text-3xl font-semibold my-5'>Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
          type="text"
          placeholder="username"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-green-500"
        />
        <input 
          type="email"
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-green-500"
        />
        <input 
          type="password"
          placeholder="password"
          id="password"
          onChange={handleChange}
          className="border rounded-lg p-3 focus:outline-green-500"
        />
        <button 
          disabled={loading}
          className="bg-green-500 text-black p-3 rounded-lg uppercase hover:bg-opacity-85 disabled:bg-opacity-40"
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link 
          className='text-center bg-slate-950 text-slate-200 shadow-lg p-3 rounded-lg uppercase hover:bg-opacity-85'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>
      <div className="mt-5 flex justify-between">
        <span onClick={handleDeleteUser} className="text-red-500 cursor-pointer font-semibold">Delete account</span>
        <span onClick={handleSignOut} className="text-red-500 cursor-pointer font-semibold">Sign out</span>
      </div>
      <p className='text-red-500 font-semibold mt-5'>{error ? error : ''}</p>
      <p className='text-green-500'>{updateSuccess ? "User updated successfully" : ""}</p>
    </div>
  )
}
