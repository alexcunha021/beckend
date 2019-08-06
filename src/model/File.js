const mongosso = require('mongoose')

const File = new mongosso.Schema({
    title:{
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
    },
},
{
    timestamps: true,
    toObject: { virtuals: true },
    toJSON: { virtuals: true }
});

File.virtual("url").get(function(){
    const url = process.env.PORT || 'http://localhost:3333'
    return `${url}/files/${encodeURIComponent(this.path)}`;
})
module.exports = mongosso.model('File', File)