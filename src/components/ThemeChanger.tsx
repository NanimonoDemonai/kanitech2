import { useTheme } from "next-themes";
import { FC } from "react";

export const ThemeChanger: FC = () => {
  const { theme, setTheme } = useTheme();

  return (
    <div>
      {theme === "dark" ? (
        <button onClick={() => setTheme("light")}>Light Mode</button>
      ) : (
        <button onClick={() => setTheme("dark")}>Dark Mode</button>
      )}
    </div>
  );
};
