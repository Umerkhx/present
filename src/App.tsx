import "./App.css"
import { Routes, Route } from "react-router-dom"
import EventCheckIn from "./create/EventCheckIn"
import VerificationCode from "./verification-code/VerificationCode"
import VerifyCode from "./verify-code/VerifyCode"
import AccountInfo from "./account-info/AccountInfo"
import Login from "./login/Login"
import Dashboard from "./dashboard/Dashboard"
import EventInfo from "./event-details/EventInfo"
import CheckInPage from "./check-in/Checkin"
import SignUp from "./sign-up/SignUp"
import { AppProvider } from "./context/app-context"

function App() {
  return (
    <AppProvider>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/create" element={<EventCheckIn />} />
        <Route path="/verification-code" element={<VerificationCode />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/account-info" element={<AccountInfo/>} />
        <Route path="/event-details" element={<EventInfo/>} />
        <Route path="/check-in" element={<CheckInPage/>} />
      </Routes>
      </AppProvider>
 
  )
}

export default App
