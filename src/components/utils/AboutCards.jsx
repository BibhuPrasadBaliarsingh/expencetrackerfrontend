const AboutCards = ({ icon, value, label }) => {
    return (
        <div className="bg-gray-200 rounded-3xl p-10 text-center shadow-lg hover:-translate-y-2 transition-transform duration-300">
            <div className="mx-auto w-14 h-14 flex items-center justify-center rounded-xl bg-green-500 text-white mb-6">
                {icon}
            </div>

            <h3 className="text-3xl font-bold text-gray-900">{value}</h3>
            <p className="text-gray-600 mt-2">{label}</p>
        </div>
    )
}

export default AboutCards
