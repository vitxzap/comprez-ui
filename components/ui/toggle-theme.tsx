"use client";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { Button } from "./button";
import { useTheme } from "next-themes";

export function ToggleThemeButton() {
  const { resolvedTheme, setTheme } = useTheme();
  function toggleTheme() {
    setTheme(resolvedTheme == "light" ? "dark" : "light");
  }
  return (
    <Button variant={"ghost"} size={"icon-sm"} onClick={toggleTheme}>
      {resolvedTheme == "light" ? <IconMoon /> : <IconSun />}
    </Button>
  );
}
