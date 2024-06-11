export default function makeTableOfContent({ children }: { children: string }) {
  return children?.match(/(?:##|###)(.*)/g) ?? [];
}
