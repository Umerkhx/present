import { useState } from "react";
import "../App.css";
import PhoneInput from "../components/PhoneInput";
import EmailInput from "../components/EmailInput";

function Login() {
    const [activeMethod, setActiveMethod] = useState<"phone" | "email">("phone");

    return (
        <section className="max-w-screen mx-auto p-5 min-h-screen flex flex-col">
            <div className="flex justify-start items-center px-8 py-5">
                <div className="flex items-center gap-2">
                    <img src="/Back Arrow.png" width={18} height={18} alt="logo" />
                    <h1 className="text-black font-medium text-lg">Back</h1>
                </div>
            </div>

            <div className="flex-grow flex items-center justify-center">
                <div className="p-5 w-full text-center">
                    <h1 className="text-4xl font-semibold text-zinc-800">Welcome Back</h1>


                    <div className="flex justify-center items-center gap-4 my-8">
                        <button className={`rounded-lg shadow-lg border px-5 py-1.5 
                        ${activeMethod === "phone" ? "border-gray-900" : "border-gray-400"}`}
                            onClick={() => setActiveMethod("phone")}>
                            Phone
                        </button>
                        <button className={`rounded-lg shadow-lg border px-5 py-1.5 
                        ${activeMethod === "email" ? "border-gray-900" : "border-gray-400"}`}
                            onClick={() => setActiveMethod("email")}>
                            Email
                        </button>
                    </div>


                    <div className="max-w-lg mx-auto">
                        {activeMethod === "phone" ? (
                            <PhoneInput
                                onSubmit={(phoneNumber: string, countryCode: string) => {
                                    console.log("Phone submitted:", phoneNumber, countryCode);
                                }}
                            />
                        ) : (
                            <EmailInput
                                onSubmit={(email: string) => {
                                    console.log("Email submitted:", email);
                                }}
                            />
                        )}
                        <p className="text-lg text-gray-400 my-6"> OR </p>

                            <button className="w-full py-3 bg-transparent border border-gray-400 font-medium rounded-xl transform transition-all focus:outline-none flex justify-center items-center gap-2">
                               <img src="/google-form.png" width={18} height={18} alt="" /> Continue with Google
                            </button>

                            <p className="pt-4">First time here? Sign up Instead</p>
                        

                    </div>
                </div>
            </div>
        </section>
    );
}

export default Login;
