import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
export default function StudentDetails() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState("");
  const { name } = useParams();

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/users/${name}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => {
        setErr(err.message);
      });
  }, []);

  return (
    <>
      {!isLoading ? (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
          <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg">
            {/* Header */}
            <div className="bg-blue-600 text-white p-6 rounded-t-2xl">
              <h1 className="text-3xl font-bold">Student Details</h1>
              <p className="text-blue-100 mt-2">Complete Student Information</p>
            </div>

            {/* Content */}
            <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Name</h3>
                <p className="text-lg font-semibold">{user?.name}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Username</h3>
                <p className="text-lg font-semibold">{user?.username}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Email</h3>
                <p className="text-lg font-semibold">{user?.email}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Phone</h3>
                <p className="text-lg font-semibold">{user?.phone}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Website</h3>
                <p className="text-lg font-semibold">{user?.website}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Company</h3>
                <p className="text-lg font-semibold">{user?.company?.name}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Street</h3>
                <p className="text-lg font-semibold">{user?.address?.street}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Suite</h3>
                <p className="text-lg font-semibold">{user?.address?.suite}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">City</h3>
                <p className="text-lg font-semibold">{user?.address?.city}</p>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="text-gray-500 text-sm">Zip Code</h3>
                <p className="text-lg font-semibold">
                  {user?.address?.zipcode}
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>{err ? <div>{err}</div> : <div>Loading....</div>}</div>
      )}
    </>
  );
}
