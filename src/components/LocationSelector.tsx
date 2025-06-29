
const LocationSelector = () => {
  return (
    <div className="mt-6 w-full">
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Search for a location"
          className="w-full  border-gray-300 font-bold text-xl pb-2 placeholder:text-[#B1B1B1] text-gray-800 focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          className="absolute font-semibold right-0 top-0 bg-white text-zinc-900 border border-gray-400 px-4 py-1.5 text-sm  rounded-lg  transition-colors"
        >
          Use my Location
        </button>
      </div>

      <div className="relative w-full h-64 md:h-80 rounded-lg overflow-hidden shadow-md">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52808140.21705447!2d-161.46429918210544!3d36.11412792251988!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x54eab584e432360b%3A0x1c3bb99243deb742!2sUnited%20States!5e0!3m2!1sen!2s!4v1748891714135!5m2!1sen!2s"
          width="100%"
          height="100%"
          className="absolute top-0 left-0 w-full h-full border-0"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

    </div>
  );
};

export default LocationSelector;
