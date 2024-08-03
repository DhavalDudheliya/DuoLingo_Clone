import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { CheckCircle, Loader2, XCircle } from "lucide-react";
import { useKey, useMedia } from "react-use";

type Props = {
  disabled?: boolean;
  onCheck: () => void;
  status: "correct" | "wrong" | "none" | "completed";
  lessonId?: number;
  loading?: boolean;
};

export const Footer = ({
  onCheck,
  status,
  disabled,
  lessonId,
  loading,
}: Props) => {
  useKey("Enter", onCheck, {}, [onCheck]);
  const isMobile = useMedia("(max-width: 1024px");

  return (
    <footer
      className={cn(
        "lg:h-[140px] h-[100px] border-t-2",
        status === "correct" && "border-transparent bg-green-100",
        status === "wrong" && "border-transparent bg-rose-100"
      )}
    >
      <div className="max-w-[1140px] h-full mx-auto flex items-center justify-between px-6 lg:px-10">
        {status === "correct" && (
          <div className="text-green-500 font-bold lg:text-2xl flex items-center">
            <CheckCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Nicely done!
          </div>
        )}
        {status === "wrong" && (
          <div className="text-rose-500 font-bold lg:text-2xl flex items-center">
            <XCircle className="h-6 w-6 lg:h-10 lg:w-10 mr-4" />
            Try again.
          </div>
        )}
        {status === "completed" && (
          <Button
            variant="default"
            size={isMobile ? "sm" : "lg"}
            onClick={() => (window.location.href = `/lesson/${lessonId}`)}
          >
            Practice again
          </Button>
        )}
        <Button
          disabled={disabled}
          className="ml-auto"
          onClick={onCheck}
          size={isMobile ? "sm" : "lg"}
          variant={status === "wrong" ? "danger" : "secondary"}
        >
          {loading ? (
            <Loader2 className="animate-spin mx-[3.5px]" />
          ) : (
            <>
              {status === "none" && "Check"}
              {status === "correct" && "Next"}
              {status === "wrong" && "Retry"}
              {status === "completed" && "Continue"}
            </>
          )}
        </Button>
      </div>
    </footer>
  );
};
