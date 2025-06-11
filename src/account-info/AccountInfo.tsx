"use client";
import { useState } from 'react';

function AccountInfo() {

  const profileImages = [
    '/profile/PP 1.png',
    '/profile/PP 2.png',
    '/profile/PP 3.png',
    '/profile/PP 4.png',
    '/profile/PP 5.png',
    '/profile/PP 6.png',
    '/profile/PP 7.png',
    '/profile/PP 8.png',
    '/profile/PP 9.png',
    '/profile/PP 10.png',
    '/profile/PP 11.png',
    '/profile/PP 12.png',
  ];

  const [selectedImage, setSelectedImage] = useState(profileImages[0]);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
  });
  const [errors, setErrors] = useState({
    firstName: false,
    lastName: false,
  });
  const [profileSaved, setProfileSaved] = useState(false);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = () => {
    const { firstName, lastName } = formData;

    const newErrors = {
      firstName: firstName.trim() === "",
      lastName: lastName.trim() === "",
    };

    setErrors(newErrors);

    const hasError = Object.values(newErrors).some((val) => val);
    if (hasError) return;

    setProfileSaved(true);
    console.log("Saved profile:", {
      firstName,
      lastName,
      selectedImage,
    });
  };

  return (
   <section className="max-w-screen mx-auto p-5 min-h-screen flex flex-col">
      <div className="flex justify-start items-center px-8 py-5">
        <div className="flex items-center gap-2">
          <img src="/Back Arrow.png" width={18} height={18} alt="logo" />
          <h1 className="text-black font-medium text-lg">Back</h1>
        </div>
      </div>

      <div className="w-full max-w-2xl mx-auto flex-grow flex-col flex items-center justify-center">
        <div className="max-w-xs flex flex-col items-center w-full">
          <div className="my-10">
            <h1 className="text-2xl lg:text-3xl font-bold text-gray-950 mb-2">
              Welcome to Present
            </h1>
          </div>

          <div className="w-20 h-20 lg:w-24 lg:h-24 rounded-full mb-8 overflow-hidden transition-all duration-300">
            <img
              src={selectedImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="grid grid-cols-6 gap-2 mb-10 w-full">
            {profileImages.map((image, index) => (
              <button
                key={index}
                className={`w-10 h-10 aspect-square rounded-full overflow-hidden transition-all duration-200 ${
                  selectedImage === image
                    ? "ring-2 ring-offset-2 ring-gray-400 transform scale-105"
                    : "hover:scale-105"
                }`}
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={image}
                  alt={`Profile option ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

          <button
            type="button"
            className="w-2/3 mx-auto py-3 lg:text-lg bg-transparent text-black border border-gray-400 font-medium rounded-xl transition-colors duration-300"
          >
            Update Profile Picture
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
              className={`w-full px-4 py-3 border ${
                errors.firstName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="Enter your first name"
            />
            {errors.firstName && (
              <p className="text-red-500 mt-1 text-sm">
                First name is required.
              </p>
            )}
          </div>

          <div className="mb-6">
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border ${
                errors.lastName ? "border-red-500" : "border-gray-300"
              } rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all`}
              placeholder="Enter your last name"
            />
            {errors.lastName && (
              <p className="text-red-500 mt-1 text-sm">
                Last name is required.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            className="w-full py-3 bg-black text-white font-medium rounded-lg transition-colors duration-300"
          >
            Continue
          </button>

          {profileSaved && (
            <p className="text-green-600 text-center mt-4 font-medium">
              Profile saved successfully!
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AccountInfo;