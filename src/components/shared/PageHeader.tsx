import { LucideIcon } from "lucide-react";

type PageHeaderProps = {
  title: string;
  icon: LucideIcon;
};

export default function PageHeader({ title, icon: Icon }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3">
      <Icon className="w-6 h-6 text-primary" />
      <h1 className="text-2xl font-bold text-dark-1">{title}</h1>
    </div>
  );
}
