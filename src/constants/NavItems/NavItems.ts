import {
  CalendarIcon,
  ChartIcon,
  DashboardIcon,
  FormIcon,
  ProfileIcon,
  SettingsIcon,
  TableIcon,
  UIElementsIcon,
} from "@/components/SvgIcons/SvgIcons";

export interface NavLink {
  name: string;
  link: string;
}

export interface NavItems {
  id: string;
  name: string;
  isGroup: boolean;
  link?: string;
  icon?: any;
  category: "MENU" | "SUPPPORT" | "OTHERS";
  groupItems?: NavLink[];
}

export const navItems: NavItems[] = [
  {
    id: "dashboard",
    name: "Dashboard",
    isGroup: false,
    category: "MENU",
    link: "/",
    icon: DashboardIcon,
  },
  {
    id: "users",
    name: "Users",
    isGroup: false,
    category: "MENU",
    link: "/users/list",
    icon: ProfileIcon,
  },
  {
    id: "calendar",
    name: "Calendar",
    isGroup: false,
    category: "MENU",
    link: "/calendar",
    icon: CalendarIcon,
  },
  {
    id: "profile",
    name: "Profile",
    isGroup: false,
    category: "MENU",
    link: "/profile",
    icon: ProfileIcon,
  },
  {
    id: "settings",
    name: "Settings",
    isGroup: false,
    category: "MENU",
    link: "/settings",
    icon: SettingsIcon,
  },
  {
    id: "charts",
    name: "Charts",
    isGroup: false,
    category: "OTHERS",
    link: "/chart",
    icon: ChartIcon,
  },
  {
    id: "ui",
    name: "UI Elements",
    isGroup: true,
    category: "OTHERS",
    icon: UIElementsIcon,
    groupItems: [
      {
        name: "Alerts",
        link: "/ui/alerts",
      },
    ],
  },
];
