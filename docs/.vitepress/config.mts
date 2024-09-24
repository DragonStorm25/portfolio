import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: " ",
  description: "Jonatan Fontanez's Portfolio",
  base: "/portfolio-DragonStorm25/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about"},
      { text: "Blogs", link: "/blogs" },
      { text: "Projects", link: "/projects"},
      { text: "Legacy", link: "/legacy"}
    ],

    sidebar: [
      {
        text: "About Me",
        link: "/about",
      },
      {
        text: "Blogs",
        link: "/blogs",
      },
      {
        text: "Projects",
        link: "/projects",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/61040-fa23" }],
  },
});
