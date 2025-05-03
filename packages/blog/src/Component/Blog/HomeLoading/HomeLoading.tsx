import Flex from "~/packages/shared/src/components/Flex/Flex";
import Skeleton from "~/packages/shared/src/components/Skeleton/Skeleton";

export default function BlogHomeLoading() {
  return (
    <>
      <Flex width={"68%"} margin={"15px auto"}>
        <Skeleton.Text width={300} height={32} />
      </Flex>

      <main>
        {Array.from({ length: 20 }).map((_, index) => (
          <Skeleton.Card key={index} />
        ))}
      </main>
    </>
  );
}
