import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import remarkToc from 'remark-toc';
import files from '../data.json';


export async function generateStaticParams() {
  // Fetch the list of available documentation files
  // const res = await fetch('https://api.github.com/repos/spanb4/docs/contents/docs');
  // const files = await res.json();
  // console.log(files)
  return files
    .filter((file) => file.name.endsWith('.md'))
    .map((file) => ({ slug: file.name.replace('.md', '') }));
}

export default async function DocPage({ params }: { params: { slug: string } }) {
  const { slug } = await params;
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
          remarkPlugins={[remarkGfm, remarkToc]} // Use the remark-gfm plugin
          rehypePlugins={[rehypeSlug, rehypeAutolinkHeadings]}
        />
      </div>
    );
  } catch (error) {
    notFound(); // Handle errors or 404
  }
}
