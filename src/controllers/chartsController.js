const chartsSchema = require("../models/chartsSchema");

const register = async (req, res) => {   
   
    try {
        const { name, force, level, mechanic, equipment, primaryMuscles, instructions, type, category } = req.body;
        const newChart = await chartsSchema.create({name, force, level, mechanic, equipment, primaryMuscles, instructions, type, category});
        const registeredChart = await newChart.save();

        if(registeredChart) {
            res.status(201).send({
                "message": "The exercise was registered!",
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

const deleteById = async (req, res) => {
    try { 
                      
        const getChart = await chartsSchema.findById(req.params.id)

        if(!getChart) {

                throw {
                    statusCode: 404,
                    message: "We don't have any exercises with this ID.",
                    query: req.params
                }
            }
        await getChart.delete()
        res.status(200).json([{
            "message": "The exercise was successfully deleted!",
            "Deleted exercise": getChart
        }])
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).json(error)
        } else {
            res.status(500).json({ message: error.message })
        }

    }
};

const updateChart = async (req, res) => {
    const {name, force, level, mechanic, equipment, primaryMuscles, instructions, type, category } = req.body
    try {        
        const getChart = await chartsSchema.findById(req.params.id)

        if (!getChart) {
            throw {
                statusCode: 404,
                message: "We don't have any exercizes with this ID;"                
            }
        } 
         
        getChart.name = name || getChart.name
        getChart.force = force || getChart.force
        getChart.level = level || getChart.level
        getChart.mechanic = mechanic || getChart.mechanic
        getChart.equipment = equipment || getChart.equipment
        getChart.primaryMuscles = primaryMuscles || getChart.primaryMuscles
        getChart.instructions = instructions || getChart.instructions
        getChart.type = type || getChart.type
        getChart.category = category || getChart.category

        const updatedChart = await getChart.save()

        res.status(200).json({
            "The exercise was successfully updated!": updatedChart
        })
        
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).json(error)
        } else {
            res.status(500).json({ message: error.message })
        }

    
    }
};


module.exports = {
    register,
    getByName,
    deleteById,
    updateChart
};