import Button from "../Button/Button";

export default function Trigger({
  label,
  onClick,
}: {
  readonly label: string;
  readonly onClick: () => void;
}) {
  return <Button label={label} tabIndex={0} onClick={onClick}></Button>;
}
