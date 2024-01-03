import type { dropDownItem } from '@/@types/DropDownType';

import { uuid4 } from '@sentry/utils';

export function DropDownMenu({
  items,
  onClickItem,
}: {
  items: dropDownItem[];
  onClickItem: (item: dropDownItem) => void;
}) {
  return (
    <div className="dropdown-menu">
      {items.map((item) => (
        <div
          key={uuid4()}
          onClick={() => onClickItem(item)}
          className="item-container"
        >
          <img src={item.icon} alt={item.text} />
          <div className="item-details">
            <div>{item.text}</div>
            <small>{item.description}</small>
          </div>
        </div>
      ))}
    </div>
  );
}
