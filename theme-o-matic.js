if (!sessionStorage.getItem("visited")) {
    sessionStorage.setItem("visited", "true");
    localStorage.setItem("theme", "dark");
  }
  
  let currentThemeSetting = localStorage.getItem("theme") || "dark";
  
  // Light mode styles
  const lightThemeStyles = `
    :root {
      --primary-color: #111;
      --accent-color: mediumblue;
      --background-color: floralwhite;
      --form-field-background-color: white;
    }
    body {
      color: var(--primary-color);
      background-color: var(--background-color);
    }
    svg {
      fill: var(--primary-color);
    }
    .play-pause .icon {
      fill: var(--background-color);
    }
  `;
  
  function applyTheme(theme) {
    const styleTag = document.getElementById("theme-style");
    if (theme === "light") {
      // Inject light mode styles if not already added
      if (!styleTag) {
        const newStyleTag = document.createElement("style");
        newStyleTag.id = "theme-style";
        newStyleTag.textContent = lightThemeStyles;
        document.head.appendChild(newStyleTag);
      }
    } else if (theme === "dark") {
      // Remove light mode styles to fall back to default dark mode
      if (styleTag) {
        styleTag.remove();
      }
    }
  
    document.documentElement.setAttribute("data-theme", theme);
  
    // Update toggle buttons (if any)
    const darkThemeIcon = document.querySelector("[data-theme-dark-toggle]");
    const lightThemeIcon = document.querySelector("[data-theme-light-toggle]");
    if (darkThemeIcon && lightThemeIcon) {
      if (theme === "dark") {
        darkThemeIcon.classList.remove("hidden");
        lightThemeIcon.classList.add("hidden");
      } else {
        lightThemeIcon.classList.remove("hidden");
        darkThemeIcon.classList.add("hidden");
      }
    }
  
    // Update toggle button accessibility
    const button = document.querySelector("[data-theme-toggle]");
    if (button) {
      button.setAttribute("aria-label", `Click for ${theme === "dark" ? "light" : "dark"} theme`);
    }
  }
  
  // Apply theme on initial load
  applyTheme(currentThemeSetting);
  
  const button = document.querySelector("[data-theme-toggle]");
  if (button) {
    button.addEventListener("click", () => {
      const newTheme = currentThemeSetting === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newTheme);
      currentThemeSetting = newTheme;
      applyTheme(newTheme);
    });
  }
  
  // Ensure the theme is applied when the page is loaded from the cache
  window.addEventListener("pageshow", () => {
    const savedTheme = localStorage.getItem("theme") || "dark";
    applyTheme(savedTheme);
  });
  