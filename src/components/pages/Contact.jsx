import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { FiMessageCircle } from "react-icons/fi";
import { MdOutlineEmail } from "react-icons/md";
import { FaFacebookSquare, FaInstagram, FaLinkedin, FaPhoneAlt } from "react-icons/fa";
import { IoLocationOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";
import { FaXTwitter } from "react-icons/fa6";

const Contact = () => {
  const { sectionRefs } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Placeholder: wire to backend or email service later.
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <section
      ref={sectionRefs?.contact}
      className="py-24 bg-gray-50 dark:bg-[#0B1220]"
    >
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full
                       bg-teal-100 dark:bg-[#111C33]
                       border border-gray-200 dark:border-white/10
                       text-sm font-medium
                       text-teal-600 dark:text-gray-300
                       shadow-sm mb-6"
          >
            <FiMessageCircle />
            <span>Get In Touch</span>
          </div>

          <h2 className="text-3xl md:text-4xl font-semibold text-gray-800 dark:text-white mb-6">
            Have Questions?{" "}
            <span className="text-teal-600 dark:text-teal-500">
              We're Here to Help
            </span>
          </h2>

          <p className="text-lg text-gray-500 dark:text-gray-400">
            Our team is ready to answer your questions and help you get started
            on your journey to financial freedom.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">

          {/* Contact Info */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">
                Let's Start a Conversation
              </h3>
              <p className="text-gray-500 dark:text-gray-400 mb-8">
                Whether you have a question about features, pricing, or anything
                else, our team is ready to answer all your questions.
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: <MdOutlineEmail />,
                  label: "Email Us",
                  value: "hello@spendwise.com",
                  href: "mailto:hello@spendwise.com",
                },
                {
                  icon: <FaPhoneAlt />,
                  label: "Call Us",
                  value: "+91 12345-67890",
                  href: "tel:+91-1234567890",
                },
                {
                  icon: <IoLocationOutline />,
                  label: "Visit Us",
                  value: "Bhubaneswar, Odisha",
                  href: "#",
                },
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-start gap-4 p-5 rounded-2xl
                             bg-white dark:bg-[#111C33]
                             border border-gray-200 dark:border-white/10
                             hover:shadow-md transition"
                >
                  <div className="w-12 h-12 rounded-xl
                                  bg-teal-100 dark:bg-teal-500/10
                                  flex items-center justify-center
                                  text-teal-600 dark:text-teal-500 font-semibold">
                    {item.icon}
                  </div>

                  <div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {item.label}
                    </div>
                    <div className="font-medium text-gray-800 dark:text-white">
                      {item.value}
                    </div>
                  </div>
                </a>
              ))}
            </div>

            {/* Social */}
            <div className="pt-8 border-t border-gray-200 dark:border-white/10">
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                Follow us on social media
              </p>
              <div className="flex gap-4">
                {[
                  { id: "twitter", icon: <FaXTwitter /> },
                  { id: "linkedin", icon: <FaLinkedin /> },
                  { id: "instagram", icon: <FaInstagram /> },
                  { id: "facebook", icon: <FaFacebookSquare /> },
                ].map((social) => (
                    <a
                      key={social.id}
                      href="#"
                      className="w-10 h-10 rounded-full
                                 bg-white dark:bg-[#111C33]
                                 border border-gray-200 dark:border-white/10
                                 flex items-center justify-center
                                 hover:bg-teal-50 dark:hover:bg-teal-500/10
                                 transition"
                    >
                      <span className="text-lg font-medium text-gray-600 dark:text-gray-300">
                        {social.icon}
                      </span>
                    </a>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div
            className="bg-white dark:bg-[#111C33]
                       rounded-2xl p-8 shadow-lg
                       border border-gray-200 dark:border-white/10"
          >
            <form className="space-y-6" onSubmit={handleSubmit}>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Your Name
                  </label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    required
                    className="w-full px-4 py-3 rounded-xl
                               bg-gray-100 dark:bg-[#0B1220]
                               border border-gray-300 dark:border-gray-700
                               focus:ring-2 focus:ring-teal-500
                               focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="john@example.com"
                    required
                    className="w-full px-4 py-3 rounded-xl
                               bg-gray-100 dark:bg-[#0B1220]
                               border border-gray-300 dark:border-gray-700
                               focus:ring-2 focus:ring-teal-500
                               focus:outline-none transition"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Subject
                </label>
                <input
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help?"
                  required
                  className="w-full px-4 py-3 rounded-xl
                             bg-gray-100 dark:bg-[#0B1220]
                             border border-gray-300 dark:border-gray-700
                             focus:ring-2 focus:ring-teal-500
                             focus:outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Tell us more about your inquiry"
                  className="w-full px-4 py-3 rounded-xl resize-none
                             bg-gray-100 dark:bg-[#0B1220]
                             border border-gray-300 dark:border-gray-700
                             focus:ring-2 focus:ring-teal-500
                             focus:outline-none transition"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center gap-3 bg-teal-600 hover:bg-teal-500
                           text-white rounded-xl py-3
                           font-semibold transition
                           hover:scale-105 shadow-md"
              >
                Send Message <IoIosSend />
              </button>

            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
