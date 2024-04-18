const mongoose = require('mongoose');

// student Schema
const studentSchema = new mongoose.Schema({
  name: String,
  mentor: {
    id: {  
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mentor' 
    },
    name: String  
  }
}, { versionKey: false });


// Mentor Schema
const mentorSchema = new mongoose.Schema({
  name: String,
  students: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Student' 
  }]
}, { versionKey: false });

const Student = mongoose.model('Student', studentSchema);
const Mentor = mongoose.model('Mentor', mentorSchema);

module.exports = { Student, Mentor };
