import { Breadcrumbs } from "./app-breadcrumbs";

interface PageHeaderProps {
  title: string;
  description?: string;
  breadcrumbs?: {
    label: string;
    href?: string;
  }[];
}

export function PageHeader({ title, description, breadcrumbs }: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-2">
      <h1 className="text-3xl font-bold text-primary-foreground">{title}</h1>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      {breadcrumbs && <Breadcrumbs items={breadcrumbs} />}
    </div>
  );
}