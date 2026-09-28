export default function Button({ body }) {
  return (
    <button
      className="
        inline-flex items-center justify-center
        rounded-xl
        bg-blue-500
        px-5 py-3
        text-base font-medium text-white
        shadow-md shadow-blue-500/20
        transition-all duration-200
        hover:-translate-y-0.5
        hover:bg-blue-600
        hover:shadow-lg hover:shadow-blue-500/30
        active:translate-y-0
        active:scale-[0.98]
        focus:outline-none
        focus:ring-2 focus:ring-blue-500/40
        focus:ring-offset-2
      "
    >
      {body}
    </button>
  );
}