import { Link, useLocation } from "react-router";

interface ListButtonProps {
  label: string;
  to: string;
}

export default function ListButton({ label, to }: ListButtonProps) {
  const location = useLocation();

  const current = location.pathname.split("/").pop();
  const isActive = current === to;

  return (
    <Link
      to={to}
      className={`flex items-center gap-1 cursor-pointer ${
        isActive ? "font-bold underline underline-offset-4" : ""
      }`}
    >
      <div className="text-2xl pb-1">•</div>
      <div className="text-[14px]">{label}</div>
    </Link>
  );
}