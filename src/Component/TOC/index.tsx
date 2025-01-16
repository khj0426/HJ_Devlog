"use client";

import { memo } from "react";

import { uuid4 } from "@sentry/utils";
import styled from "styled-components";

import useTableOfContent from "@/hooks/useTableOfContent";
import replaceStrWithBlank from "~/lib/replaceStr";

const StyledTOCList = styled.ul`
  position: fixed;
  max-width: 235px;
  height: auto;
  max-height: 75vh;
  overflow-y: hidden;
  word-wrap: break-word;
  text-align: justify;
  width: 235px;
  margin-top: 100px;
  right: 0;
  opacity: 1;
  font-size: 15px;
  list-style-type: none;

  @media ${({ theme }) => theme.device.laptop} {
    opacity: 0;
  }

  @media ${({ theme }) => theme.device.tablet} {
    opacity: 0;
  }

  @media ${({ theme }) => theme.device.mobile} {
    opacity: 0;
  }
`;

const StyledTOCLink = styled.a`
  &:hover {
    color: rgb(0, 131, 120);
  }

  &:active {
    color: rgb(0, 131, 120);
  }
`;

function TOC({ toc }: { toc: string[] }) {
  const { id, setId } = useTableOfContent();

  const TOC = toc.map((eachToc) => {
    const makeTOC = replaceStrWithBlank([eachToc, ["#", "##", "###", "####"]]);

    const handleClickTOC = (e: React.MouseEvent<HTMLElement>) => {
      e.stopPropagation();
      setId(e.currentTarget.id);
      e.currentTarget.classList.toggle("active");
    };
    return (
      <li key={uuid4()}>
        <div>
          <StyledTOCLink
            className={`${makeTOC} ${id === makeTOC && "active"}`}
            href={`#${makeTOC}`}
            id={makeTOC}
            onClick={handleClickTOC}
          >
            {makeTOC}
          </StyledTOCLink>
        </div>
      </li>
    );
  });

  return <StyledTOCList>{TOC}</StyledTOCList>;
}

export default memo(TOC);
