import { ArrowLeft } from "lucide-react";
import { Link } from "react-router";

const GoBack = ({ to, text }: { to: string; text: string }) => {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 font-medium text-[14px] pb-[34px]"
    >
      <ArrowLeft className="w-5 h-5" />
      <span>{text}</span>
    </Link>
  );
};

export default GoBack;
