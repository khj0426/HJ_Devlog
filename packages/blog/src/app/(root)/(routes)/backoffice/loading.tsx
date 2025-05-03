import Flex from "~/packages/shared/src/components/Flex/Flex";
import Spinner from "~/packages/shared/src/components/Spinner/Spinner";
export default function BackOfficeLoading() {
  return (
    <Flex
      alignItems="center"
      flexDirection="column"
      width={"100%"}
      height={"100vh"}
    >
      <Spinner />
    </Flex>
  );
}
