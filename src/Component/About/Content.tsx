import styled from 'styled-components';

const StyledContent = styled.section`
  display: flex;
  min-width: 300px;
  min-height: 400px;
  max-width: 400px;
  max-height: 500px;
  font-size: 18px;
  flex-direction: column;
`;
export default function Content({ content }: { content: string | string[] }) {
  return (
    <StyledContent>
      {Array.isArray(content) ? (
        content.map((eachContent) => <p key={eachContent}>{eachContent}</p>)
      ) : (
        <p key={content}>{content}</p>
      )}
    </StyledContent>
  );
}
