import Image from "next/image";
import { Button } from "./ui/button";
import Link from "next/link";

export const Promo = () => {
  return (
    <div className="border-2 rounded-xl p-4 flex flex-col space-y-4">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center gap-x-2">
          <Image src="unlimited.svg" alt="Pro" height={26} width={26} />
          <h3 className="font-bold text-lg">Upgrade to Pro</h3>
        </div>
        <p>Get unlimited hearts and more</p>
      </div>
      <Button asChild variant="super" className="w-full" size="lg">
        <Link href="/shop">Upgrade today</Link>
      </Button>
    </div>
  );
};
