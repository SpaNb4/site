'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BurgerMenu } from '@/core/base-layout/components/header/burger/burger';
import { Language } from '@/shared/types';

import styles from './docs-menu.module.scss';

interface DocLink {
  title: string;
  link: string;
}

interface DocLinkWithChildren {
  title: string;
  items: DocLink[];
}

export type DocLinkType = DocLink | DocLinkWithChildren;

interface DocsMenuProps {
  menu: DocLinkType[];
  lang: Language;
}

const DocsMenu = ({ menu, lang }: DocsMenuProps) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const isActive = (link: string) => pathname.endsWith(link);

  return (
    <>
      <BurgerMenu isMenuOpen={isOpen} toggleMenu={() => setIsOpen(!isOpen)} />
      <nav className={`${styles.menu} ${isOpen ? styles.open : ''}`}>
        <ul>
          {menu.map((doc, index) => {
            if ('items' in doc) {
              return (
                <li key={index}>
                  <>
                    <span>{doc.title}</span>
                    <ul>
                      {doc.items.map((subDoc, subIndex) => {
                        return (
                          <li key={subIndex}>
                            <Link
                              href={`/docs/${lang}/${subDoc.link}`}
                              className={isActive(subDoc.link) ? styles.active : ''}
                            >
                              {subDoc.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </>
                </li>
              );
            } else {
              return (
                <li key={index}>
                  <Link
                    href={`/docs/${lang}/${doc.link}`}
                    className={isActive(doc.link) ? styles.active : ''}
                  >
                    {doc.title}
                  </Link>
                </li>
              );
            }
          })}
        </ul>
      </nav>
    </>
  );
};

export default DocsMenu;
