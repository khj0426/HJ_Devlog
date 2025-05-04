import { ComponentProps } from "react";
import Flex from "../Flex/Flex";
import Divider from "../Divider/Divider";

interface ItemListProps<T> extends ComponentProps<typeof Flex> {
  data: T[];
  renderItem: (_data: T) => JSX.Element;
  hasDivider?: boolean;
  direction?: "row" | "column";
}

export default function ItemList<T>({
  data,
  renderItem,
  hasDivider = false,
  direction = "column",
  ...rest
}: ItemListProps<T>) {
  switch (direction) {
    case "column":
      return (
        <Flex flexDirection="column" {...rest}>
          {data.map((eachData, index) => {
            return (
              <div
                key={index}
                style={{
                  width: "100%",
                }}
              >
                <Flex>{renderItem(eachData)}</Flex>
                {hasDivider && <Divider length={"100%"} thickness={"2px"} />}
              </div>
            );
          })}
        </Flex>
      );
    case "row":
      return (
        <Flex justifyContent="row" {...rest}>
          {data.map((eachData, index) => {
            return (
              <Flex gap={"15px"} key={index}>
                <Flex>{renderItem(eachData)}</Flex>
                {hasDivider && index < data.length - 1 && (
                  <Divider
                    length={"1.2rem"}
                    thickness="2px"
                    orientation="vertical"
                  />
                )}
              </Flex>
            );
          })}
        </Flex>
      );
  }
}
