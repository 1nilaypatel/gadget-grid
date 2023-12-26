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
  // color:{
  //   type: Array,
  //   required: true,
  // },
  // keyFeatures:{
  //   type: String,
  //   required: true,
  // },
  dimensions:{
    type: String,
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

