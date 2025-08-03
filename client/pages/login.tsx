import LoginForm from "@/components/LoginRegisterForm";
import React from "react";

export default function LoginPage() {
  return (
    <div
      style={{
        background: "#223243",
        // minHeight: "100vh",
        // display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginForm />
    </div>
  );
}
