import { MainNavItem } from "@/types/nav";

interface DocsConfig {
  mainNav: MainNavItem[];
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: "勞健保計算",
      href: "/LHI",
    },
    {
      title: "面積換算",
      href: "/area-convert",
    },
    {
      title: "查詢 IP",
      href: "/my-ip",
    },
  ],
};
