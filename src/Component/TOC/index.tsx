import replaceStrWithBlank from '../../../lib/replaceStr';

export default function TOC({ toc }: { toc: string[] }) {
  const TOC = toc.map((eachToc) => {
    const makeTOC = replaceStrWithBlank([eachToc, ['#', '##', '###', '####']]);
    return (
      <li key={eachToc}>
        <div>
          <a href={`#${makeTOC}`} className="tocItem">
            {makeTOC}
          </a>
        </div>
      </li>
    );
  });

  return <ul style={styledTOCList}>{TOC}</ul>;
}

const styledTOCList: React.CSSProperties = {
  position: 'fixed',
  maxWidth: '235px',
  height: 'auto',
  maxHeight: '75vh',
  wordWrap: 'break-word',
  textAlign: 'justify',
  width: '235px',
  marginTop: '100px',
  right: '0',
  opacity: '1',
  fontSize: '15px',
  overflowY: 'scroll',
};
