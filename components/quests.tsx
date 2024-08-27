import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";
import { Progress } from "./ui/progress";

const quests = [
  {
    title: "Earn 10 XP",
    value: 10,
  },
  {
    title: "Earn 20 XP",
    value: 20,
  },
  {
    title: "Earn 50 XP",
    value: 50,
  },
  {
    title: "Earn 100 XP",
    value: 100,
  },
  {
    title: "Earn 500 XP",
    value: 500,
  },
  {
    title: "Earn 1000 XP",
    value: 1000,
  },
];

type Props = {
  points: number;
};

export const Quests = ({ points }: Props) => {
  return (
    <div className="border-2 rounded-xl p-4 flex flex-col space-y-4">
      <div className="flex items-center justify-between w-full space-y-2">
        <h3 className="font-bold text-lg">Quests</h3>
        <Link href="/quests">
          <Button size="sm" variant="primaryOutline">
            View all
          </Button>
        </Link>
      </div>
      <ul className="w-full space-y-4 ">
        {quests.map((quests) => {
          const progress = (points / quests.value) * 100;

          return (
            <div
              className="flex items-center w-full pb-4 gap-x-4"
              key={quests.title}
            >
              <Image src="/points.svg" alt="Points" width={40} height={40} />
              <div className="flex flex-col gap-y-2 w-full">
                <p className="text-neutral-700 text-base font-bold">
                  {quests.title}
                </p>
                <Progress value={progress} className="h-2" />
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};
