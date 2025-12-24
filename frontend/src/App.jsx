import { useEffect, useState } from "react";
import API from "./services/api";
import Login from "./pages/Login";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("access_token")
  );
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
      .catch(() => setIsAuthenticated(false));
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchStudents();
    }
  }, [isAuthenticated]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

     if (formData.id) {
      API.put(`students/${formData.id}/`, formData).then(fetchStudents);
    } else {
      API.post("students/", formData).then(fetchStudents);
    }

    setFormData({ id: null, name: "", email: "", department: "" });
  };

  const handleEdit = (student) => setFormData(student);

  const handleDelete = (id) => {
    API.delete(`students/${id}/`).then(fetchStudents);
  };

    const logout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return <Login onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>College Management System(Admin)</h2>
      <button onClick={logout}>Logout</button>

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
      </form>

      

      <h3>Student List</h3>
       <ul>
        {students.map((s) => (
          <li key={s.id}>
            {s.name} ({s.department})
            <button onClick={() => handleEdit(s)}>Edit</button>
            <button onClick={() => handleDelete(s.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
