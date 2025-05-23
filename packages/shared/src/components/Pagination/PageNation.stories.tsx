import type { Meta, StoryObj } from "@storybook/react";

import usePageNation from "~/packages/shared/src/hooks/usePagenation";

import Pagination from "./Pagination";
const PageNationExample = () => {
  const { changePage, pageCount, pageData } = usePageNation({
    limit: 5,
    item: [
      "아이템1",
      "아이템2",
      "아이템3",
      "아이템4",
      "아이템5",
      "아이템11",
      "아이템21",
      "아이템31",
      "아이템41",
      "아이템51",
    ],
  });

  return (
    <div>
      {pageData().map((item) => (
        <div key={item}>{item}</div>
      ))}
      <Pagination
        numPages={pageCount}
        handleOnClickPage={(page) => changePage(page)}
      />
    </div>
  );
};

const meta: Meta<typeof Pagination> = {
  title: "Component/PageNation",
  component: PageNationExample,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;
type Story = StoryObj<typeof Pagination>;

export const DefaultPageNation: Story = {
  args: {
    numPages: 5,
  },
};
