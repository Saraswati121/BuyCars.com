const Router = require("express")
const carRoute = Router()
const carModel = require("../models/carModel")

carRoute.post('/createcars',async(req,res)=>{
    try {
        const { title,image, bulletPoints, price,colors,mileage } = req.body;
        if(!title || !image || !bulletPoints || !price || !colors || !mileage){
            return res.status(422).send({ message: "fill all the details" }); 
        }
        if(isNaN(price)){
            return res.status(422).send({ message: "price should be a number" });
        }
        const newCar = new carModel({
            title,
            image,
            bulletPoints,
            price,
            colors,
            mileage
        });
        await newCar.save();
        res.status(200).send({ message: "cars saved successfully" });
    } catch (error) {
        console.error('Error creating service request:', err);
        res.status(500).json({ error: 'Server error', specificError: err.message }); 
    }
})

carRoute.get('/viewcars',async(req,res)=>{
    try {
      const carDetails = await carModel.find();
      res.send({ message: 'carDetails'},carDetails)  
    } catch (error) {
        res.status(500).json({ message: 'Server Error', err});
    }
})

carRoute.patch('/updatecars/:id',async(req,res)=>{
    try {
    const {id} = req.params;
    const updateData = req.body
    const reqData = await carModel.findByIdAndUpdate(id, updateData,{new:true});
    return res.status(200).send(reqData);
    } catch (error) {
      console.error('Error updating service request:', err);
      res.status(500).json({ error: 'Server error' });
    }
})

carRoute.delete('/deletecars/:id',async(req,res)=>{
    try {
        const {id} = req.params
    const carDelete = await carModel.findByIdAndDelete(id);
    res.status(200).send({ message: 'car deleted successfully'},carDelete);
    } catch (error) {
        console.error('Error deleting service request:', err);
        res.status(500).json({ error: 'Server error' });
    }
})

module.exports = carRoute