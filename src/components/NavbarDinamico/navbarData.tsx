import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";

export const navbarData = [
  {
    title: "Home",
    icon: <MdIcons.MdHome />,
    link: "/home",
    className: "navbar",
  },
  {
    title: "Perfil",
    icon: <FaIcons.FaUserCircle />,
    link: "/perfil",
    className: "navbarActive",
  },
  {
    title: "Menu",
    icon: <MdIcons.MdRestaurant />,
    link: "/menu",
    className: "navbarActive",
  },
  {
    title: "Pedidos",
    icon: <MdIcons.MdPhone />,
    link: "/pedidos",
    className: "navbarActive",
  },
  {
    title: "Promocoes",
    icon: <MdIcons.MdOutlineMoneyOffCsred />,
    link: "/promocoes",
    className: "navbarActive",
  },
];
