import { useEffect, useState } from "react";
import API from "./services/api";

function App() {
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    register_number: "",
    email: "",
    department: "",
    year: "",
    phone: "",
  });

  const fetchStudents = () => {
    API.get("students/")
      .then((res) => setStudents(res.data))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.id) {
      // UPDATE
      API.put(`students/${formData.id}/`, formData)
        .then(() => {
          resetForm();
          fetchStudents();
        })
        .catch((err) => console.error(err));
    } else {
      // CREATE
      API.post("students/", formData)
        .then(() => {
          resetForm();
          fetchStudents();
        })
        .catch((err) => console.error(err));
    }
  };

  const handleEdit = (student) => {
    setFormData(student);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      API.delete(`students/${id}/`)
        .then(fetchStudents)
        .catch((err) => console.error(err));
    }
  };

  const resetForm = () => {
    setFormData({
      id: null,
      name: "",
      register_number: "",
      email: "",
      department: "",
      year: "",
      phone: "",
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>College Management System</h2>

      <h3>{formData.id ? "Edit Student" : "Add Student"}</h3>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="register_number"
          placeholder="Register Number"
          value={formData.register_number}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="department"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="year"
          placeholder="Year"
          value={formData.year}
          onChange={handleChange}
          required
        />
        <br /><br />

        <input
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <br /><br />

        <button type="submit">
          {formData.id ? "Update" : "Add"}
        </button>

        {formData.id && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <hr />

      <h3>Student List</h3>
      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email} ({student.department})
            {" "}
            <button onClick={() => handleEdit(student)}>Edit</button>
            {" "}
            <button onClick={() => handleDelete(student.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
