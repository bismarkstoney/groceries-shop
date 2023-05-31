import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  discount:{
       type: Number
  },
  afterDiscount:{
     type:Number
  },
  price: {
    type: Number,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  coverImage: {
    type:String,
    required:[true, 'Cover image is required']
  },
  images:{
    type: [Array]
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  featuredProduct:{
    type: Boolean,
    default: true
  },
  bestSells:{
    type: Boolean,
    default: true
  },

});

const Product = mongoose.model('Product', productSchema);

export default Product
