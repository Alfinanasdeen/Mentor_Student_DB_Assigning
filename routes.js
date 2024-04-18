const express = require("express");
const { Student, Mentor } = require("./models");
const router = express.Router();

// Create Mentor
router.post("/mentors", async (req, res) => {
  try {
    const mentor = new Mentor(req.body);
    await mentor.save();

    res.status(200).json({
      message: "Mentor created successfully",
      mentor: { _id: mentor._id, name: mentor.name, __v: mentor.__v },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Create Student with Mentor
router.post("/students", async (req, res) => {
  try {
    const { name, mentorId } = req.body;

    if (!mentorId) {
      return res.status(400).json({ error: "Mentor ID is required" });
    }

    const mentor = await Mentor.findById(mentorId);
    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    const student = new Student({
      name: name,
      mentor: {
        id: mentor._id,
        name: mentor.name,
      },
    });

    await student.save();

    mentor.students.push(student._id);
    await mentor.save();

    res.status(201).json({
      message: "Student created successfully",
      student: student,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Assign Student to Mentor
router.put("/assign/:mentorId/:studentId", async (req, res) => {
  try {
    const { mentorId, studentId } = req.params;
    const mentor = await Mentor.findById(mentorId);
    const student = await Student.findById(studentId);

    if (!mentor || !student) {
      return res.status(404).json({ error: "Mentor or student not found" });
    }

    mentor.students.push(studentId);
    student.mentor = mentorId;

    await mentor.save();
    await student.save();

    res.json({ message: "Student assigned to mentor successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Assign or Change Mentor for Student
router.put("/students/:studentId/assign/:mentorId", async (req, res) => {
  try {
    const { studentId, mentorId } = req.params;
    const student = await Student.findById(studentId);
    const mentor = await Mentor.findById(mentorId);

    if (!student || !mentor) {
      return res.status(404).json({ error: "Student or mentor not found" });
    }

    if (student.mentor) {
      // Remove student from old mentor's list
      const oldMentor = await Mentor.findById(student.mentor);
      oldMentor.students.pull(studentId);
      await oldMentor.save();
    }

    student.mentor = mentorId;
    mentor.students.push(studentId);

    await student.save();
    await mentor.save();

    res.json({ message: "Mentor assigned to student successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Show all students for a particular mentor
router.get("/mentors/:mentorId/students", async (req, res) => {
  try {
    const { mentorId } = req.params;
    const mentor = await Mentor.findById(mentorId).populate("students");

    if (!mentor) {
      return res.status(404).json({ error: "Mentor not found" });
    }

    res.json(mentor.students);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Show previously assigned mentor for a particular student
router.get("/schedule/student-mentor/:studentId", async (req, res) => {
  try {
    const { studentId } = req.params;

    const student = await Student.findById(studentId).populate("mentor");

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    if (!student.mentor) {
      return res.json({ message: "Student has no previously assigned mentor" });
    }

    res.status(200).json({
      message: "Successfully fetched Student previously assigned mentor",
      mentor: student.mentor,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
