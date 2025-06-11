import "../App.css";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../components/ui/input-otp";

function VerifyCode() {

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
                    <h1 className="lg:text-5xl text-2xl font-semibold text-zinc-900">We sent you a log-in code</h1>


                    <div className="flex flex-col mx-auto items-center gap-4 my-8">
                        <p className="text-center text-xl my-2 text-zinc-950 font-medium">Enter code sent to +1XXXXXXXXXX</p>
                        <div className="scale-125 lg:scale-175">
                        <InputOTP type="tel" maxLength={8}>
                            <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                            </InputOTPGroup>
                            <InputOTPSeparator />
                            <InputOTPGroup>
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                                <InputOTPSlot index={6} />
                                <InputOTPSlot index={7} />
                            </InputOTPGroup>
                        </InputOTP>
                        </div>

                    </div>



                    <div className="max-w-lg mx-auto py-5">
                          <button className="w-full py-3 bg-black text-zinc-100  font-medium rounded-xl transform transition-all focus:outline-none flex justify-center items-center gap-2">
                            Verify Code
                        </button>

                        <p className="text-lg text-gray-400 my-4"> OR </p>

                        <button className="w-full py-3 bg-transparent border border-gray-400 font-medium rounded-xl transform transition-all focus:outline-none flex justify-center items-center gap-2">
                            <img src="/google-form.png" width={18} height={18} alt="" /> Continue with Google
                        </button>
                    </div>


                </div>
            </div>
        </section>
    )
}

export default VerifyCode