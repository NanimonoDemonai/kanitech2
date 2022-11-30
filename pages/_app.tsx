import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";
import { ThemeChanger } from "src/components/organisms/ThemeChanger";
import "../styles/global.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme="dark">
      <ThemeChanger />
      <hr />
      <Component {...pageProps} />
    </ThemeProvider>
  );
}

export default MyApp;
