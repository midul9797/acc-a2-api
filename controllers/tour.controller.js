
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true,"Give a name"],
        minLength: [3, "Name must be at least 3 Characters"],
        maxLength: [100, "Name is too large"]
    },
    image: {
        type: String,
        required: [true, "Give a image"]
    },
    price: {
        type: Number,
        required: [true, "Give a price"]
    },
    destination: {
        type: String, 
        required: [true, "Provide destination"],
        maxLength: [100, "Too large"]
    }
})
const Tour = mongoose.model('Tour',tourSchema);
module.exports.getAllTours = async (req,res,next) =>{
    try {
        const queryObject = {...req.query};
        const excludeFields = ['sort','page','limit'];
        excludeFields.forEach(field => delete queryObject[field]);
        let sortBy, dataLimit, allFields,page;
        if(req.query.sort){
            sortBy = req.query.sort.split(',').join(' ');
        }
        if(req.query.limit){
            dataLimit = req.query.limit;
            console.log(dataLimit);
        }else dataLimit = 5;
        if(req.query.fields) allFields = req.query.fields.split(',').join(' ');
        if(req.query.page) page = req.query.page;
        else page =1;
        const skip = (page - 1)*dataLimit;
        const tours = await Tour.find(queryObject).sort(sortBy).limit(+dataLimit).select(allFields).skip(skip);
        res.send(tours);
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
module.exports.addTour = async(req,res,next) =>{
    try{

        const tour = new Tour(req.body);
        const result = await tour.save();
        res.send(tour);
    }catch(err){
        res.status(400).json({
            status: "failed",
            message: err.message
        })
    }
}
module.exports.getOneTour = async (req,res,next) =>{
    try {
        const {id} = req.params;
        const tour = await Tour.findOne({_id: id});
        res.send(tour);
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
module.exports.updateTour = async(req,res,next) =>{
    try {
        const {id} = req.params;
        const tour = await Tour.updateOne({_id: id},{$set: req.body});
        res.status(200).json({
            status: "update successful",
            data: tour
    })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}
module.exports.trending = async(req,res,next) =>{
    try {   
        const cheapest = await Tour.find({}).sort({"views": -1}).limit(3);
        console.log(cheapest);
        res.status(200).json({
            status: "success",
            data: cheapest
        })
        } catch (error) {
            res.status(400).json({
                status: "failed",
                message: error.message
            })
        }
}
module.exports.cheapest = async (req,res,next) =>{
    try {   
    const cheapest = await Tour.find({}).sort({"price": 1}).limit(3);
    console.log(cheapest);
    res.status(200).json({
        status: "success",
        data: cheapest
    })
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error.message
        })
    }
}