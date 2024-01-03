import React from 'react';

// 사용자 클릭을 처리하는 부분을 드롭다운에서 추출
export default function Trigger({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <div className="trigger" tabIndex={0} onClick={onClick}>
      <span className="selection">{label}</span>
    </div>
  );
}
