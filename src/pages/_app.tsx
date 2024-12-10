import { TodoProvider } from "@/presentation/contexts";
import type { AppProps } from "next/app";
import { createGlobalStyle, ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "#0070f3",
    secondary: "#ff4081",
    background: "#f4f4f4",
    text: "#333333",
    border: "#ddd",
    button: {
      primary: "#007bff",
      hover: "#0056b3",
      disabled: "#ccc",
    },
  },
  fonts: {
    primary: "'Roboto', sans-serif",
    heading: "'Arial', sans-serif",
  },
  spacing: {
    small: "8px",
    medium: "16px",
    large: "32px",
  },
  borderRadius: "8px",
  boxShadow: {
    light: "0 2px 4px rgba(0, 0, 0, 0.1)",
    medium: "0 4px 8px rgba(0, 0, 0, 0.2)",
  },
};

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0;
    font-family: ${({ theme }) => theme.fonts.primary}, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
  }

  h1, h2 {
    font-family: ${({ theme }) => theme.fonts.heading};
  }

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  a {
    text-decoration: none;
  }
`;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <TodoProvider>
          <Component {...pageProps} />
        </TodoProvider>
      </ThemeProvider>
    </>
  );
}
