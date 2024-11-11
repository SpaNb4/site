import Link from 'next/link';

export default async function DocsIndex() {
  // Fetch the list of available documentation files
  const res = await fetch('https://api.github.com/repos/spanb4/docs/contents/docs');
  const files = await res.json();

  // Filter and map the markdown files
  const docs = files
    .filter((file) => file.name.endsWith('.md'))
    .map((file) => ({
      slug: file.name.replace('.md', ''),
      title: file.name.replace('.md', '').replace(/-/g, ' '),
    }));

  return (
    <div>
      <h1>Documentation</h1>
      <nav>
        <ul>
          {docs.map((doc) => (
            <li key={doc.slug}>
              <Link href={`/docs/${doc.slug}`}>{doc.title}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
