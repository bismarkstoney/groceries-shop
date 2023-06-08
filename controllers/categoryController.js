import  Category from "../models/Categories.js"

//@Desc  - Get all categories from the database
//@route - GET /api/v1/category
//@acess - Public
export const getAllCategroies=async(req,res)=>{

    try {
        const categories= await Category.find()
        res.status(200).json({'success':true, results:categories.length, data: categories})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}

//@Desc  - Get a single catagory from the database
//@route - GET /api/v1/category/:id
//@acess - Public
export const getCategory=async(req,res)=>{

    try {
        const category= await Category.findById(req.params.id)
        if(!category) return res.status(400).json({message: `The category with ${req.params.id}not found`})
        res.status(200).json({'success':true, data: category})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}


//@Desc  - create a  category 
//@route - POST /api/v1/category
//@acess - Private
export const addCategory= async(req,res)=>{

    try {
        const newCategory= new Category({
            name: req.body.name ,
           image:req.file ? req.file.location : '',
            itemCount:req.body.itemCount
      
          })
      
          const category= await newCategory.save()
         res.status(200).json({"sucess":true, data:category})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
    


}



//@Desc  - Delete a single category from the database
//@route - DELETE /api/v1/category/:id
//@acess - Private
export const deleteCategory=async(req,res)=>{

    try {
        const category= await Category.findByIdAndDelete(req.params.id)
        if(!category) return res.status(400).json({message: `The category with ${req.params.id}not found`})
        res.status(200).json({'message':'category deleted'})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}


//@Desc  - Update a single category from the database
//@route - GET /api/v1/category/:id
//@acess - Private
export const updateCategory=async(req,res)=>{

    try {
        const category= await Category.findByIdAndUpdate(req.params.id, req.body, {
            new:true,
            runValidators:true
        })
        if(!category) return res.status(400).json({message: `The category with ${req.params.id}not found`})
        res.status(200).json({'success':true, data: category})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
  
}



