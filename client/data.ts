import {
  IoHome,
  IoInformationCircle,
  IoSchool,
} from "react-icons/io5";

export const getLinks = (isAdmin: boolean) => [
    {
        href: "/",
        label: "Home",
        icon: IoHome,
    },
    {
        href: "/about",
        label: "About",
        icon: IoInformationCircle,
    },
    {
        href: "/contact",
        label: "Contact",
        icon: IoSchool,
    },
    {
        href: "/account",
        label: "Account",
        icon: IoSchool,
    },
    ...(isAdmin
        ? [{ href: "/admin/upload-model", label: "⚙ Upload Artefact" }]
        : []),
];
