import { ButtonProps } from "~/packages/blog/src/@types/ButtonType";

import Button from "~/packages/shared/src/components/Button/Button";
import Flex from "~/packages/shared/src/components/Flex/Flex";

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
