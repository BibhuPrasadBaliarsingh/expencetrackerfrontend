import React, { useContext, useState } from 'react'
import { FaChevronLeft, FaChevronRight, FaQuoteLeft, FaStar } from 'react-icons/fa'
import AuthContext from '../../context/AuthContext';
// import TestimonialCard from '../utils/TestimonialCards'

const Reviews = () => {

  const {sectionRefs} = useContext(AuthContext)

  const reviews = [
    {
      id: 1,
      name: "Sarah Mitchell",
      role: "Marketing Manager",
      avatar: "SM",
      rating: 5,
      review: "WealthFlow completely transformed how I manage my finances. The AI suggestions helped me save an extra $500 per month without feeling like I'm sacrificing anything.",
    },
    {
      id: 2,
      name: "James Rodriguez",
      role: "Software Developer",
      avatar: "JR",
      rating: 5,
      review: "As someone who's always struggled with budgeting, this app is a game-changer. The notifications keep me on track and the investment tips have already grown my portfolio by 15%.",
    },
    {
      id: 3,
      name: "Emily Thompson",
      role: "Freelance Designer",
      avatar: "ET",
      rating: 5,
      review: "Finally, an app that understands freelance income! The variable income tracking and goal-based saving features are exactly what I needed. Highly recommend!",
    },
    {
      id: 4,
      name: "Michael Chen",
      role: "Small Business Owner",
      avatar: "MC",
      rating: 5,
      review: "I've tried many expense trackers, but WealthFlow's AI is on another level. It actually learns my spending patterns and gives practical advice that works for my situation.",
    },
    {
      id: 5,
      name: "Lisa Anderson",
      role: "Healthcare Professional",
      avatar: "LA",
      rating: 5,
      review: "The goal-based saving feature helped me save for my dream vacation in just 8 months. The app made it feel effortless with its smart recommendations.",
    },
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextReview = () => {
    setCurrentIndex((prev) => (prev + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const visibleReviews = [
    reviews[currentIndex],
    reviews[(currentIndex + 1) % reviews.length],
    reviews[(currentIndex + 2) % reviews.length],
  ];

  return (
    <section ref={sectionRefs?.reviews} className="py-24 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-white rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-20 w-72 h-72 bg-teal-50 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-100 text-yellow-500 text-sm font-medium mb-6">
            <FaStar className="w-4 h-4 text-yellow-500 " />
            <span>User Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Loved by Thousands of{" "}
            <span className="text-yellow-500">Happy Users</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Join our community of financially empowered individuals who have transformed
            their relationship with money.
          </p>
        </div>

        {/* Reviews Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="flex justify-center gap-10 mb-8">
            <button
              onClick={prevReview}
              className="rounded-full text-slate-500"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextReview}
              className="rounded-full text-slate-500"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Reviews Grid */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleReviews.map((review, index) => (
              <div
                key={`${review.id}-${index}`}
                className={`rounded-3xl p-6 border border-border transition-all duration-500 ${index === 1 ? "md:scale-105 shadow-lg border-white/20" : "opacity-80"
                  }`}
              >
                <FaQuoteLeft className="w-10 h-10 text-slate-300 mb-4" />

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <FaStar key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-foreground/80 leading-relaxed mb-6">
                  "{review.review}"
                </p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-teal-400 flex items-center justify-center text-white font-semibold">
                    {review.avatar}
                  </div>
                  <div>
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-sm">{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-8">
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${index === currentIndex
                    ? "w-8 bg-white"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-16 text-center">
          <p className="text-sm text-muted-foreground mb-6">Trusted by leading companies</p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-50">
            {["Forbes", "TechCrunch", "Bloomberg", "CNBC", "WSJ"].map((brand) => (
              <div key={brand} className="text-xl font-bold text-foreground/50">
                {brand}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews
