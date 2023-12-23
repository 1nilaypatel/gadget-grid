import mongoose from 'mongoose';

const listingSchema = new mongoose.Schema({
  name:{
    type: String,
    required: true,
  },
  description:{
    type: String,
    required: true,
  },
  price:{
    type: Number,
    required: true,
  },
  offerPrice:{
    type: Number,
    required: true,
  },
  color:{
    type: String,
    required: true,
  },
  stock:{
    type: Boolean,
    required: true,
  },
  keyFeatures:{
    type: String,
    required: true,
  },
  overview:{
    type: String,
    required: true,
  },
  imageUrlsForTop:{
    type: Array,
    required: true,
  },
  imageUrlsForBottom:{
    type: Array,
    required: true,
  },
  userRef:{
    type: String,
    required: true,
  },
}, {timestamps: true});

const Listing = mongoose.model('Listing', listingSchema);

export default Listing; 

