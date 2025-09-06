export interface MenuItem {
  id: number;
  label: string;
  path: string;
}

export const menuItems: Array<MenuItem> = [
  {
    id: 1,
    label: "Users",
    path: "/users",
  },
  {
    id: 2,
    label: "Posts",
    path: "/posts",
  },
];
