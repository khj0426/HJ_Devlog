import React from "react";

interface SwitchCaseProps {
  value: string;
  caseBy: {
    [key: string]: React.ReactNode;
  };
  defaultComponent?: React.ReactNode;
}

export const SwitchCase = ({
  value,
  caseBy,
  defaultComponent,
}: SwitchCaseProps) => {
  const ComponentToRender = caseBy[value] || defaultComponent;
  return <>{ComponentToRender}</>;
};
