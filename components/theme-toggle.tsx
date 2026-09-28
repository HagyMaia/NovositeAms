"use client"

import { useState, useEffect } from "react"
import { Sun, Moon } from "lucide-react"

export function ThemeToggle() {
  const [theme, setTheme] = useState<"dark" | "light">("dark")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = localStorage.getItem("theme") as "dark" | "light" | null
    if (savedTheme) {
      setTheme(savedTheme)
      applyTheme(savedTheme)
    } else {
      // Default to dark
      setTheme("dark")
      applyTheme("dark")
    }
  }, [])

  const applyTheme = (t: "dark" | "light") => {
    const root = document.documentElement
    if (t === "light") {
      root.classList.remove("dark")
      root.classList.add("light")
    } else {
      root.classList.remove("light")
      root.classList.add("dark")
    }
  }

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark"
    setTheme(nextTheme)
    localStorage.setItem("theme", nextTheme)
    applyTheme(nextTheme)
  }

  if (!mounted) {
    return (
      <button
        className="flex size-9 items-center justify-center rounded-full border border-border bg-card/60 text-muted-foreground"
        aria-label="Alternar tema"
      >
        <Moon className="size-4" />
      </button>
    )
  }

  return (
    <button
      onClick={toggleTheme}
      className="flex size-9 items-center justify-center rounded-full border border-border bg-card/70 text-foreground shadow-sm transition-all hover:bg-card hover:border-primary/50 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary/40"
      aria-label={theme === "dark" ? "Ativar Modo Claro" : "Ativar Modo Escuro"}
      title={theme === "dark" ? "Mudar para Modo Claro" : "Mudar para Modo Escuro"}
    >
      {theme === "dark" ? (
        <Sun className="size-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
      ) : (
        <Moon className="size-4 text-slate-700 transition-transform -rotate-12 hover:rotate-0" />
      )}
    </button>
  )
}
