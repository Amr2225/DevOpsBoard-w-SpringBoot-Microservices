import { useState } from "react";
import { IoEye, IoEyeOff } from "react-icons/io5";

const FormInputs = ({ Data, title, type }) => {
  const [showPassword, setShowPassword] = useState(false);
  let value, setValue;

  //To get the  data
  if (Data) {
    [value, setValue] = Data;
  }

  const handleShowPassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      {Data && (
        <span className='relative'>
          <input
            onChange={(e) => setValue(e.target.value)}
            type={type === "password" ? (showPassword ? "text" : type) : type}
            autoComplete='garbage'
            className='bg-neutral-900/40 border border-neutral-500/40 rounded-sm p-2 w-full outline-none focus:border-violet-400     focus:bg-neutral-800 transition duration-200 text-neutral-100 text-sm'
          />
          <label
            className={`absolute left-0 top-1/2 -translate-y-[50%] px-2 text-neutral-100/70 text-sm origin-left ${
              value.trim() === "" ? "input-text-focus" : "input-text"
            } tranistion duration-200`}
          >
            {title}
          </label>
          {type === "password" && (
            <span onClick={handleShowPassword}>
              {!showPassword ? (
                <IoEye
                  className={`text-neutral-100 absolute top-1/2 -translate-y-[50%] right-4 scale-110 hover:text-neutral-100/60 cursor-pointer transition-opacity duration-200 ${
                    value.trim() !== "" ? "opacity-100" : "opacity-0"
                  }`}
                />
              ) : (
                <IoEyeOff className='text-neutral-100 absolute top-1/2 -translate-y-[50%] right-4 scale-110 hover:text-neutral-100/60 cursor-pointer' />
              )}
            </span>
          )}
        </span>
      )}
    </>
  );
};

export default FormInputs;
