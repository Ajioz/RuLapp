import styled, { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: 'Segoe UI', sans-serif;
    background-color: #f9f9f9;
    color: #333;
  }
`;

export const Container = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

export const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1rem;
`;

export const InputArea = styled.textarea`
  width: 100%;
  height: 300px;
  padding: 1rem;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin-bottom: 1rem;
`;

export const Button = styled.button`
  background-color: #0070f3;
  color: white;
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.2s ease;
  &:hover {
    background-color: #0059c1;
  }
`;

export const Output = styled.pre`
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-top: 1.5rem;
  white-space: pre-wrap;
`;
