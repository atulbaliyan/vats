export interface NavCategory {
  title: string;
  href: string;
  badge?: string;
  sections?: {
    heading: string;
    items: { label: string; href: string; tag?: string }[];
  }[];
  featuredPromo?: {
    title: string;
    subtitle: string;
    cta: string;
    href: string;
    image: string;
  };
}

export const NAV_LINKS: NavCategory[] = [
  {
    title: 'MEN',
    href: '/men',
    sections: [
      {
        heading: 'Apparel',
        items: [
          { label: 'Shop All Men', href: '/men' },
          { label: 'Performance T-Shirts', href: '/men?sub=T-Shirts' },
          { label: 'Track Pants & Joggers', href: '/men?sub=Track%20Pants', tag: 'Popular' },
          { label: 'Running & Training Shorts', href: '/men?sub=Shorts' },
          { label: 'Tech Fleece Hoodies', href: '/men?sub=Hoodies' },
        ],
      },
      {
        heading: 'By Activity',
        items: [
          { label: 'Gym & Cross-Training', href: '/sports?sport=Training' },
          { label: 'Road & Trail Running', href: '/sports?sport=Running' },
          { label: 'Cricket Performance', href: '/sports?sport=Cricket' },
          { label: 'Lifestyle Streetwear', href: '/collections' },
        ],
      },
    ],
    featuredPromo: {
      title: 'PRO AERODRY 2.0',
      subtitle: 'Engineered moisture vapor dispersion',
      cta: 'Explore Men',
      href: '/men',
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    title: 'WOMEN',
    href: '/women',
    sections: [
      {
        heading: 'Apparel',
        items: [
          { label: 'Shop All Women', href: '/women' },
          { label: 'High-Rise Sculpt Leggings', href: '/women?sub=Leggings', tag: 'Best Seller' },
          { label: 'Seamless Sports Bras', href: '/women?sub=Sports%20Bra' },
          { label: 'Cropped Athletic Tees', href: '/women?sub=T-Shirts' },
          { label: 'Lightweight Outerwear', href: '/women?sub=Jackets' },
        ],
      },
      {
        heading: 'Featured Collections',
        items: [
          { label: 'Seamless Movement Series', href: '/women' },
          { label: 'Endurance Running Essentials', href: '/sports?sport=Running' },
          { label: 'Studio & Yoga Flow', href: '/sports?sport=Gym%20%26%20Fitness' },
        ],
      },
    ],
    featuredPromo: {
      title: 'SCULPT COMPRESSION',
      subtitle: '100% squat-proof seamless performance',
      cta: 'Shop Women',
      href: '/women',
      image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    title: 'SPORTS',
    href: '/sports',
    sections: [
      {
        heading: 'Field & Pitch',
        items: [
          { label: 'Cricket Match & Training', href: '/sports?sport=Cricket', tag: 'Hot' },
          { label: 'Football & Futsal', href: '/sports?sport=Football' },
          { label: 'Badminton & Racket', href: '/sports' },
        ],
      },
      {
        heading: 'Fitness & Conditioning',
        items: [
          { label: 'Weightlifting & Gym', href: '/sports?sport=Training' },
          { label: 'Marathon & Speed Running', href: '/sports?sport=Running' },
          { label: 'High-Intensity Interval Training', href: '/sports?sport=Training' },
        ],
      },
    ],
    featuredPromo: {
      title: 'STRIKE CRICKET GEAR',
      subtitle: 'Breathable jacquard UV50+ match kits',
      cta: 'View Cricket',
      href: '/sports?sport=Cricket',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    title: 'COLLECTIONS',
    href: '/collections',
    sections: [
      {
        heading: 'Drops & Editions',
        items: [
          { label: '"Beyond Limits" Heavyweights', href: '/collections', tag: 'New Drop' },
          { label: 'Velocity Bonded Tech', href: '/collections' },
          { label: 'All Black "Stealth" Capsule', href: '/collections' },
          { label: 'Electric Volt Edition', href: '/collections' },
        ],
      },
    ],
    featuredPromo: {
      title: 'THE EVERYDAY ATHLETE',
      subtitle: 'Gym-heavy architecture meets street luxury',
      cta: 'Explore Capsule',
      href: '/collections',
      image: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80',
    },
  },
  {
    title: 'TEAMWEAR',
    href: '/teamwear',
    badge: 'Custom',
  },
];
