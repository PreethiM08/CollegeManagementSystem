import { useState, useEffect } from 'react'
import API from './services/api'


function App() {
  const [students, setStudents] = useState([])

   useEffect(() => {
    API.get("students/")
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  return (
    <>
       <div style={{ padding: "20px" }}>
      <h2>College Management System</h2>

      <ul>
        {students.map((student) => (
          <li key={student.id}>
            {student.name} - {student.email}
          </li>
        ))}
      </ul>
    </div>
    </>
  )
}

export default App
