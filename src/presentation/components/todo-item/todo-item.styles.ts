import styled from "styled-components";

export const TodoItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.small};
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.borderRadius};
  margin-bottom: ${({ theme }) => theme.spacing.small};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.hover};
  }
`;

export const CheckAction = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.small};

  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text};
    text-decoration: none;
    transition: text-decoration 0.3s ease;

    &.completed {
      text-decoration: line-through;
    }
  }

  &:hover {
    cursor: pointer;

    svg:first-child {
      color: green;
    }
  }

  svg:first-child:hover {
    color: green;

    span {
      text-decoration: line-through;
    }
  }
`;

export const ItemActions = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing.small};
  align-items: center;

  svg {
    cursor: pointer;
    transition: transform 0.2s ease, color 0.2s ease;
    color: ${({ theme }) => theme.colors.primary};

    &:hover {
      transform: scale(1.2);
    }

    &:first-child:hover {
      color: red;
    }

    &:last-child:hover {
      color: blue;
    }
  }
`;
