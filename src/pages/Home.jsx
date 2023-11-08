import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch} from "react-redux";

import Select from "react-select";
import DatePicker from "react-datepicker";
import { addEmployee } from "../redux/EmployeeSlice";
import stateList from "../data/states";
import departmentList from "../data/departments";
import "react-datepicker/dist/react-datepicker.css";

import Header from "../components/Header";
import Modal from "../components/Modal/Modal";


const Home = () => {
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [startDate, setStartDate] = useState();
  const [birthDate, setBirthDate] = useState();
  const [selectedDepartment, setSelectedDepartment] = useState(""); 
  const [selectedState, setSelectedState] = useState(""); 

  const handleDepartmentChange = (selectedOption) => {
    setSelectedDepartment(selectedOption); 
  };

  const handleStateChange = (selectedOption) => {
    setSelectedState(selectedOption); 
  };

  const handleSave = (e) => {
    e.preventDefault();
  
    if (validateForm()) {
      const firstName = document.getElementById("first-name");
      const lastName = document.getElementById("last-name");
      const street = document.getElementById("street");
      const city = document.getElementById("city");
      const zipCode = document.getElementById("zip-code");
      const dateOfBirth = document.getElementById("birthDate");
      const dateOfStart = document.getElementById("startDate");
  
      const employee = {
        firstName: firstName.value,
        lastName: lastName.value,
        dateOfBirth: dateOfBirth.value,
        startDate: dateOfStart.value,
        street: street.value,
        city: city.value,
        state: selectedState.value,
        zipCode: zipCode.value,
        department: selectedDepartment.value,
      };

      dispatch(addEmployee(employee));
      openModal();
      cleanForm();
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const validateForm = () => {
    const firstName = document.getElementById("first-name").value;
    const lastName = document.getElementById("last-name").value;
    const street = document.getElementById("street").value;
    const city = document.getElementById("city").value;
    const zipCode = document.getElementById("zip-code").value;
    const dateOfBirth = birthDate;
    const dateOfStart = startDate;
    const state = selectedState.value;
    const department = selectedDepartment.value;
  
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      street.trim() !== "" &&
      city.trim() !== "" &&
      zipCode.trim() !== "" &&
      dateOfBirth !== null &&
      dateOfStart !== null &&
      state !== null &&
      department !== null
    );
  };

  function cleanForm() {

    document.getElementById("first-name").value = "";
    document.getElementById("last-name").value = "";
    document.getElementById("street").value = "";
    document.getElementById("city").value = "";
    document.getElementById("zip-code").value = "";

    setStartDate(null);
    setBirthDate(null);

    setSelectedDepartment("");
    setSelectedState("");
  }


  const navigate = useNavigate();


  const handleRedirectToEmployees = () => {
    navigate("/employees");
  };

  return (
    <>
      <Header />
      <main>
        <button
          id="btn-redirect-employees"
          className="btn redirect-btn"
          onClick={handleRedirectToEmployees}
        >
          View Current Employees
        </button>
        <section>
          <h2 id="create-employee">Create Employee</h2>
          <form id="create-employee-form" onSubmit={handleSave}>
            <div className="input">
              <label htmlFor="first-name">First Name</label>
              <input type="text" id="first-name" />
            </div>
            <div className="input">
              <label htmlFor="last-name">Last Name</label>
              <input type="text" id="last-name" />
            </div>
            <div className="input">
              <label htmlFor="birth-date">Birth Date</label>
              <DatePicker
                id="birthDate"
                dateFormat="dd/MM/yyyy"
                selected={birthDate}
                onChange={(date) => {
                  console.log();
                  setBirthDate(date);
                }}
              />
            </div>
            <div className="input">
              <label htmlFor="start-date">Start Date</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => {
                  setStartDate(date);
                }}
              />
            </div>
            <div id="adress-box">
              <div className="input">
                <label htmlFor="street">Street</label>
                <input type="text" id="street" />
              </div>
              <div className="input">
                <label htmlFor="city">City</label>
                <input type="text" id="city" />
              </div>
              <div className="input">
                <label htmlFor="state">State</label>
                <Select
                  styles={{
                    control: (baseStyles, state) => ({
                      ...baseStyles,
                      width: "250px",
                    }),
                  }}
                  options={stateList}
                  id="state"
                  key={(option, index) => index}
                  value={selectedState} // Set the selected value
                  onChange={handleStateChange} // Handle the change event
                />
              </div>
              <div className="input">
                <label htmlFor="zip-code">Zip Code</label>
                <input type="number" id="zip-code" />
              </div>
            </div>
            <div className="input">
              <label htmlFor="department">Department</label>
              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    width: "250px",
                  }),
                }}
                options={departmentList}
                id="department"
                key={(option, index) => index}
                value={selectedDepartment} // Set the selected value
                onChange={handleDepartmentChange} // Handle the change event
              />
            </div>
            <div id="submit-employee-btn-container">
              <input
                className="btn submit-btn"
                id="submit-employee-btn"
                type="submit"
                form="create-employee-form"
              ></input>
            </div>
          </form>
        </section>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
        <p>Employee created</p>
      </Modal>
      </main>
    </>
  );
};

export default Home;