import { Link } from "react-router-dom";
import Button from "./Button";

export default function StatsCard({ title, count, link, note }) {
  return (
    < >
      <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm hover:shadow-2xl hover:scale-100">
        <p className="text-xs text-slate-500 font-medium">{title}</p>
        <p className="text-2xl font-bold text-slate-900 mt-1">{count}</p>
        <p className="text-xs text-slate-500 font-medium"> {note}</p>

       
      </div>
    </>
  );
}
