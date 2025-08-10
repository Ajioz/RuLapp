import { IoHome, IoInformationCircle, IoSchool } from "react-icons/io5";

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
    title: "Our MISSION",
    description:
      "Our mission is to empower businesses through innovative digital solutions, fostering growth and success in the ever-evolving technological landscape. We strive to deliver exceptional value and transform ideas into impactful realities.",
  },
  {
    id: 2,
    title: "Our Objectives",
    description: `We aim to: 
      ✓ Provide cutting-edge tech solutions tailored to each client's needs.
      ✓ Foster long-term partnerships built on trust and mutual success.
      ✓ Continuously innovate and stay ahead of industry trends.
      ✓ Cultivate a culture of excellence & continuous learning within our team.`,
  },
  {
    id: 3,
    title: "Our Expertise",
    description:
      "With over 7 years of experience, we've mastered the art of digital transformation. Our team of experts excels in web development, mobile applications, cloud solutions, and cutting-edge technologies like AI and IoT. We've successfully delivered over 500 projects, driving tangible results for businesses across various industries. ",
  },
  {
    id: 4,
    title: "Our Impact",
    description:
      "Our solutions have helped clients achieve an average of 40% increase in efficiency and 25% boost in revenue. We've been recognized with multiple industry awards for our innovative approaches. Our client retention rate of 95% speaks volumes about the trust and satisfaction we consistently deliver.. ",
  },
];
