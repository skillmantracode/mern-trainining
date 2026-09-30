import {  useEffect, useState } from "react";
import StudentDetails from "./StudentDetails";
function StudentRegistration() {
  const [name, setName] = useState("");
  const [grade, setGrade] = useState("");
  const [subject, setSubject] = useState("");
  const [studentPayload, setStudentPayload] = useState([]);
  const [studentDetails, setStudentDetails] = useState(false);
  const [studentMsg, setStudentMsg] = useState(null);
  const [delError, setDelError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");


  function handleSubmit(e) {
    e.preventDefault();
    const studentmsg = confirm("Do you want add this student");
    setStudentMsg(studentmsg);
    setTimeout(() => {
      setStudentMsg();
    }, 900);

    if (studentmsg == true) {
      const studentId = "stu-" + Math.floor(1000 + Math.random() * 9000);
      const newStudent = { id:studentId, name, grade, subject };
      setStudentPayload([...studentPayload, newStudent]);

      resetValue();
    }
  }
  let studentError = "";
  if (studentMsg == true) {
    studentError = "ok";
  }
  if (studentMsg == false) {
    studentError = "cancel";
  }

  let dellError = "";
  if (delError == true) {
    dellError = "ok";
  }
  if (delError == false) {
    dellError = "cancel";
  }

  function resetValue() {
    setName("");
    setGrade("");
    setSubject("");
  }

  function handleDelete(studentId) {
    const delerror = confirm(" Do you want to delete this");
    if (delerror == true) {
      const updatedStudent = studentPayload.filter(
        (student) => student.id !== studentId,
      );
      setStudentPayload(updatedStudent);
    }
    setDelError(delerror);
    setTimeout(() => {
      setDelError();
    }, 900);
  }

  function handleDetails() {
    setStudentDetails(!studentDetails);
  
  }

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setStudentPayload(data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.msg);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-xl shadow-md border border-gray-100">
      <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        Student Registration
      </h1>
      <div className="error flex justify-center pb-4 ">
        {studentError === "ok" && !studentDetails &&(
          <p className="text-green-400">The student Added Successfully</p>
        )}{" "}
        {studentError === "cancel" && !studentDetails &&(
          <p className="text-red-400">The student is Not Added Successfully</p>
        )}
        {dellError === "ok" && studentDetails  &&(
          <p className="text-green-400">The student delete Successfully</p>
        )}{" "}
        {dellError === "cancel" && studentDetails && (
          <p className="text-red-400">The student is Not delete Successfully</p>
        )}
      </div>
      {studentDetails && error && (<div className="text-red-400">{error}</div>)}

      <div className="flex justify-end items-center mb-6">
        <button
          className="bg-blue-600 rounded-lg px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition"
          onClick={handleDetails}
        >
          {!studentDetails ? "Registered Student" : "Back"}
        </button>
      </div>
      {!studentDetails ? (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              placeholder="Enter student name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Grade
            </label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-800 bg-white"
            >
              <option value="">Select Grade</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              placeholder="Enter subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition text-gray-800 placeholder-gray-400"
            />
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-medium py-2.5 px-4 rounded-lg shadow transition duration-150 ease-in-out cursor-pointer mt-2">
            Submit
          </button>
        </form>
      ) : (
        <>
          {isLoading ? (
            <div>
              <p>Loading Data ...</p>
            </div>
          ) : (
            <StudentDetails
              studentPayload={studentPayload}
              handleDelete={handleDelete}
            />
          )}
        </>
      )}

      {studentDetails && (
        <button
          className="bg-blue-600 hover:bg-blue-700 rounded-xl p-2 text-white w-full"
          onClick={handleDetails}
        >
          Add Student
        </button>
      )}
    </div>
  );
}

export default StudentRegistration;
