import React, { PropsWithChildren } from "react";
import * as S from "./button.styles";

type ButtonProps = PropsWithChildren & {
  onClick: () => void;
  disabled: boolean;
};

export const Button: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  children,
}) => {
  return (
    <S.Button onClick={onClick} disabled={disabled}>
      {children}
    </S.Button>
  );
};
