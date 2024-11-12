'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import styles from './docs-menu.module.scss'; // Import the SCSS module

interface DocLink {
  title: string;
  link: string;
}

interface Doc {
  title: string;
  items?: DocLink[]; // Optional nested links
}

interface DocsMenuProps {
  docs: Doc[];
}

const DocsMenu = ({ docs }: DocsMenuProps) => {
  const pathname = usePathname();
  const isActive = (link: string) => pathname === link || pathname.includes(link);

  const renderMenuItems = (items: Doc[]) => {
    return (
      <ul>
        {items.map((doc, index) => (
          <li key={index}>
            <span>{doc.title}</span>
            {doc.items && (
              <ul>
                {doc.items.map((subDoc, subIndex) => {
                  return (
                    <li key={subIndex} className={isActive(subDoc.link) ? styles.active : ''}>
                      {subDoc.link
                        ? (
                            <Link href={`/docs/${subDoc.link}`}>
                              {subDoc.title}
                            </Link>
                          )
                        : (
                            <span>
                              {subDoc.title}
                              {' '}
                              (Link not defined)
                            </span>
                          )}
                    </li>
                  );
                })}
              </ul>
            )}
          </li>
        ))}
      </ul>
    );
  };

  return (
    <nav className={styles.menu}>
      <h2>Documentation</h2>
      {renderMenuItems(docs)}
    </nav>
  );
};

export default DocsMenu;
