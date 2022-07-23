

/* const cycleAnalysis = async (req, res) => {   
   
    try {
        const { lastPeriodDate } = req.body;
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