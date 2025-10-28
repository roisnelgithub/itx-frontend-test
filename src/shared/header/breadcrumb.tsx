import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator
} from "@/components/ui/breadcrumb";

import { useBreadcrumb } from "@/contexts/breadcrumb.context";
import { formatPath } from "@/utils/format-url";

const DynamicBreadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);
  const { labels } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to="/">Products</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {pathnames.map((value, index) => {
          const isLast = index === pathnames.length - 1;
          const to = "/" + pathnames.slice(0, index + 1).join("/");

          const label = labels[to] || formatPath(value);

          return (
            <React.Fragment key={to}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={to}>{label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );

};

export default DynamicBreadcrumbs;
