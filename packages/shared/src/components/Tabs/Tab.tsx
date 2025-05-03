import type { ButtonProps } from '@/@types/ButtonType';

import { useEffect } from 'react';

import Button from '@/Component/Common/Button/Button';
import { useTabs, useTab } from '@/Component/Common/Tabs/TabContext';

const Tab = (props: ButtonProps) => {
  const { selected, setSelected, onChange } = useTabs();
  const { index } = useTab();
  const isSelected = props.isActive ?? selected === index;
  const buttonVariant = isSelected ? 'secondary' : 'primary';

  useEffect(() => {
    if (onChange) {
      onChange(selected);
    }
  }, [onChange, selected]);

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
