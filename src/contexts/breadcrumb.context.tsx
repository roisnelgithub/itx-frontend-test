import React, { createContext, useContext, useEffect, useState } from "react";

interface IBreadcrumbDynamicLabels {
  [path: string]: string;
}

interface IBreadcrumbContextType {
  labels: IBreadcrumbDynamicLabels;
  setLabel: (path: string, label: string) => void;
}

const BreadcrumbContext = createContext<IBreadcrumbContextType | null>(null);

export const BreadcrumbProvider = ({ children }: { children: React.ReactNode }) => {
  const [labels, setLabels] = useState<IBreadcrumbDynamicLabels>(() => {
    try {
      const saved = localStorage.getItem("breadcrumb-labels");
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    localStorage.setItem("breadcrumb-labels", JSON.stringify(labels));
  }, [labels]);

  const setLabel = (path: string, label: string) => {
    setLabels(prev => {
      if (prev[path] === label) return prev;
      return { ...prev, [path]: label };
    });
  };

  return (
    <BreadcrumbContext.Provider value={{ labels, setLabel }}>
      {children}
    </BreadcrumbContext.Provider>
  );
};

export const useBreadcrumb = () => {
  const ctx = useContext(BreadcrumbContext);
  if (!ctx) throw new Error("useBreadcrumb must be used within <BreadcrumbProvider>");
  return ctx;
};
