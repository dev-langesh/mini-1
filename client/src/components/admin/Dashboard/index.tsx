import React from "react";
import OpenRegisterationForm from "./OpenRegisterationForm";
import PreviousRegisteration from "./PreviousRegisteration";

export default function AdminDashboard() {
  return (
    <div className="w-screen h-screen ">
      <h1 className="text-indigo-500 text-xl font-bold p-4 text-center">
        Admin Dashboard
      </h1>

      <section className="grid grid-cols-12 gap-2 p-6">
        <div className="col-span-6">
          <OpenRegisterationForm />
        </div>
        <div className="col-span-6">
          <PreviousRegisteration />
        </div>
      </section>
    </div>
  );
}
