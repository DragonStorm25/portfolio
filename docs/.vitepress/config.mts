import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "6.1040 Portfolio",
  description: "6.1040 Fall 2023",
  base: "/portfolio-DragonStorm25/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "About", link: "/about"},
      { text: "Blogs", link: "/blogs" },
      { text: "Assignments", link: "/assignments"},
      { text: "Projects", link: "/projects"},
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
        text: "Assignments",
        link: "/assignments",
      },
      {
        text: "Projects",
        link: "/projects",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/61040-fa23" }],
  },
});
