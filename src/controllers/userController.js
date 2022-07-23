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
                "message": "Atleta cadastrada com sucesso!",
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
            throw new Error ("Nenhuma atleta com esse nome. Tente novamente")
        }
        
        res.status(200).json({
            "Buscando por": req.query,
            "Encontramos as seguintes atletas": foundUser
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({
            message: error.message,
            details: "Sua busca foi inválida"
        });
    }
};

const deleteById = async (req, res) => {
    try { 
                      
        const getUser = await userModel.findById(req.params.id)

        if(!getUser) {
         
                throw {
                    statusCode: 404,
                    message: "Nenhuma atleta com esse ID.",
                    query: req.params
                }
            }
        await getUser.delete()
        res.status(200).json([{
            "mensagem": "Atleta deletada com sucesso.",
            "Atleta deletada": getUser}])
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
                message: "Não conseguimos localizar essa atleta."                
            }
        }

        getUser.name = name || getUser.name
        getUser.email = email || getUser.email
        getUser.password = password || getUser.password
        getUser.age = age || getUser.age
        getUser.workoutPreference = workoutPreference || getUser.workoutPreference

        const updatedUser = await getUser.save()

        res.status(200).json({
            "O cadastro da atleta atualizado com sucesso!": updatedUser
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