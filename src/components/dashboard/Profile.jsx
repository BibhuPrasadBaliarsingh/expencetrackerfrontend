import React, { useContext, useEffect, useState } from 'react'
import { FaEye, FaUser } from 'react-icons/fa'
import AuthContext from '../../context/AuthContext'
import { toast } from 'react-toastify'

const Profile = () => {
  const [profileData, setProfileData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    profile_img: "",
    phone: "",
    income: "",
    gender: "",
  })

  const { name, lastname, email, password, profile_img, phone, income, gender } = profileData
  const { user, update } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target

    setProfileData(prev => ({ ...prev, [name]: value }))
  }

  const handleImageUpload = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onloadend = () => {
      setProfileData(prev => ({
        ...prev,
        profile_img: reader.result
      }));
    };

    reader.readAsDataURL(file);
  };
  const handleSubmit = async (e) => {
    e.preventDefault()

    if (password && password.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    // Don't send empty password (means "no change")
    const payload = { ...profileData }
    if (!payload.password) delete payload.password

    const response = await update(payload)

    if (response.success) {
      toast.success(response.message)
      setProfileData((prev) => ({ ...prev, password: "" }))
    } else {
      toast.error(response.message)
    }
  }

  useEffect(() => {
    // console.log(profileData)
    if (user) {
      setProfileData({
        name: user.name || "",
        lastname: user.lastname || "",
        email: user.email || "",
        password: "",
        phone: user.phone || "",
        income: user.income || "",
        gender: user.gender || "",
        profile_img: user.profile_img || ""
      });
    }
  }, [user]);


  return (
    <div className="h-full overflow-y-auto px-4 sm:px-10 py-8">

      {/* Header */}
      <div className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-semibold text-gray-800 dark:text-white">
          Profile
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-2 text-sm">
          Manage your name, password and account details.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">

        {/* Profile Photo */}
        <div className="flex items-center gap-6">
          <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            {profileData.profile_img ? (
              <img
                src={profileData.profile_img}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <FaUser className='text-6xl' />
            )}
          </div>


          <button
            type="button"
            onClick={() => document.getElementById("profileUpload").click()}
            className="px-5 py-2 rounded-lg border ..."
          >
            Upload Photo
          </button>

          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            id="profileUpload"
          />

          {/* <input type="file" name="" id="" /> */}
        </div>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* First Name */}
          <div>
            <label htmlFor='name' className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              First Name
            </label>
            <input
              id='name'
              value={name}
              onChange={handleChange}
              type="text"
              name="name"
              className="w-full px-4 py-3 rounded-xl
                     bg-gray-100 dark:bg-[#0B1220]
                     border border-gray-300 dark:border-gray-700
                     focus:ring-2 focus:ring-teal-500
                     focus:outline-none transition"
            />
          </div>

          {/* Last Name */}
          <div>
            <label htmlFor='lastname' className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Last Name
            </label>
            <input
              id='lastname'
              value={lastname}
              onChange={handleChange}
              type="text"
              name="lastname"
              className="w-full px-4 py-3 rounded-xl
                     bg-gray-100 dark:bg-[#0B1220]
                     border border-gray-300 dark:border-gray-700
                     focus:ring-2 focus:ring-teal-500
                     focus:outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="md:col-span-2">
            <label htmlFor='email' className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Email
            </label>
            <input
              disabled
              id='email'
              value={email}
              onChange={handleChange}
              type="email"
              name="email"
              className="w-full px-4 py-3 rounded-xl
                     bg-gray-100 dark:bg-[#0B1220]
                     border border-gray-300 dark:border-gray-700
                     focus:ring-2 focus:ring-teal-500
                     focus:outline-none transition"
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor='password' className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Password
            </label>
            <div className="flex items-center justify-between w-full px-4 py-3 rounded-xl
                     bg-gray-100 dark:bg-[#0B1220]
                     border border-gray-300 dark:border-gray-700
                     focus:ring-2 focus:ring-teal-500">
              <input
                id='password'
                value={password}
                onChange={handleChange}
                name='password'
                type={showPassword ? "text" : "password"}
                className='flex-1 outline-none bg-transparent'
              />
              <FaEye className="text-slate-400 cursor-pointer" onClick={() => setShowPassword(prev => !prev)} />
            </div>
          </div>

            {/* Income */}
          <div>
            <label htmlFor='income' className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Income
            </label>
            <input
              id='income'
              value={income}
              onChange={handleChange}
              name='income'
              type="number"
              className="w-full px-4 py-3 rounded-xl
                     bg-gray-100 dark:bg-[#0B1220]
                     border border-gray-300 dark:border-gray-700
                     focus:ring-2 focus:ring-teal-500"
            />
          </div>

          {/* Phone */}
          <div>
            <label htmlFor='phone' className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Phone
            </label>
            <input
              id='phone'
              value={phone}
              onChange={handleChange}
              name='phone'
              type="text"
              className="w-full px-4 py-3 rounded-xl
                     bg-gray-100 dark:bg-[#0B1220]
                     border border-gray-300 dark:border-gray-700"
            />
          </div>

          {/* Gender */}
          <div>
            <label className="block text-sm font-medium mb-3 text-gray-600 dark:text-gray-300">
              Gender
            </label>

            <div className="flex gap-6">
              {["Male", "Female", "Other"].map((g) => (
                <label key={g} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value={g}
                    checked={gender === g}
                    onChange={handleChange}
                    className="accent-teal-600"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {g}
                  </span>
                </label>
              ))}

            </div>
          </div>

          {/* Bio
          <div className="md:col-span-2">
            <label className="block text-sm font-medium mb-2 text-gray-600 dark:text-gray-300">
              Bio
            </label>
            <textarea
              rows={4}
              className="w-full px-4 py-3 rounded-xl
                     bg-gray-100 dark:bg-[#0B1220]
                     border border-gray-300 dark:border-gray-700
                     focus:ring-2 focus:ring-teal-500"
            />
          </div> */}
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
          <button
            type="button"
            className="px-6 py-3 rounded-xl border
                   border-gray-300 dark:border-gray-600
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="px-8 py-3 rounded-xl font-semibold text-white
                   bg-teal-600 hover:bg-teal-500
                   transition duration-300 hover:scale-105 shadow-md"
          >
            Save Changes
          </button>
        </div>

      </form>
    </div>

  )

}

export default Profile
