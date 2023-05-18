import React from "react";
import OpenRegisterationForm from "./OpenRegisterationForm";
import PreviousRegisteration from "./PreviousRegisteration";

export default function AdminDashboard() {
  return (
    <div className="w-screen h-screen ">
      <h1 className="bg-indigo-500 text-xl font-bold p-4 text-center">
        Admin Dashboard
      </h1>

      <section className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex gap-6 items-center justify-around shadow-2xl p-10 rounded-xl w-3/4">
        <div className="col-span-12 md:col-span-6">
          <OpenRegisterationForm />
        </div>
        <div className="col-span-12 md:col-span-6">
          <PreviousRegisteration />
        </div>
      </section>
    </div>
  );
}
