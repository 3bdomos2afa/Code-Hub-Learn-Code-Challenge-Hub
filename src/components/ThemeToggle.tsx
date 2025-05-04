
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/hooks/use-language";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const { currentLanguage } = useLanguage();
  const isRtl = currentLanguage === "ar";

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null;
    
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.classList.toggle("dark", savedTheme === "dark");
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
  };

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      onClick={toggleTheme} 
      aria-label="Toggle theme"
      className="relative overflow-hidden group"
    >
      <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-md"></div>
      <span className="relative block transition-all duration-500 ease-out">
        <Sun className={`h-5 w-5 transition-all scale-100 rotate-0 ${theme === "dark" ? "scale-0 rotate-90" : ""}`} />
        <Moon className={`h-5 w-5 absolute top-0 left-0 transition-all ${isRtl ? "rotate-180" : ""} ${theme === "dark" ? "scale-100 rotate-0" : "scale-0 -rotate-90"}`} />
      </span>
    </Button>
  );
}
