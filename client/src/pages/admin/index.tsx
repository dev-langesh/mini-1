import AdminDashboard from "@/components/admin/Dashboard";
import Link from "next/link";
import React from "react";

export default function AdminHome() {
  return <AdminDashboard />;
}

function Card({ text, href }: any) {
  return (
    <div className="p-6 h-64 w-56 border-2 grid place-content-center  text-center border-blue-500 m-3 hover:scale-105 transition cursor-pointer duration-150 hover:text-blue-500">
      <h1 className="font-bold font-sans text-xl">{text}</h1>
    </div>
  );
}
