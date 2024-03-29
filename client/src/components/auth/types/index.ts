export type inputType = {
  name: string;
  placeholder: string;
  type?: "password" | "email" | "number" | "text";
};

export type errorType = {
  open: boolean;
  msg?: any;
};

export type RegisterStateType = {
  name: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "student" | "administrator" | "admin";
  semister: String;
  surname: String;
  career: String;
  student_id: String;
};

export type AdminRegisterStateType = {
  username: string;
  phone: number;
  email: string;
  password: string;
  confirmPassword: string;
  userType: "student" | "administrator" | "admin";
};
