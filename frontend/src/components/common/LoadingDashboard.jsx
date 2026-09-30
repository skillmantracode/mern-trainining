export const LoadingDashboard = () => {
  return (
    <div className="p-6 space-y-6 bg-gray-50 min-h-screen animate-pulse">
      
      {/* Top Bar / Header Section Skeleton */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="space-y-2">
          {/* Title Placeholder */}
          <div className="h-8 w-48 bg-gray-200 rounded-md"></div>
          {/* Subtitle Placeholder */}
          <div className="h-4 w-64 bg-gray-200 rounded-md"></div>
        </div>

        {/* Action Buttons Placeholders */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="h-10 w-28 bg-amber-100/60 rounded-lg"></div>
          <div className="h-10 w-32 bg-amber-100/60 rounded-lg"></div>
          <div className="h-10 w-24 bg-amber-100/60 rounded-lg"></div>
          <div className="h-10 w-32 bg-amber-100/60 rounded-lg"></div>
        </div>
      </div>

      {/* 4 Metric Cards Grid Skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[1, 2, 3, 4].map((item) => (
          <div 
            key={item} 
            className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-3"
          >
            <div className="h-4 w-28 bg-gray-200 rounded"></div>
            <div className="h-8 w-20 bg-gray-300 rounded"></div>
          </div>
        ))}
      </div>

      {/* Recent Admissions Table Card Skeleton */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden p-6 space-y-6">
        
        {/* Table Title Placeholder */}
        <div className="h-6 w-36 bg-gray-200 rounded"></div>

        {/* Table Header Row */}
        <div className="grid grid-cols-4 gap-4 pb-4 border-b border-gray-100">
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
          <div className="h-4 w-20 bg-gray-200 rounded"></div>
          <div className="h-4 w-24 bg-gray-200 rounded"></div>
          <div className="h-4 w-16 bg-gray-200 rounded"></div>
        </div>

        {/* Table Rows Placeholder */}
        <div className="space-y-4">
          {[1, 2, 3].map((row) => (
            <div key={row} className="grid grid-cols-4 gap-4 items-center py-2">
              <div className="h-4 w-24 bg-gray-100 rounded"></div>
              <div className="h-4 w-32 bg-gray-200 rounded"></div>
              <div className="h-4 w-40 bg-gray-100 rounded"></div>
              <div className="h-6 w-20 bg-gray-200 rounded-full"></div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};