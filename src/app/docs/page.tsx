import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import files from './data.json';

async function fetchDocs() {
  // Fetch the content for index.md
  const indexDoc = files.find((doc) => doc.slug === 'README');
  let indexContent = '';

  if (indexDoc) {
    const indexRes = await fetch(
      `https://raw.githubusercontent.com/spanb4/docs/master/docs/${indexDoc.slug}.md`,
    );

    if (indexRes.ok) {
      indexContent = await indexRes.text();
    }
  }

  return { indexContent };
}

export default async function DocsIndex() {
  const { indexContent } = await fetchDocs();

  return (
    <div
      className="markdown-body"
      style={{
        maxWidth: 1200,
        margin: 'auto',
        textAlign: 'left',
      }}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkToc]} // Use the remark-gfm plugin
        rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
      >
        {indexContent}
      </ReactMarkdown>
    </div>
  );
}
