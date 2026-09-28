import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Button from "../../../components/common/Button";
import { 
  getStaffs, 
  deleteStaffs, 
  getDesignation, 
  getDepartment 
} from "../../../services/api";
import toast from "react-hot-toast";

export default function TotalStaff() {
  const [reload, setReload] = useState(false);
  const [staffs, setStaff] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [selectedDesignation, setSelectedDesignation] = useState("all");

  // Load all required data concurrently
  const loadInitialData = async () => {
    try {
      setLoading(true);

      const [staffRes, designationRes, departmentRes] = await Promise.all([
        getStaffs(),
        getDesignation(),
        getDepartment(),
      ]);

      // Normalize array responses safely
      setStaff(staffRes?.data?.staff || staffRes?.data || []);
      setDesignations(designationRes?.data?.data || designationRes?.data || []);
      setDepartments(departmentRes?.data?.data || departmentRes?.data || []);

    } catch (err) {
      console.error("Failed to fetch page data:", err);
      toast.error("Failed to load staff list");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadInitialData();
  }, [reload]);

  /**
   * Helper function to get Designation Title and Department Name
   */
  const getStaffRoleInfo = (staffDesignationVal) => {
    if (!staffDesignationVal) {
      return { designationTitle: "N/A", departmentName: "N/A" };
    }

    // Match designation by ID or Title/Name
    const designationObj = designations.find(
      (d) =>
        d._id === staffDesignationVal ||
        d.title === staffDesignationVal ||
        d.name === staffDesignationVal
    );

    const designationTitle =
      designationObj?.title || designationObj?.name || staffDesignationVal;

    // Resolve Department (handles populated object or raw ID reference)
    let departmentName = "N/A";

    if (designationObj?.department) {
      if (typeof designationObj.department === "object") {
        departmentName = designationObj.department.name || designationObj.department.title;
      } else {
        const deptObj = departments.find((dept) => dept._id === designationObj.department);
        departmentName = deptObj?.name || deptObj?.title || "N/A";
      }
    }

    return { designationTitle, departmentName };
  };

  // Filter staff by ID/Name and Designation
  const filterStaff = staffs.filter((staff) => {
    const searchIDorName = search.toLowerCase().trim();

    const matchedSearch =
      staff.fullname?.toLowerCase().includes(searchIDorName) ||
      staff._id?.toLowerCase().includes(searchIDorName);

    const staffDesignationStr = String(staff.designation || "").toLowerCase();

    const matchedDesignation =
      selectedDesignation === "all" ||
      staffDesignationStr === selectedDesignation.toLowerCase();

    return matchedSearch && matchedDesignation;
  });

  async function handleDelete(id) {
    const confirmed = window.confirm("Are you sure you want to delete this staff member?");

    if (!confirmed) return;

    try {
      await deleteStaffs(id);
      toast.success("Staff deleted successfully");
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Failed to delete staff:", error);
      toast.error("Failed to delete staff");
    }
  }

  return (
    <>
      <Link to="/admin/staffs" className="flex justify-end items-center">
        <Button body="Back" />
      </Link>

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div>
          <p className="text-3xl font-bold">Total Staff</p>
        </div>

        {/* Filter Controls */}
        <div className="flex justify-around items-center gap-3">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search By ID or Name"
            className="outline-none border-gray-500 border p-2 rounded-xl"
          />

          {/* Dynamic Designation Filter */}
          <select
            value={selectedDesignation}
            onChange={(e) => setSelectedDesignation(e.target.value)}
            className="outline-none border p-2 rounded-xl border-gray-600"
          >
            <option value="all">Filter By Designation</option>
            {designations.map((desig) => {
              const val = desig._id || desig.title || desig.name;
              const label = desig.title || desig.name;
              return (
                <option key={desig._id || val} value={val}>
                  {label}
                </option>
              );
            })}
          </select>
        </div>
      </div>

      {/* Table Body */}
      <div className="overflow-x-auto bg-white p-2 rounded-2xl shadow-xl">
        <table className="w-full text-left text-xs text-slate-600">
          <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-semibold uppercase">
            <tr>
              <th className="p-2.5">Staff ID</th>
              <th className="p-2.5">Full Name</th>
              <th className="p-2.5">Gender</th>
              <th className="p-2.5">Designation</th>
              <th className="p-2.5">Department</th>
              <th className="p-2.5">Actions</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {loading ? (
              <tr>
                <td colSpan="6" className="p-4 text-center text-slate-400">
                  Loading staff details...
                </td>
              </tr>
            ) : filterStaff.length > 0 ? (
              filterStaff.map((row) => {
                const { designationTitle, departmentName } = getStaffRoleInfo(row.designation);

                return (
                  <tr key={row._id}>
                    <td className="p-2.5 font-mono text-slate-400">{row._id}</td>
                    <td className="p-2.5 font-semibold text-slate-800">{row.fullname}</td>
                    <td className="p-2.5">{row.gender}</td>
                    
                    {/* Designation Title */}
                    <td className="p-2.5 font-semibold text-slate-800">
                      {designationTitle}
                    </td>

                    {/* Department Name */}
                    <td className="p-2.5 font-semibold text-blue-600">
                      {departmentName}
                    </td>

                    <td className="p-2.5 flex items-center gap-2">
                      <Link
                        to={`/admin/staffs/update/${row._id}`}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition"
                        title="Edit Staff"
                      >
                        ✏️
                      </Link>

                      <Link
                        to={`/admin/staffs/${row._id}`}
                        className="inline-flex items-center justify-center p-2 text-emerald-600 hover:bg-emerald-50 rounded-lg transition"
                        title="View Staff"
                      >
                        👁️
                      </Link>

                      <button
                        type="button"
                        onClick={() => handleDelete(row._id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition"
                        title="Delete Staff"
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="6" className="p-4 text-center text-slate-400">
                  No staff members found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}