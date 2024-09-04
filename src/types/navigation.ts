export interface NavLink {
  name: string;
  link: string;
}

export interface Navigation {
  name: string;
  isGroup: boolean;
  link: string;
  icon?: any;
  category: string;
  groupItems?: NavLink[];
}
