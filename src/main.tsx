import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

// Prevent theme flash: set a default theme before React mounts.
// Navbar still manages theme switching/persistence.
const storedTheme = window.localStorage.getItem("portfolio-theme")
const theme = storedTheme === "theme-light" || storedTheme === "theme-ocean" ? storedTheme : "theme-dark"

document.documentElement.classList.remove("theme-dark", "theme-light", "theme-ocean")
document.documentElement.classList.add(theme)

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

