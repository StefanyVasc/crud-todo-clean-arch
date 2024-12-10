import React, { PropsWithChildren } from "react";
import * as S from "./layout.styles";

export const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return <S.Layout>{children}</S.Layout>;
};
