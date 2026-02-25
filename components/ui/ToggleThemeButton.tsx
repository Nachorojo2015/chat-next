import { SunMoon } from "lucide-react";
import { useEffect, useState } from "react";

export const ToggleThemeButton = () => {
  const [dark, setDark] = useState(false);

  const toggleTheme = () => {
    setDark(prev => !prev);
  };

  useEffect(() => {
    const html = document.documentElement;
    html.setAttribute("data-theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <div
      onClick={toggleTheme}
      className="flex items-center gap-2 cursor-pointer"
    >
      <SunMoon size={32} />
      <p>Cambiar tema</p>
      <input
        type="checkbox"
        checked={dark}
        readOnly
        className="toggle"
      />
    </div>
  );
};