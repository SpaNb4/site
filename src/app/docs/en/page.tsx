import { DocsLayout } from '../components/docs-layout/docs-layout';

async function fetchDocs() {
  const indexDoc = 'README';

  let indexContent = '';

  if (indexDoc) {
    const indexRes = await fetch(
      `https://raw.githubusercontent.com/spanb4/docs/master/docs/en/${indexDoc}.md`,
    );

    if (indexRes.ok) {
      indexContent = await indexRes.text();
    }
  }

  const data = await fetch('https://raw.githubusercontent.com/SpaNb4/docs/refs/heads/master/docs/en/docsMenu_en.json');
  const docsMenu = await data.json();

  return {
    indexContent,
    docsMenu,
  };
}

export default async function DocsIndex() {
  const { indexContent, docsMenu } = await fetchDocs();

  return <DocsLayout menu={docsMenu} markdownContent={indexContent} lang="en" />;
}
