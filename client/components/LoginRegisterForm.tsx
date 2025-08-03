"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Layout from "./Layout/Layout_bkup";


export default function LoginRegisterForm() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <Layout>
      <Container>
        <Card isSignIn={isSignIn}>
          {/* Sign Up Form */}
          <div className="form">
            <h2>Sign Up</h2>
            <div className="inputBox">
              <input type="text" required />
              <i className="fa-regular fa-user"></i>
              <span>username</span>
            </div>
            <div className="inputBox">
              <input type="text" required />
              <i className="fa-regular fa-envelope"></i>
              <span>email address</span>
            </div>
            <div className="inputBox">
              <input type="password" required />
              <i className="fa-solid fa-lock"></i>
              <span>create password</span>
            </div>
            <div className="inputBox">
              <input type="password" required />
              <i className="fa-solid fa-lock"></i>
              <span>confirm password</span>
            </div>
            <div className="inputBox">
              <input type="submit" value="Create Account" />
            </div>
            <p>
              Already a member ? <a onClick={() => setIsSignIn(true)}>Log in</a>
            </p>
          </div>

          {/* Sign In Form */}
          <div className="signin">
            <h2>Sign In</h2>
            <div className="inputBox">
              <input type="text" required />
              <i className="fa-regular fa-user"></i>
              <span>username</span>
            </div>
            <div className="inputBox">
              <input type="password" required />
              <i className="fa-solid fa-lock"></i>
              <span>password</span>
            </div>
            <div className="inputBox">
              <input type="submit" value="Login" />
            </div>
            <p>
              Not Registered ?{" "}
              <a onClick={() => setIsSignIn(false)}>Create an account</a>
            </p>
          </div>
        </Card>
      </Container>
    </Layout>
  );
}

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  align-items: center; 
  padding: 2rem 0;
`;

const Card = styled.div<{ isSignIn: boolean }>`
  padding: 40px;
  border-radius: 20px;
  border: 8px solid #223243;
  background: #223243;
  box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
    5px 5px 15px rgba(0, 0, 0, 0.35),
    inset -5px -5px 15px rgba(255, 255, 255, 0.1),
    inset 5px 5px 15px rgba(0, 0, 0, 0.35);
  width: 100%;
  max-width: 400px;

  .form {
    display: ${(props) => (props.isSignIn ? "none" : "flex")};
    flex-direction: column;
    gap: 25px;
    align-items: center;
  }

  .signin {
    display: ${(props) => (props.isSignIn ? "flex" : "none")};
    flex-direction: column;
    gap: 25px;
    align-items: center;
  }

  h2 {
    color: #fff;
    font-weight: 500;
    letter-spacing: 0.1em;
  }

  .inputBox {
    position: relative;
    width: 100%;
  }

  .inputBox input {
    padding: 12px 10px 12px 48px;
    border: none;
    width: 100%;
    background: #223243;
    border: 1px solid rgba(0, 0, 0, 0.1);
    color: #fff;
    font-weight: 300;
    border-radius: 25px;
    font-size: 1em;
    box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
      5px 5px 15px rgba(0, 0, 0, 0.35);
    transition: 0.5s;
    outline: none;
  }

  .inputBox span {
    position: absolute;
    left: 0;
    padding: 12px 10px 12px 48px;
    pointer-events: none;
    font-size: 1em;
    font-weight: 300;
    transition: 0.5s;
    letter-spacing: 0.05em;
    color: rgba(255, 255, 255, 0.5);
  }

  .inputBox input:valid ~ span,
  .inputBox input:focus ~ span {
    color: #00dfc4;
    border: 1px solid #00dfc4;
    background: #223243;
    transform: translateX(25px) translateY(-7px);
    font-size: 0.6em;
    padding: 0 8px;
    border-radius: 10px;
    letter-spacing: 0.1em;
  }

  .inputBox input:valid,
  .inputBox input:focus {
    border: 1px solid #00dfc4;
  }

  .inputBox i {
    position: absolute;
    top: 15px;
    left: 16px;
    width: 25px;
    padding: 2px 0;
    padding-right: 8px;
    color: #00dfc4;
    border-right: 1px solid #00dfc4;
  }

  .inputBox input[type="submit"] {
    background: #00dfc4;
    color: #223243;
    padding: 10px 0;
    font-weight: 500;
    cursor: pointer;
    box-shadow: -5px -5px 15px rgba(255, 255, 255, 0.1),
      5px 5px 15px rgba(0, 0, 0, 0.35),
      inset -5px -5px 15px rgba(255, 255, 255, 0.1),
      inset 5px 5px 15px rgba(0, 0, 0, 0.35);
  }

  p {
    color: rgba(255, 255, 255, 0.5);
    font-size: 0.75em;
    font-weight: 300;
  }

  p a {
    font-weight: 500;
    color: #fff;
    cursor: pointer;
  }
`;
