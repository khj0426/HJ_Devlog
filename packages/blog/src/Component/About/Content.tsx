export default function Content({ content }: { content: string | string[] }) {
    return (
        <section
            style={{
                display: 'flex',
                minWidth: '300px',
                maxWidth: '400px',
                fontSize: '15px',
                flexDirection: 'column',
            }}
        >
            {Array.isArray(content) ? content.map((eachContent) => <p key={eachContent}>{eachContent}</p>) : <p key={content}>{content}</p>}
        </section>
    )
}
