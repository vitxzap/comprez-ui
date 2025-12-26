"use client";
import { Moon, Sun } from "lucide-react";
import { Button } from "./button";
import { useTheme } from "next-themes";

export function ToggleThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  function toggleTheme() {
    setTheme(resolvedTheme == "light" ? "dark" : "light");
  }
  return (
    <Button variant={"ghost"} size={"icon-sm"} onClick={toggleTheme}>
      {resolvedTheme == "light" ? <Moon /> : <Sun />}
    </Button>
  );
}
