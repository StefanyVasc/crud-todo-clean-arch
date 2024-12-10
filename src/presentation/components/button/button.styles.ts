import styled from "styled-components";

export const Button = styled.button`
  background-color: #007bff;
  color: #fff;
  padding: 10px 14px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }

  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;
