import React from "react";
import * as S from "./input.styles";

type InputProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  return (
    <S.Input value={value} onChange={onChange} placeholder={placeholder} />
  );
};
