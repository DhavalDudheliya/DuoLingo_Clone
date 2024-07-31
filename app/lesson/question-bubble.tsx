type Props = {
  question: string;
};

import Image from "next/image";

export const QuestionBubble = ({ question }: Props) => {
  return (
    <div className="flex items-center gap-x-4 mb-4">
      <Image
        src="/logo.svg"
        alt="Mascot"
        height={60}
        width={60}
        className="hidden lg:block"
      />
      <Image
        src="/logo.svg"
        alt="Mascot"
        height={40}
        width={40}
        className="lg:hidden block"
      />
      <div className="relative py-2 px-4 border-2 rounded-xl text-sm lg:text-balance">
        {question}
        <div className="absolute w-0 h-0 border-x-8 border-x-transparent border-t-8 transform -left-3 top-1/2 -translate-y-1/2 rotate-90" />
      </div>
    </div>
  );
};
