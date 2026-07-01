import { useEffect, useState } from "react";
import { getEmployees, addEmployee , deleteEmployee , updateEmployee} from "./services/EmployeeService";

function App() {

  const [employees, setEmployees] = useState([]);

  const [editingId, setEditingId] = useState(null);

  const [employee, setEmployee] = useState({
    name: "",
    email: "",
    department: ""
  });

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = () => {
    getEmployees().then((response) => {
      setEmployees(response.data);
    });
  };

  const handleChange = (e) => {
    setEmployee({
      ...employee,
      [e.target.name]: e.target.value
    });
  };

  const saveEmployee = () => {

    if (editingId) {

        updateEmployee(editingId, employee).then(() => {

            setEditingId(null);

            setEmployee({
                name: "",
                email: "",
                department: ""
            });

            loadEmployees();

        });

    } else {

        addEmployee(employee).then(() => {

            setEmployee({
                name: "",
                email: "",
                department: ""
            });

            loadEmployees();

        });

    }

};

  const removeEmployee = (id) => {
  deleteEmployee(id).then(() => {
    loadEmployees();
  });
};

const editEmployee = (employee) => {

    setEmployee(employee);

    setEditingId(employee.id);

};

  return (
  <div className="container mt-5">

    <h2 className="text-center mb-4">Employee Management System</h2>

    <div className="card p-4 shadow mb-4">

      <div className="row">

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="name"
            placeholder="Enter Name"
            value={employee.name}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Enter Email"
            value={employee.email}
            onChange={handleChange}
          />
        </div>

        <div className="col-md-4">
          <input
            type="text"
            className="form-control"
            name="department"
            placeholder="Enter Department"
            value={employee.department}
            onChange={handleChange}
          />
        </div>

      </div>

      <div className="text-center mt-4">
        <button
          className="btn btn-primary"
          onClick={saveEmployee}
        >
          {editingId ? "Update Employee" : "Add Employee"}
        </button>
      </div>

    </div>

    <table className="table table-bordered table-hover">

      <thead className="table-dark">

      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Email</th>
        <th>Department</th>
        <th>Action</th>
      </tr>

      </thead>

      <tbody>

      {employees.map((emp) => (

        <tr key={emp.id}>

          <td>{emp.id}</td>
          <td>{emp.name}</td>
          <td>{emp.email}</td>
          <td>{emp.department}</td>

          <td>

            <button
              className="btn btn-warning btn-sm me-2"
              onClick={() => editEmployee(emp)}
            >
              Edit
            </button>

            <button
              className="btn btn-danger btn-sm"
              onClick={() => removeEmployee(emp.id)}
            >
              Delete
            </button>

          </td>

        </tr>

      ))}

      </tbody>

    </table>

  </div>
);
}
export default App;