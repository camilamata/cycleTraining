const bcrypt = require("bcrypt");
const ObjectId = require("mongodb").ObjectId;
const userModel = require("../models/userSchema");


const register = async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, 10);
    req.body.password = hashedPassword;    
    try {
        const { name, email, password, age, workoutPreference } = req.body;
        const newUser = await userModel.create({name, email, password, age, workoutPreference});
        const registeredUser = await newUser.save();

        if(registeredUser) {
            res.status(201).send({
                "message": "Athlete successfully registered!",
                registeredUser
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
        const foundUser = await userModel.find({name: {$regex : name, $options: 'i'}})

        if(!foundUser) {
            throw new Error ("No athletes with this name. Try again.")
        }
        
        res.status(200).json({
            "Searching for": req.query,
            "We found these athletes": foundUser
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: error.message,
            details: "Invalid search."
        });
    }
};

const deleteById = async (req, res) => {
    try { 
                      
        const getUser = await userModel.findById(req.params.id)

        if(!getUser) {
         
                throw {
                    statusCode: 404,
                    message: "No athletes with this ID.",
                    query: req.params
                }
            }
        await getUser.delete()
        res.status(200).json([{
            "message": "The athlete was successfully deleted!",
            "Deleted athlet": getUser}])
    } catch (error) {
        if (error.statusCode) {
            res.status(error.statusCode).json(error)
        } else {
            res.status(500).json({ message: error.message })
        }

    }
};

const updateUser = async (req, res) => {
    const {name, email, password, age, workoutPreference} = req.body
    try {        
        const getUser = await userModel.findById(req.params.id)

        if (!getUser) {
            throw {
                statusCode: 404,
                message: "No athletes with this ID."                
            }
        }

        getUser.name = name || getUser.name
        getUser.email = email || getUser.email
        getUser.password = password || getUser.password
        getUser.age = age || getUser.age
        getUser.workoutPreference = workoutPreference || getUser.workoutPreference

        const updatedUser = await getUser.save()

        res.status(200).json({
            "The athlete was successfully updated!": updatedUser
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
    updateUser
};