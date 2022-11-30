import { useTheme } from "next-themes";
import { FC } from "react";

export const ThemeChanger: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")} suppressHydrationWarning>
          Light Mode
        </button>
      ) : (
        <button onClick={() => setTheme("dark")} suppressHydrationWarning>
          Dark Mode
        </button>
      )}
    </div>
  );
};
