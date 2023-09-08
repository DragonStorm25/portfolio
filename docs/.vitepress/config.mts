import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jonatan Fontanez 6.1040 Portfolio",
  description: "6.1040 Fall 2023",
  base: "/portfolio-DragonStorm25/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Blogs", link: "/blogs" },
    ],

    sidebar: [
      {
        text: "Blogs",
        link: "/blogs",
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/61040-fa23" }],
  },
});
