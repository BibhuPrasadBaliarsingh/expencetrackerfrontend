const TestimonialCard = ({ rating, quote, name, role }) => {

  const getInitials = name =>
    name
      .split(" ")
      .map(word => word[0])
      .slice(0, 2)
      .join("")
      .toUpperCase()

  const initials = getInitials(name)

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md max-w-sm">
      <div className="flex gap-1 mb-3">
        {Array(rating).fill(0).map((_, i) => (
          <span key={i} className="text-yellow-400">★</span>
        ))}
      </div>

      <p className="text-slate-600 mb-6">{quote}</p>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-white font-bold">
          {initials}
        </div>

        <div>
          <h4 className="font-semibold">{name}</h4>
          <p className="text-xs text-slate-500">{role}</p>
        </div>
      </div>
    </div>
  )
}

export default TestimonialCard