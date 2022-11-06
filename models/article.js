const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema (
    {
        title:{
            type:String,
            required:true,
            unique: true,
        },

        description:{
            type:String,
            default: ""
        },
        
        author:{
        type: String,
        ref:'User',
        required: true,
    },
        state:{
        type:String,
        default:'draft',
        enum: ['draft', 'published'],
    },

        read_count:{
        type: Number,
        default: 0,
    },

        reading_time: Number,
        tags: [String],
        body: String,
},

   {timestamps:true}
    
    )

    module.exports = mongoose.model('Article', articleSchema);

   
    