import { useState } from "react";
import styled from "styled-components";
import Layout from "@/components/Layout/Layout";
import { useRouter } from "next/router";

export default function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }

    try {
      // TODO: Replace with real API call
      console.log("Signing up:", { email, password });

      // Simulate successful signup
      router.push("/login");
    } catch (err) {
      setError("Signup failed.");
    }
  };

  return (
    <Layout title="Sign Up">
      <FormContainer>
        <h2>Create Account</h2>
        <form onSubmit={handleSignup}>
          <label>Email</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label>Password</label>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <label>Confirm Password</label>
          <input
            type="password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />

          <button type="submit">Sign Up</button>
          {error && <ErrorMsg>{error}</ErrorMsg>}
        </form>
      </FormContainer>
    </Layout>
  );
}

const FormContainer = styled.div`
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);

  h2 {
    margin-bottom: 1.5rem;
    font-size: 1.5rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    label {
      font-weight: 500;
    }

    input {
      padding: 0.6rem;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 1rem;
    }

    button {
      background: #0070f3;
      color: white;
      border: none;
      padding: 0.75rem;
      border-radius: 5px;
      cursor: pointer;
      font-weight: 600;
      transition: background 0.2s ease;

      &:hover {
        background: #005fcc;
      }
    }
  }
`;

const ErrorMsg = styled.p`
  color: red;
  font-size: 0.9rem;
  margin-top: 0.5rem;
  text-align: center;
`;
