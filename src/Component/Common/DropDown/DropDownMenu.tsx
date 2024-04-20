import type { dropDownItem } from '@/@types/DropDownType';

import { uuid4 } from '@sentry/utils';

export default function DropDownMenu({
  items,
  onClickItem,
  onKeyDown,
}: {
  items: dropDownItem[];
  onClickItem: (item?: dropDownItem) => void;
  onKeyDown?: () => void;
}) {
  return (
    <div className="dropdown-menu">
      {items.map((item, index) => (
        <div
          data-id={item.id}
          tabIndex={index}
          key={item.id}
          onKeyDown={() => onKeyDown && onKeyDown()}
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
