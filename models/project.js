import { Schema,model,models } from 'mongoose';

const ProjectSchema = new Schema({
    userid : {
        type : String,
        require : [true, "A project userid is required"]
    },
    title : {
        type : String,
        require : [true, " A project title is required"]
    },
    desc : {
        type : String,
        require : [true, " A project description is required"]
    },
    date : {
        type : String,
        require : [true, " A project creation date is required"]
    },
    time : {
        type : String,
        require : [true, " A project creation time is required"]
    },
    results : {
        type : Array,
        require : false
    }
})


const Project = models.Project || model('Project', ProjectSchema)

export default Project;
// results : {
//     id : {type : Number},
//     labels : {type : Array},
//     comps : {type : Array},
//     table : {type : Array},
//     testtype : {type : String},
//     charttype : {type : String},
//     unit : {type : String},
//     date : {type : String},
//     time : {type : String},
//     subtitle : {type : String},
//     conclusion : {type : String}
// }