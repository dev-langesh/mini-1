import {
  AdminRegisterStateType,
  inputType,
  RegisterStateType,
} from "../types/index";

export const inputs: inputType[] = [
  {
    name: "username",
    placeholder: "User Name",
  },
  {
    name: "phone",
    placeholder: "Phone",
  },
  {
    name: "email",
    placeholder: "Email",
  },

  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

export const adminInputs: inputType[] = [
  {
    name: "username",
    placeholder: "Username",
  },

  {
    name: "phone",
    placeholder: "Phone",
  },
  {
    name: "email",
    placeholder: "Email",
  },

  {
    name: "password",
    type: "password",
    placeholder: "Password",
  },
  {
    name: "confirmPassword",
    type: "password",
    placeholder: "Confirm Password",
  },
];

export const initialRegisterState: RegisterStateType = {
  username: "",
  phone: 0,
  email: "",
  password: "",
  userType: "student",
  confirmPassword: "",
  semister: "1° semestre",
  career: "",
  student_id: "",
  surname: "",
};

export const adminRegisterationData: AdminRegisterStateType = {
  username: "",
  phone: 0,
  email: "",
  password: "",
  userType: "admin",
  confirmPassword: "",
};
