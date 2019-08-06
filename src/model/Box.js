const mongosso = require('mongoose')

const Box = new mongosso.Schema({
    title:{
        type: String,
        required: true
    },
    files: [{ type: mongosso.Schema.Types.ObjectId, ref: "File"}]
},
{
 timestamps: true
}
);


module.exports = mongosso.model('Box', Box)