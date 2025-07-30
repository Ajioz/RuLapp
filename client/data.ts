import {
  IoChatbubbles,
  IoHome,
  IoImage,
  IoInformationCircle,
  IoSchool,
  IoMailUnread,
} from "react-icons/io5";

export const getLinks = (isAdmin: boolean) => [
    {
        href: "/",
        label: "Home",
        icon: IoHome,
    },
    {
        href: "/rul",
        label: "Predict",
        icon: IoInformationCircle,
    },
    {
        href: "/upload",
        label: "Upload",
        icon: IoSchool,
    },
    ...(isAdmin
        ? [{ href: "/admin/upload-model", label: "⚙ Upload Artefact" }]
        : []),
];
