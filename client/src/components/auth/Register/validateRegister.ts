import { RegisterStateType } from "../types/index";

type validateType = { state: RegisterStateType };

export function validateRegister({ state }: validateType) {
  console.log(state);

  const promise = new Promise((resolve, reject) => {
    if (
      !state.confirmPassword ||
      !state.email ||
      !state.password ||
      !state.phone ||
      !state.name
    ) {
      reject("Fill all the fields");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(state.email)
    ) {
      reject("Invalid Email");
    } else if (state.password.length < 6) {
      reject("Required minimum 6 letters");
    } else if (state.password !== state.confirmPassword) {
      reject("Password doesn't match");
    } else {
      resolve("Valid inputs");
    }
  });

  return promise;
}
