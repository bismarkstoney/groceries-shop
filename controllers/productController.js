import Product from "../models/Product.js"

//@Desc  - Get all products from the database
//@route - GET /api/v1/product
//@acess - Public
export const getAllProduct=async(req,res)=>{

    try {
        const products= await Product.find()
        res.status(200).json({'success':true, data: products})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}

//@Desc  - Get a single product from the database
//@route - GET /api/v1/product/:id
//@acess - Public
export  const getProduct=async(req,res)=>{

    try {
        const product= await Product.findById(req.params.id)
        if(!product) return res.status(400).json({message: `The product with ${req.params.id}not found`})
        res.status(200).json({'success':true, data: product})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}


//@Desc  - create a single product from the database
//@route - POST /api/v1/product
//@acess - Private
export const addProduct= async(req,res)=>{

    try {
        const newProduct= new Product({
            name: req.body.name ,
            description: req.body.description,
            discount: req.body.discount,
            price: req.body.price,
            coverImage:req.file ? req.file.location : '',
            category:req.category.id
            
      
          })
      
          const product= await newProduct.save()
         res.status(200).json({"sucess":true, data:product})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    


}






//@Desc  - Delete a single product from the database
//@route - DELETE /api/v1/product/:id
//@acess - Private

export const deleteProduct=async(req,res)=>{

    try {
        const product= await Product.findByIdAndDelete(req.params.id)
        if(!product) return res.status(400).json({message: `The product with ${req.params.id}not found`})
        res.status(200).json({'message':'product deleted'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}


//@Desc  - Update a single product from the database
//@route - GET /api/v1/product/:id
//@acess - Public
export const updateProduct=async(req,res)=>{

    try {
        const product= await Product.findById(req.params.id, req.body, {
            new:true,
            runValidators:true
        })
        if(!product) return res.status(400).json({message: `The product with ${req.params.id}not found`})
        res.status(200).json({'success':true, data: product})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}


//export default {addProduct,deleteProduct,updateProduct, getAllProduct,getProduct}