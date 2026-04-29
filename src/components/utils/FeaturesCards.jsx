import React from "react";

const FeaturesCards = ({ icon, heading, paragraph }) => {
  return (
    <div
      className="
        w-full sm:w-[340px] lg:w-[360px]
        min-h-[260px]
        rounded-2xl
        bg-white dark:bg-[#111C33]
        border border-gray-200 dark:border-white/10
        p-6
        flex flex-col justify-start gap-5
        transition-all duration-300
        hover:shadow-xl hover:-translate-y-2
      "
    >
      {/* Icon */}
      <div
        className="
          w-12 h-12
          flex items-center justify-center
          rounded-xl
          bg-teal-100 dark:bg-teal-500/10
          text-teal-600 dark:text-teal-500
          text-xl
        "
      >
        {icon}
      </div>

      {/* Heading */}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 dark:text-white">
        {heading}
      </h3>

      {/* Paragraph */}
      <p className="text-sm md:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
        {paragraph}
      </p>
    </div>
  );
};

export default FeaturesCards;