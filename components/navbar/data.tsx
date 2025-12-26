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
    { title: "Lorem ipsum", url: "#" },
    {
      title: "Lorem ipsum 0",
      url: "#",
      items: [
        {
          title: "Lorem ipsum 1",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor sapien eu gravida pharetra.",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Lorem ipsum 2",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor sapien eu gravida pharetra.",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Lorem ipsum 3",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor sapien eu gravida pharetra.",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Lorem ipsum 4",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc auctor sapien eu gravida pharetra.",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Lorem ipsum 5",
      url: "#",
      items: [
        {
          title: "Lorem ipsum 6",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          icon: <Zap className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Lorem ipsum 7",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          icon: <Sunset className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Lorem ipsum 8",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          icon: <Trees className="size-5 shrink-0" />,
          url: "#",
        },
        {
          title: "Lorem ipsum 9",
          description:
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
          icon: <Book className="size-5 shrink-0" />,
          url: "#",
        },
      ],
    },
    {
      title: "Lorem ipsum 10",
      url: "#",
    },
    {
      title: "Lorem ipsum 11",
      url: "#",
    },
  ],
  auth: {
    login: { title: "Login", url: "#" },
    signup: { title: "Sign up", url: "#" },
  },
};
