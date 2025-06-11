import { AlignJustify, XIcon } from "lucide-react";
import "../App.css";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "../components/ui/input-otp";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { useState } from "react";

function VerificationCode() {
  const [code, setCode] = useState<string>("");
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);

  //For Backend Dev: This would be replaced with your actual validation logic
  const validateCode = (inputCode: string): boolean => {
    // For demo purposes, let's consider "12345678" as a valid code
    return inputCode === "12345678";
  };

  const handleCheckIn = () => {
    if (code.length === 8) {
      const isValid = validateCode(code);
      if (!isValid) {
        setDialogOpen(true);
      } else {
        // Handle successful check-in
        alert("Successfully checked in!");
      }
    }
  };

  // implement the correct dialog functionality

  return (
    <section className="max-w-screen mx-auto p-5 min-h-screen flex flex-col">
      <div className="flex flex-wrap items-center justify-between p-4 gap-y-4">
        <div className="flex items-center gap-2">
          <img src="/logo.png" width={25} height={25} alt="logo" />
          <span className="font-semibold text-3xl text-zinc-800">Present</span>
        </div>

        <div className="flex items-center gap-4">
          <div className="px-5 py-2 border border-gray-400 rounded-lg md:block hidden">
            Log-in
          </div>
          <div className="px-5 py-2 bg-black text-white rounded-lg md:block hidden">
            Create
          </div>
          <div className="rounded-lg p-1.5 border border-gray-400 md:hidden block">
            <AlignJustify className="w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="flex-grow flex items-center justify-center">
        <div className="p-5 w-full text-center">
          <h1 className="lg:text-7xl text-3xl font-semibold text-zinc-800">Let's Mark you Present</h1>

          <div className="flex flex-col mx-auto items-center gap-4 my-8">
            <p className="text-center text-xl my-2 text-zinc-900 font-medium">
              Enter your event code or scan a QR to check-in.
            </p>

            <div className="scale-110 lg:scale-175">
              <InputOTP type="tel" maxLength={8} value={code} onChange={setCode} >
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

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogContent className="sm:max-w-2xl  lg:h-[600px]">
                <DialogHeader>
                  <div className="flex justify-between items-center px-4">
                    <DialogTitle className="text-xl font-semibold">Error with check-in</DialogTitle>
                    <button onClick={() => setDialogOpen(false)} className="text-gray-500 hover:text-gray-700">
                      <XIcon />
                    </button>
                  </div>
                </DialogHeader>
                <div className="border rounded-md p-6 my-2 text-center">
                  <h3 className="font-semibold text-lg mb-2 mt-16">Sorry, but this event is unavailable</h3>
                  <p className="text-sm text-gray-600">Please contact the event organizer for more info</p>
                </div>
                <button
                  className="mx-auto w-2/4 h-10 bg-black text-white rounded-md py-2"
                  onClick={() => setDialogOpen(false)}
                >
                  Back
                </button>
              </DialogContent>
            </Dialog>
          </div>

          <div className="max-w-xl mx-auto">
            <div className="flex lg:flex-row flex-col justify-center items-center gap-2">
              <button className="w-full lg:w-1/3 py-3 bg-transparent border border-gray-400 font-medium rounded-xl transform transition-all focus:outline-none flex justify-center items-center gap-2">
                Scan QR Code
              </button>
              <button
                className="w-full lg:w-2/3 py-3 bg-black text-zinc-100 text-lg font-medium rounded-xl transform transition-all focus:outline-none flex justify-center items-center gap-2"
                onClick={handleCheckIn}
              >
                Check-In
              </button>
            </div>

            <div className="fixed bottom-4 left-0 w-full flex justify-center">
              <div className="align-bottom gap-5 flex justify-center">
                <p className="text-lg font-medium text-zinc-950">What's Present</p>
                <p className="text-lg font-medium text-zinc-950">Try Demo</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default VerificationCode