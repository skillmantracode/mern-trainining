import React from 'react';
import { Pencil, Eye, Trash2, Users,  UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const UserManagementDashboard = () => {
  // Mock data for analytics cards
  const stats = [
    {
      id: 1,
      title: 'Total Users',
      value: '804',
      subtitle: 'System-wide accounts',
      icon: Users,
    },
    {
      id: 2,
      title: 'Students',
      value: '680',
      subtitle: 'Enrolled & Active',
      icon:Users
    },
    {
      id: 3,
      title: 'Staffs',
      value: '124',
      subtitle: 'Faculty & Administrative',
      icon: UserCheck,
    },
  ];

  // Mock data for table rows
  const users = [
    {
      id: 'STU-1001',
      name: 'adsf',
      class: '12th Grade',
      gender: 'Female',
      faculty: 'Science',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-10 font-sans">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header Section */}
        <div className="text-center space-y-2 relative">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-800 tracking-tight">
            Manage User
          </h1>
          <p className="text-slate-500 text-sm md:text-base font-medium">
            Add, Update, and Manage User Records
          </p>
          <div className="md:absolute md:right-0 md:top-0 pt-4 md:pt-0 flex justify-center">
            <Link to="/admin/users/total" className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors duration-200 shadow-md hover:shadow-lg">
              View All Users
            </Link>
          </div>
        </div>

        {/* Analytics Cards Grid (3 Columns) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div 
                key={stat.id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col justify-between transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      {stat.title}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <div className="text-4xl font-extrabold text-slate-900 tracking-tight">
                    {stat.value}
                  </div>
                </div>
                <div className="mt-4 text-xs font-medium text-slate-500">
                  {stat.subtitle}
                </div>
              </div>
            );
          })}
        </div>

        {/* Data Table Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-50/50">
                  <th className="py-4 px-6">Student ID</th>
                  <th className="py-4 px-6">Name</th>
                  <th className="py-4 px-6">Class</th>
                  <th className="py-4 px-6">Gender</th>
                  <th className="py-4 px-6">Faculty</th>
                  <th className="py-4 px-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium text-slate-700">
                {users.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                    <td className="py-4 px-6 text-slate-400">{row.id}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{row.name}</td>
                    <td className="py-4 px-6 text-slate-500">{row.class || '—'}</td>
                    <td className="py-4 px-6 text-slate-500">{row.gender}</td>
                    <td className="py-4 px-6 font-semibold text-slate-900">{row.faculty}</td>
                    <td className="py-4 px-6 text-right">
                      <div className="flex items-center justify-end space-x-3 text-slate-400">
                        <button 
                          aria-label="Edit"
                          className="p-1 hover:text-orange-500 transition-colors"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button 
                          aria-label="View"
                          className="p-1 hover:text-blue-500 transition-colors"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          aria-label="Delete"
                          className="p-1 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </div>
  );
};

export default UserManagementDashboard;