import type { ButtonProps } from "~/packages/shared/@types/ButtonType";

import Button from "~/packages/shared/src/components/Button/Button";
import {
  useTabs,
  useTab,
} from "~/packages/shared/src/components/Tabs/TabContext";

const Tab = (props: ButtonProps) => {
  const { selected, setSelected, onChange } = useTabs();
  const { index } = useTab();
  const isSelected = props.isActive ?? selected === index;
  const buttonVariant = isSelected ? "secondary" : "primary";

  return (
    <Button
      onClick={(e) => {
        if (props.onClick) {
          props.onClick(e);
        } else if (setSelected) {
          setSelected(index);
        }
      }}
      {...props}
      variant={buttonVariant}
      type="button"
      label={props.label}
      role="tab"
      disabled={props.isDisabled}
      aria-selected={isSelected}
      aria-disabled={props.isDisabled}
    >
      <span>{props.children}</span>
    </Button>
  );
};

export default Tab;
