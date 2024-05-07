import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import FormInputs from "../../Components/Register Inputs/FormInputs";
import { validatedEmail, validationLogin } from "../../Forms Validation/Validation";
import { Message } from "../../Components";
import { useLoginMutation } from "../../Redux/apis/authApi";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showMessage, setShowMessage] = useState(["", "", false]);
  const [login] = useLoginMutation();
  const { isAuthed } = useSelector((state) => state.user); // A Globale State gets set when the res of the login is 200
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthed) {
      setTimeout(() => {
        navigate("/");
      }, 300);
    }
  }, [isAuthed, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!validationLogin(email, password)) {
      setShowMessage(["All fields are required", "error", true]);
    }
    if (!validatedEmail(email)) {
      setShowMessage(["Invalid Email format.", "error", true]);
      return;
    }

    try {
      await login({
        email: email,
        password: password,
      }).unwrap(); //unwarping the response to get the error message
      setShowMessage(["login successfully", "success", true]);
    } catch (err) {
      if (err.status === 400) setShowMessage(["Email or password is invalid", "error", true]);
      else console.log("Fatal Error ", err);
    }
  };

  return (
    <main className='grid place-content-center h-screen overflow-hidden'>
      <div className='w-96  bg-neutral-800 border border-neutral-700 rounded-md p-4 shadow-xl shadow-neutral-950'>
        <h1 className='text-neutral-100 text-center pt-2 text-3xl font-bold'>Login</h1>
        <form action='#' className='flex flex-col gap-2 mt-5'>
          <FormInputs Data={[email, setEmail]} title='Email' type='email' />
          <FormInputs Data={[password, setPassword]} title='Password' type='password' />
          <button
            type='submit'
            onClick={handleLogin}
            className='bg-neutral-50 hover:bg-neutral-300 hover:scale-95 text-neutral-950 px-3 py-2 mt-2 w-[70%] mx-auto rounded-md transition-all duration-200'
          >
            Login
          </button>
          <span className='text-sm text-center text-neutral-100/50 '>
            Don't have an account
            <Link
              to={"/register"}
              className='underline cursor-pointer hover:bg-neutral-100 hover:text-neutral-950 px-1 py-0.5 transition duration-200 rounded-sm hover:no-underline'
            >
              Sign Up
            </Link>
          </span>
        </form>
      </div>
      <AnimatePresence>
        {showMessage[2] && (
          <Message message={showMessage[0]} status={showMessage[1]} setMessage={setShowMessage} />
        )}
      </AnimatePresence>
    </main>
  );
};

export default LoginPage;
