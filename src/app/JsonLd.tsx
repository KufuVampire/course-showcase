import React from 'react';
import { MOCK_PRODUCTS } from '@/shared/api';

export const JsonLd: React.FC = () => {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: MOCK_PRODUCTS.map((prod, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      item: {
        '@type': 'Course',
        name: prod.title,
        description: prod.description,
        provider: {
          '@type': 'Organization',
          name: 'Практикум.PRO',
          sameAs: 'https://github.com/KufuVampire/course-showcase',
        },
        offers: {
          '@type': 'Offer',
          price: prod.price,
          priceCurrency: 'RUB',
          availability: 'https://schema.org/InStock',
        },
        instructor: {
          '@type': 'Person',
          name: prod.instructor.name,
          jobTitle: prod.instructor.role,
        },
      },
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  );
};
