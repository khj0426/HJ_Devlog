interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  variant?: "primary" | "secondary" | "transparent";
  size?: "small" | "medium" | "large";
  label?: string;
  icon?: React.ReactNode;
  style?: React.CSSProperties;
}
import Button from "../Button/Button";
import Flex from "../Flex/Flex";

interface IconButtonProps extends ButtonProps {
  icon: React.ReactNode;
}
export default function IconButton(props: IconButtonProps) {
  const {
    variant = "transparent",
    icon,
    size = "small",
    style,
    ...rest
  } = props;

  return (
    <Flex alignItems="center" flexDirection="row">
      <Button
        variant={variant}
        size={size}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "5px",
          ...style,
        }}
        label={props.label ?? ""}
        {...rest}
      >
        <i>{icon}</i>
      </Button>
    </Flex>
  );
}
