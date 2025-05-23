import { ReactNode } from "react";

import Image from "next/image";
import styled, { css } from "styled-components";
import { DropDownProps } from "./DropDown";

const StyledDropDownItem = styled.li<{ selected: boolean }>`
  list-style: none;
  padding: 10px 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 10px;

  &:hover {
    background-color: #f5f5f5;
  }

  label {
    margin: 0;
    font-size: 0.875rem;
  }

  p {
    margin: 0;
    color: rgba(0, 0, 0, 0.54);
    font-size: 0.775rem;
  }
`;

const StyledDropDownMenu = styled.div`
  background-color: white;
  width: 320px;
  position: absolute;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.24), 0px 0px 1px rgba(0, 0, 0, 0.24);
  padding: 8px 0;
  border-radius: 4px;
  max-height: 350px;
  overflow-y: scroll;
`;

export default function DropDownMenu({
  items,
  onClickItem,
  onKeyDown,
  children,
  currentSelectedItemIndex,
}: {
  readonly currentSelectedItemIndex?: number;
  readonly children?: ReactNode;
  readonly items: DropDownProps[];
  readonly onClickItem: (_item?: DropDownProps) => void;
  readonly onKeyDown?: () => void;
}) {
  return (
    <StyledDropDownMenu
      onKeyDown={onKeyDown}
      role="listbox"
      tabIndex={0}
      onKeyUp={onKeyDown}
    >
      <ul>
        {items.map((item, index) => (
          <StyledDropDownItem
            tabIndex={0}
            role="option"
            aria-selected={currentSelectedItemIndex === index}
            selected={currentSelectedItemIndex === index}
            key={item.key}
            onClick={() => onClickItem(item)}
          >
            <label>{item.label}</label>
            {item.icon && (
              <Image
                src={item.icon ?? ""}
                alt="avatar"
                width={30}
                height={30}
              />
            )}
            <p>{item.text}</p>
          </StyledDropDownItem>
        ))}
      </ul>
    </StyledDropDownMenu>
  );
}
