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

export const about = [
  {
    id: 1,
    title: "OUR PURPOSE",
    description:
      "To manifest God's love and compassion in the life of all by serving humanity",
  },
  {
    id: 2,
    title: "OUR MOTTO",
    description: "Keeping Hope Alive ",
  },
  {
    id: 3,
    title: "IDENTITY STATEMENT",
    description:
      "The Divine Assistance Relief Organisation is a humanitarian ministry in Nigeria, that demonstrates God's compassion and love. ",
  },
  {
    id: 4,
    title: "MISSION STATEMENT",
    description:
      "Our mission is to simplify complexities by supporting individuals living in poverty and distress, inspiring success through education, and shaping a brighter future. We strive to improve lives through enhanced healthcare, raise awareness through advocacy, and provide essential resources. By fostering partnerships and sharing the gospel of Jesus Christ, we aim to promote lasting peace and transformative change.. ",
  },
  {
    id: 5,
    title: "VISION STATEMENT",
    description:
      "Closing the gap between the privileged and the underprivileged in Nigeria.",
  },
  {
    id: 6,
    title: "VALUE STATEMENT",
    description:
      "DARO is committed to building trust by showing compassion that wins confidence, so that proper assessment can be made, service provided, and needs meet, resulting in sustainable development and growth. ",
  },
];

