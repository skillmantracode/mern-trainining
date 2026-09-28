import { useEffect, useState } from "react";
import { getStudent, getStaffs, createUser } from "../../services/api";

const CreateUser = () => {
  const [userType, setUserType] = useState("student");

  const [students, setStudents] = useState([]);
  const [staff, setStaff] = useState([]);

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    image: "",
    studentId: "",
    staffId: "",
  });

  const [loading, setLoading] = useState(false);

  // Get students and staff
  useEffect(() => {
    const fetchData = async () => {
      try {
        //Student is loaded
        const res = await getStudent();
        setStudents(res.data.students);

        //Staff is load
        const res1 = await getStaffs();
        setStaff(res1.data.staff);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    setFormData((prev) => ({ ...prev, [name]: files ? files[0] : value }));
  };

  // Change student/staff
  const handleUserTypeChange = (e) => {
    const type = e.target.value;

    setUserType(type);

    // Clear previous selection
    setFormData({
      ...formData,
      studentId: "",
      staffId: "",
    });
  };

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData();
      data.append("username", formData.username);
      data.append("password", formData.password);
      data.append("usertype", userType);
      data.append(
        "studentId",
        userType === "student" ? formData.studentId : null,
      );

      data.append("staffId", userType === "staff" ? formData.staffId : null);

      console.log(formData.image);

      if (formData.image) {
        data.append("image", formData.image);
      }

      console.log("Sending:", data);

      await createUser(data);

      // toast.success("User Created");
      // Reset form
      setFormData({
        username: "",
        password: "",
        image: "",
        studentId: "",
        staffId: "",
      });
    } catch (error) {
      console.error("Error creating user:", error);

      alert(error.response?.data?.message || "Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-2xl font-semibold mb-6">Create User</h2>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* User Type */}
          <div>
            <label className="block text-sm font-medium mb-2">User Type</label>

            <select
              value={userType}
              onChange={handleUserTypeChange}
              className="w-full border rounded-md px-3 py-2"
            >
              <option value="student">Student</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          {/* Student */}
          {userType === "student" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Student
              </label>

              <select
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select Student</option>

                {students.map((student) => (
                  <option key={student._id} value={student._id}>
                    {student.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Staff */}
          {userType === "staff" && (
            <div>
              <label className="block text-sm font-medium mb-2">
                Select Staff
              </label>

              <select
                name="staffId"
                value={formData.staffId}
                onChange={handleChange}
                required
                className="w-full border rounded-md px-3 py-2"
              >
                <option value="">Select Staff</option>

                {staff.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.fullname}
                  </option>
                ))}
              </select>
            </div>
          )}

          <div>
            <label className="mb-2 block font-medium"> Profile Photo </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="w-full rounded border p-3"
            />
          </div>

          {/* Username */}
          <div>
            <label className="block text-sm font-medium mb-2">Username</label>

            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium mb-2">Password</label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              className="w-full border rounded-md px-3 py-2"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2.5 rounded-md hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create User"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
