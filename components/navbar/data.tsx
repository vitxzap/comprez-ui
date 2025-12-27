import { Book, Sunset, Trees, Zap } from "lucide-react";
import { NavbarProps } from "./interfaces";

export const data: NavbarProps = {
  logo: {
    url: undefined,
    src: undefined,
    alt: "logo",
    title: "Comprez",
  },
  menu: [
    { title: "About", url: "#" },
    {
      title: "Other tools",
      url: "#",
      items: [
        {
          title: "First tool",
          description:
            "Some amazing tool that I will manage to develop later.",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Second tool",
          description:
            "Another amazing tool that I will try to develop later.",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Third tool",
          description:
            "Just another amazing tool that Im definely going to develop later.",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Fourth tool",
          description:
            "Another amazing tool that I will manage to develop later.",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Tutorial",
      url: "#",
    },
    {
      title: "Privacy policy",
      url: "#",
    },
  ],
  auth: {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
};
