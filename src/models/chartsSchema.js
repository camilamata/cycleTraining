const mongoose = require("mongoose");

const chartsSchema = new mongoose.Schema({
    id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        requires: true
    },
    force: {
        type: String,
        requires: true
    },
    level: {
        type: String,
        requires: true
    },
    mechanic:  {
        type: String,
        requires: true
    },
    equipment: {
        type: String,
        requires: true
    },
    primaryMuscles: {
        type: Array,
        requires: true
    },    
    instructions:  {
        type: Array,
        requires: true
    },
    type: {
        type: String,
        requires: true
    },
    category:  {
        type: String,
        requires: true
    }
  });

const chartsModel = mongoose.model("Charts", chartsSchema);

module.exports = chartsModel;