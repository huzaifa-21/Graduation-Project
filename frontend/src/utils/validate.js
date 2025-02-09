import validator from "validator";

export const validateLogin = {
  email: (value) => {
    if (!value) return "Email is required";
    if (!validator.isEmail(value)) return "Email is not valid";
    return null;
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (!validator.isStrongPassword(value, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols:1
    })) return "Passwords must be at least 8 characters long and include different types of characters ";
    return null;
  },
};
export const validateSignin = {
  name: (value) => {
    if (!value) return "Name is required"; 
    if (!/^[A-Za-z\s]+$/.test(value))
      return "Name should contain only letters and spaces";
    if (value.trim().length < 2) return "Name should be more than 1 letter";
    return null; // No error
  },
  email: (value) => {
    if (!value) return "Email is required";
    if (!validator.isEmail(value)) return "Email is not valid";
    return null;
  },
  password: (value) => {
    if (!value) return "Password is required";
    if (!validator.isStrongPassword(value, {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minSymbols:1
    })) return "Passwords must be at least 8 characters long and include different types of characters ";
    return null;
  },
};
