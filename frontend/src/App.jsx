import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    register_number: "",
    email: "",
    department: "",
    year:"",
    phone:"",
  });

  // Fetch students
  const fetchStudents = () => {
    API.get("students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();

    API.post("students/", formData)
      .then(() => {
        setFormData({ name: "", email: "", department: "" , register_number: "", year: "", phone: ""});
        fetchStudents();
      })
      .catch((err) => {
        console.error("Error adding student:", err);
      });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>College Management System</h2>

      <h3>Add Student</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

         <input
          type="text"
          name="register_number"
          placeholder="Register Number"
          value={formData.register_number}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          type="text"
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <br /><br />

         <input
          type="text"
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <br /><br />

         <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">Add Student</button>
      </form>

      <hr />

      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email} ({student.department}) - {student.year} - {student.phone}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
