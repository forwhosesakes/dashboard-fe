import { Link } from "react-router";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "~/components/ui/breadcrumbs";
  import { ChevronLeft } from "lucide-react"
 
  
  interface BreadcrumbsProps {
    items: {
      label: string;
      href?: string;
    }[];
  }
  
  export function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          {items.map((item, index) => (
            <BreadcrumbItem key={index}>
              {index === items.length - 1 ? (
                <BreadcrumbPage>{item.label}</BreadcrumbPage>
              ) : (
                <>
                  <BreadcrumbLink asChild>
                    <Link to={item.href ?? '#'}>{item.label}</Link>
                  </BreadcrumbLink>
                  <ChevronLeft  className="max-w-4 max-h-4"/>
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }