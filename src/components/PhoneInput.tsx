import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';
import { countries } from '../data/countries';
import "../App.css"

interface PhoneInputProps {
  onSubmit: (phoneNumber: string, countryCode: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ onSubmit }) => {
  const [selectedCountry, setSelectedCountry] = useState(countries[0]);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filteredCountries = countries.filter(
    country => 
      country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      country.dial_code.includes(searchQuery)
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (isDropdownOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isDropdownOpen]);

  const handleCountrySelect = (country: typeof countries[0]) => {
    setSelectedCountry(country);
    setIsDropdownOpen(false);
    setSearchQuery('');
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, '');
    setPhoneNumber(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim()) {
      onSubmit(phoneNumber, selectedCountry.dial_code);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
    setSearchQuery('');
  };

  return (
    <div className="w-full">
      <form onSubmit={handleSubmit}>
        <div className="mb-4 relative">
          <div className="flex gap-3">
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                className="flex items-center space-x-1 h-12 px-3 border border-gray-300 rounded-xl bg-white text-gray-700 hover:bg-gray-50 transition-colors"
                onClick={toggleDropdown}
                aria-label="Select country"
              >
                <span className="w-6 h-4 flex items-center">
                  <img
                    src={selectedCountry.flag}
                    alt={`${selectedCountry.name} flag`}
                    className="max-w-full max-h-full object-contain"
                  />
                </span>
                <span className="text-sm font-medium">{selectedCountry.dial_code}</span>
                {isDropdownOpen ? (
                  <ChevronUp size={16} className="text-gray-500" />
                ) : (
                  <ChevronDown size={16} className="text-gray-500" />
                )}
              </button>


              {isDropdownOpen && (
                <div className="absolute z-10 mt-1 w-72 max-h-80 overflow-y-auto bg-white border border-gray-200 rounded-md shadow-lg animate-in fade-in duration-150">
                  <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                    <div className="relative">
                      <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                      <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search countries..."
                        className="w-full pl-9 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      {searchQuery && (
                        <button
                          type="button"
                          onClick={() => setSearchQuery('')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          aria-label="Clear search"
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <ul className="py-1">
                    {filteredCountries.length > 0 ? (
                      filteredCountries.map((country) => (
                        <li key={country.code}>
                          <button
                            type="button"
                            className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center space-x-3"
                            onClick={() => handleCountrySelect(country)}
                          >
                            <span className="w-6 h-4 flex items-center">
                              <img
                                src={country.flag}
                                alt={`${country.name} flag`}
                                className="max-w-full max-h-full object-contain"
                              />
                            </span>
                            <span className="font-medium">{country.name}</span>
                            <span className="text-gray-500 ml-auto">{country.dial_code}</span>
                          </button>
                        </li>
                      ))
                    ) : (
                      <li className="px-4 py-2 text-sm text-gray-500">No countries found</li>
                    )}
                  </ul>
                </div>
              )}
            </div>

            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="Your phone number"
              className="flex-1 h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              aria-label="Phone number"
            />
          </div>
        </div>


        <button
          type="submit"
          disabled={!phoneNumber.trim()}
          className="w-full h-12 bg-black text-white font-medium rounded-xl hover:bg-gray-900 transform transition-all focus:outline-none f"
        >
          Send Code
        </button>
      </form>
    </div>
  );
};

export default PhoneInput;