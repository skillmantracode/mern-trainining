function StudentDetails({studentPayload,handleDelete}) {
  return (
    <div>
      {studentPayload && (
        <div className="mt-6 pt-6 border-t border-gray-200 bg-gray-50 p-4 rounded-lg space-y-2">
          <h1 className="text-lg font-semibold text-gray-800 mb-2">
            Registered Student
          </h1>
          {studentPayload.length === 0 ? (
            <div>
              <h1>No Student Registered Yet</h1>
            </div>
          ) : (
            <>
              <div>Total Student :{studentPayload.length}</div>

              {studentPayload.map((student) => (
                <div
                  key={student.studentId}
                  className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-200"
                >
                  {/* Student Information */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-gray-900 text-base">
                        {student.name}
                      </h3>
                      <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-100">
                        Grade {student.grade}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">
                      <span className="font-medium text-gray-600">
                        Subject:
                      </span>{" "}
                      {student.subject}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors duration-150 cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="px-3 py-1.5 text-xs font-medium text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors duration-150 cursor-pointer"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
      {/* <button className="bg-blue-500 ">Add New</button> */}
    </div>
  );
}
export default StudentDetails;
