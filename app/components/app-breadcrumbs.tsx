import { Link } from "react-router";
import {
    Breadcrumb,
    BreadcrumbList,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbPage,
    BreadcrumbSeparator,
  } from "~/components/ui/breadcrumbs";
 
  
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
                  <BreadcrumbSeparator />
                </>
              )}
            </BreadcrumbItem>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    );
  }