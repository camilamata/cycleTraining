const chartsSchema = require("../models/chartsSchema");

const cycleAnalysis = async(req, res) => {    
    try { 
        const today = new Date();
        const dateLastPeriod = req.body.date
        const validDate = new Date(dateLastPeriod)
        console.log(validDate)  
        const timeDifference = today.getTime() - validDate.getTime()
        const dateDifference = Math.trunc(timeDifference/(86400000))
        console.log(dateDifference) 
        
        if(dateDifference > 0 && dateDifference < 5) {
            const foundCharts = await chartsSchema.find({category:"menstrual"})
            res.status(200).json({
                "Since your last period started in": req.body,
                "Try to respect your bodys high hormonal load. Moderate cardio (no breathless intervals), outdoor walks and hikes, strength training (low to moderate weight and higher reps), yoga, and Pilates are all great choices. This is a good time to work on enhancing your mobility, and make sure to stay away from hot workout environments. We recomend you these exercises" : foundCharts
            });
            console.log("Menstrual")
        } 

        if(dateDifference > 4 && dateDifference < 12) {
            const foundCharts = await chartsSchema.find({category:"postMenstrual"})
            res.status(200).json({
                "Since your last period started in": req.body,
                "You are in the follicular stage. That means your levels of the hormones estrogen and progesterone are low.This is when you can HIIT it hard! Get your high intensity interval training, powerlifting, heavy weight lifting, plyometrics, long runs, hot yoga, hill repeats, or other intense exercise modalities in now. Take at least one rest day between hard workouts, and be mindful of signs of overtraining, as some studies suggest you may be more prone to muscle damage from overtraining during this phase. Try these exercises" : foundCharts
            });
            console.log("Post Menstrual")
        } 

        if(dateDifference > 11 && dateDifference < 24) {
            const foundCharts = await chartsSchema.find({category:"ovulation"})
            res.status(200).json({
                "Since your last period started in": req.body,
                "You are in the follicular stage. That means your levels of the hormones estrogen and progesterone are low.This is when you can HIIT it hard! Get your high intensity interval training, powerlifting, heavy weight lifting, plyometrics, long runs, hot yoga, hill repeats, or other intense exercise modalities in now. Take at least one rest day between hard workouts, and be mindful of signs of overtraining, as some studies suggest you may be more prone to muscle damage from overtraining during this phase. Try these exercises": foundCharts
            });
            console.log("ovulation")
        } 

        if(dateDifference > 23 && dateDifference < 28) {
            const foundCharts = await chartsSchema.find({category:"pms"})
            res.status(200).json({
                "Since your last period started in": req.body,
                "Try to respect your bodys high hormonal load. Moderate cardio (no breathless intervals), outdoor walks and hikes, strength training (low to moderate weight and higher reps), yoga, and Pilates are all great choices. This is a good time to work on enhancing your mobility, and make sure to stay away from hot workout environments. We recomend you these exercises": foundCharts
            });
            console.log("pms")
        } 


        
        
    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: error.message,
            details: "Invalid search."
        });
    }
};

module.exports = {
    cycleAnalysis
};