import ChooseFood from "@/components/food/ChooseFood";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

export default function UserDashboard() {
  const [state, setState] = useState({});

  const router = useRouter();

  useEffect(() => {
    const token = window.localStorage.getItem("token");

    if (!token) {
      router.push("/auth/login");
    }
  }, []);

  return (
    <div>
      <ChooseFood />
    </div>
  );
}
