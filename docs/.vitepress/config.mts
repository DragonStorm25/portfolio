import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: " ",
  description: "Jonatan Fontanez's Portfolio",
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blogs", link: "/blogs" },
      { text: "Projects", link: "/projects"},
      { text: "Legacy", link: "/legacy"}
    ],

    sidebar: [
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
