// Function to create a mentor
async function createMentor() {
  const mentorName = prompt("Enter mentor name:");
  if (mentorName) {
    try {
      const response = await fetch('/api/mentors', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: mentorName })
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error creating mentor:', error);
      alert('Error creating mentor. Please try again later.');
    }
  }
}

// Function to create a student
async function createStudent() {
  const studentName = prompt("Enter student name:");
  const mentorId = prompt("Enter mentor ID:");
  if (studentName && mentorId) {
    try {
      const response = await fetch('/api/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: studentName, mentorId: mentorId })
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error creating student:', error);
      alert('Error creating student. Please try again later.');
    }
  }
}

// Function to assign a student to a mentor
async function assignStudentToMentor() {
  const mentorId = prompt("Enter mentor ID:");
  const studentId = prompt("Enter student ID:");
  if (mentorId && studentId) {
    try {
      const response = await fetch(`/api/assign/${mentorId}/${studentId}`, {
        method: 'PUT'
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error assigning student to mentor:', error);
      alert('Error assigning student to mentor. Please try again later.');
    }
  }
}

// Function to assign or change mentor for a student
async function assignOrChangeMentorForStudent() {
  const mentorId = prompt("Enter mentor ID:");
  const studentId = prompt("Enter student ID:");
  if (mentorId && studentId) {
    try {
      const response = await fetch(`/api/students/${studentId}/assign/${mentorId}`, {
        method: 'PUT'
      });
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error('Error assigning or changing mentor for student:', error);
      alert('Error assigning or changing mentor for student. Please try again later.');
    }
  }
}

// Function to show all students for a particular mentor
async function showAllStudentsForMentor() {
  const mentorId = prompt("Enter mentor ID:");
  if (mentorId) {
    try {
      const response = await fetch(`/api/mentors/${mentorId}/students`);
      const data = await response.json();
      alert(JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching students for mentor:', error);
      alert('Error fetching students for mentor. Please try again later.');
    }
  }
}

// Function to show the previously assigned mentor for a particular student
async function showPreviouslyAssignedMentor() {
  const studentId = prompt("Enter student ID:");
  if (studentId) {
    try {
      const response = await fetch(`/api/schedule/student-mentor/${studentId}`);
      const data = await response.json();
      alert(JSON.stringify(data));
    } catch (error) {
      console.error('Error fetching previously assigned mentor for student:', error);
      alert('Error fetching previously assigned mentor for student. Please try again later.');
    }
  }
}


