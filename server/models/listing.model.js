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
  offer:{
    type: Boolean,
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
  leftUnits:{
    type: Number,
    required: true,
  },
  playbackTime:{
    type: Number,
    required: true,
  },
  warranty:{
    type: Number,
    required: true,
  },
  imageUrls:{
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

