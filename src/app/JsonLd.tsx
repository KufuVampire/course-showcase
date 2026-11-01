import type { Product } from '@/shared/api';

export interface JsonLdProps {
  products: Product[];
}

export function JsonLd({ products }: JsonLdProps) {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((prod, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Course',
        name: prod.title,
        description: prod.description,
        provider: {
          '@type': 'Organization',
          name: 'Практикум.PRO',
          sameAs: 'https://praktikum-pro.dev',
        },
        offers: {
          '@type': 'Offer',
          price: prod.price,
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
        },
        hasCourseInstance: {
          '@type': 'CourseInstance',
          courseMode: 'online',
          courseWorkload: `PT${prod.durationHours}H`,
        },
        instructor: {
          '@type': 'Person',
          name: prod.instructor.name,
          jobTitle: prod.instructor.role,
        },
      },
    })),
  };

  const safeJson = JSON.stringify(schemaData).replace(/</g, '\\u003c');

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: safeJson }} />;
}
