"use client";

export default function ThemeToggle() {
  const toggle = () => {
    document.body.classList.toggle("dark");
    document.body.classList.toggle("light");
  };

  return <button onClick={toggle}>Toggle Mode</button>;
}