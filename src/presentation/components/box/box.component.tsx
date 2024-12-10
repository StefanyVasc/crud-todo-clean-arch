import React, { PropsWithChildren } from "react";
import * as S from "./box.styles";

type BoxProps = PropsWithChildren & { title: string };

export const Box: React.FC<BoxProps> = ({ title, children }) => {
  return (
    <S.Box>
      <h2>{title}</h2>
      {children}
    </S.Box>
  );
};
