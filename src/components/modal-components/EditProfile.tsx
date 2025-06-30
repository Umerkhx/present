"use client"

import type React from "react"
import { useState } from "react"
import { useAppContext } from "../../context/app-context"

const profileImages = [
  "/profile/PP 1.png",
  "/profile/PP 2.png",
  "/profile/PP 3.png",
  "/profile/PP 4.png",
  "/profile/PP 5.png",
  "/profile/PP 6.png",
  "/profile/PP 7.png",
  "/profile/PP 8.png",
  "/profile/PP 9.png",
  "/profile/PP 10.png",
  "/profile/PP 11.png",
  "/profile/PP 12.png",
]

export default function EditProfile() {
  const { formData, setFormData, selectedImage, setSelectedImage, handleProfileSubmit } = useAppContext()

  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    setErrors((prev) => ({ ...prev, [name]: false }))
  }

  const handleSubmit = () => {
    const { firstName, lastName } = formData

    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
    }

    setErrors(newErrors)

    const hasError = Object.values(newErrors).some((val) => val)
    if (hasError) return

    handleProfileSubmit()
  }

  return (
    <div className="p-4">
      <h3 className="text-2xl text-gray-900 font-bold">Edit Your Profile</h3>

      <div className="mt-10 flex flex-col mx-auto justify-center items-center max-w-md">
        <div className="flex md:flex-row flex-col items-center justify-center lg:gap-10 gap-5">
          <div className="md:w-24 md:h-[70px] w-20 h-20 rounded-full mb-8 overflow-hidden transition-all duration-300 relative">
            <img src={selectedImage || "/placeholder.svg"} alt="Profile" className="w-full h-full object-cover" />
            <input type="file" accept="image/*" className="hidden" id="profile-image-upload" />
            <label
              htmlFor="profile-image-upload"
              className="absolute inset-0 cursor-pointer"
              style={{ opacity: 0 }}
            ></label>
          </div>

          <div className="grid grid-cols-6 gap-2 mb-10 w-full">
            {profileImages.map((image, index) => (
              <button
                key={index}
                className={`w-8 h-8 aspect-square rounded-full overflow-hidden transition-all duration-200 ${
                  selectedImage === image ? "ring-2 ring-offset-2 ring-gray-400 transform scale-105" : "hover:scale-105"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`Profile option ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        <button
          type="button"
          className="px-3 mx-auto py-3 lg:text-lg bg-transparent text-black border border-gray-400 font-medium rounded-xl transition-colors duration-300"
        >
          Remove Profile Picture
        </button>
      </div>

      <div className="w-full max-w-xl mx-auto rounded-lg p-6">
        <div className="mb-6">
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border font-medium ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            placeholder="Enter your first name"
          />
          {errors.firstName && <p className="text-red-500 mt-1 text-sm">First name is required.</p>}
        </div>

        <div className="mb-6">
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full px-4 py-3 border font-medium ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
            placeholder="Enter your last name"
          />
          {errors.lastName && <p className="text-red-500 mt-1 text-sm">Last name is required.</p>}
        </div>

        <button
          type="button"
          onClick={handleSubmit}
          className="w-full py-3 bg-black text-white font-medium rounded-lg transition-colors duration-300"
        >
          Continue
        </button>
      </div>
    </div>
  )
}
