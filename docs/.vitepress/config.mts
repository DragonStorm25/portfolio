import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Jonatan Fontanez",
  description: "Jonatan Fontanez's Portfolio",
  base: "/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Projects", link: "/projects"},
      { text: "Blogs", link: "/blogs" },
      { text: "Legacy", link: "/legacy"}
    ],

    sidebar: [
        {
        text: "Projects",
        link: "/projects",
        items: [
            { text: "ALife", link: "/projects/alife"}
        ]
        },
        {
            text: "Blogs",
            link: "/blogs",
        },
      
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/61040-fa23" }],
  },
});
