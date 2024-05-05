import validator from "validator";

export const validation = (firstName, lastName, password) => {
  if (firstName.trim() === "") return false;
  if (lastName.trim() === "") return false;
  if (password.trim() === "") return false;

  return true;
};

export const validatePassword = (password, confirmPassword) => {
  if (password.trim() !== confirmPassword.trim()) return false;

  return true;
};

export const validationLogin = (email, password) => {
  if (email.trim() === "") return false;
  if (!validator.isEmail(email)) return false;
  if (password.trim() === "") return false;

  return true;
};

export const validatedEmail = (email) => {
  if (!validator.isEmail(email)) return false;

  return true;
};
