import styled from "styled-components";

export const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto auto;
  gap: ${({ theme }) => theme.spacing.medium};
  width: 70vw;

  .input-container {
    display: flex;
    gap: ${({ theme }) => theme.spacing.small};
    margin: 10px 0;
  }
`;

export const GridItem = styled.div`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: #fff;
  text-align: center;
`;

export const FullWidthItem = styled(GridItem)`
  grid-column: span 2;
`;

export const ColumnContainer = styled.div<{ $fullWidth?: boolean }>`
  background-color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.medium};
  border-radius: ${({ theme }) => theme.borderRadius};
  color: #fff;
  text-align: center;
  grid-column: ${({ $fullWidth }) => ($fullWidth ? "span 2" : "auto")};
`;

export const RowContainer = styled.div`
  display: contents;
`;
