import { MobilesSidebar } from "./ui/mobile-sidebar";

export const MobileHeader = () => {
  return (
    <nav className="lg:hidden top-0 fixed w-full h-[50px] flex items-center px-6 border-b z-50 bg-green-500">
      <MobilesSidebar />
    </nav>
  );
};
 