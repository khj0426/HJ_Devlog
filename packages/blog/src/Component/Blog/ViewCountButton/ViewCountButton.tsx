import IconButton from "@hj-devlog/shared/src/components/IconButton/IconButton";
import { Eye } from "@hj-devlog/shared/libraryies/icon";
import styled from "styled-components";
import useIsDarkMode from "~/src/hooks/useIsDarkMode";

const StyledViewCountButtonContainer = styled.div`
  color: ${({ theme }) => theme.currentTheme.text};
  display: inline;
  font-weight: 400;
`;

const ViewCountButton = ({ viewCount }: { viewCount: number }) => {
  const { isDarkMode } = useIsDarkMode();
  return (
    <StyledViewCountButtonContainer>
      <IconButton
        label={viewCount + ""}
        icon={<Eye width={100} height={25} />}
        style={{
          border: "none",
          fontWeight: "400",
          color: isDarkMode ? "#fafafa" : "#495057",
        }}
      ></IconButton>
    </StyledViewCountButtonContainer>
  );
};

export default ViewCountButton;
