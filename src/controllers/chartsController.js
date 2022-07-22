const chartsSchema = require("../models/chartsSchema");

const register = async (req, res) => {   
   
    try {
        const { name, force, level, mechanic, equipment, primaryMuscles, instructions, type, category } = req.body;
        const newChart = await chartsSchema.create({name, force, level, mechanic, equipment, primaryMuscles, instructions, type, category});
        const registeredChart = await newChart.save();

        if(registeredChart) {
            res.status(201).send({
                "message": "Novo exercício cadastrado!",
                registeredChart
            })
        }
    } 
     catch (error) {
        console.error(error)
    }
};

const getByName = async(req, res) => {    
    try { 
        const name = req.query.name
        const foundExercise = await chartsSchema.find({name: {$regex : name , $options: 'i'}})

        if(!foundExercise) {
            throw new Error ("We don't have that exercise. Would you like to register?")
        }
        
        res.status(200).json({
            "Searching for": req.query,
            "We found these exercises": foundExercise
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            details: "Invalid search."
        });
    }
};




module.exports = {
    register,
    getByName
};