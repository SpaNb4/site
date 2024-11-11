import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm'; // For GitHub Flavored Markdown

export async function generateStaticParams() {
  // Fetch the list of available documentation files
  const res = await fetch('https://api.github.com/repos/spanb4/docs/contents/docs');
  const files = await res.json();

  return files
    .filter((file) => file.name.endsWith('.md'))
    .map((file) => ({ slug: file.name.replace('.md', '') }));
}

export default async function DocPage({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const fileUrl = `https://raw.githubusercontent.com/spanb4/docs/master/docs/${slug}.md`;

  try {
    const res = await fetch(fileUrl);

    if (!res.ok) {
      throw new Error('Failed to fetch markdown file');
    }
    const markdownContent = await res.text();

    return (
      <div
        className="markdown-body"
        style={{
          maxWidth: 1200,
          margin: 'auto',
          textAlign: 'left',
        }}
      >
        <h1>{slug.replace(/-/g, ' ')}</h1>
        <ReactMarkdown
          children={markdownContent}
          remarkPlugins={[remarkGfm]} // Use the remark-gfm plugin
        />
      </div>
    );
  } catch (error) {
    notFound(); // Handle errors or 404
  }
}
