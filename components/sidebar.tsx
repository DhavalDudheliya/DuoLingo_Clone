import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { SidebarItem } from "./sidebar-item";
import { ClerkLoaded, ClerkLoading, UserButton } from "@clerk/nextjs";
import { Loader } from "lucide-react";

type Props = {
  className?: String;
};

export const Sidebar = ({ className }: Props) => {
  return (
    <div
      className={cn(
        "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col justify-between",
        className
      )}
    >
      <div>
        <Link href="/learn">
          <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
            <Image src="/logo.svg" height={40} width={40} alt="logo" />
            <h1 className="text-2xl font-extrabold">
              <span className="text-green-500">Lingo</span>
            </h1>
          </div>
        </Link>
        <div className="flex flex-col gap-y-2">
          <SidebarItem label="learn" href="/learn" iconSrc="/learn.svg" />
          <SidebarItem
            label="Leaderboard"
            href="/leaderboard"
            iconSrc="/leaderboard.svg"
          />
          <SidebarItem label="Quests" href="/quests" iconSrc="/quests.svg" />
          <SidebarItem label="Shop" href="/shop" iconSrc="/shop.svg" />
        </div>
      </div>
      <div className="p-5">
        <ClerkLoading>
          <Loader className="h-5 w-5 mb-5 ml-3 text-muted-foreground animate-spin" />
        </ClerkLoading>
        <ClerkLoaded>
          <UserButton
            appearance={{
              elements: {
                userButtonAvatarBox: "h-12 w-12",
              },
            }}
          />
        </ClerkLoaded>
      </div>
    </div>
  );
};
