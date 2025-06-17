import React, { useState } from 'react'


interface EmailInputProps {
    onSubmit: (email: string) => void;
}

const EmailInput: React.FC<EmailInputProps> = ({ onSubmit }) => {
    const [email, setEmail] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); 
        if (email.trim()) {
            onSubmit(email);  
        }
    };
    return (
        <div className="w-full">
            <form className='space-y-4' onSubmit={handleSubmit}>

                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-1 w-full h-12 px-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    aria-label="email address"
                />

                <button
                    type="submit"
                    disabled={!email.trim()}
                    className="w-full h-12 bg-black text-white font-medium rounded-xl hover:bg-gradient-to-r hover:from-[#31CCD6] hover:via-[#66C587] hover:to-[#BBD16B] hover:text-black transition ease-in delay-100 duration-150 cursor-pointer"
                >
                    Send Magic Link
                </button>
            </form>
        </div>
    )
}

export default EmailInput