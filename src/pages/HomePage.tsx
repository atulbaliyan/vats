import React from 'react';
import { CinematicHero } from '../components/home/CinematicHero';
import { CategoryGrid } from '../components/home/CategoryGrid';
import { TrendingProducts } from '../components/home/TrendingProducts';
import { BrandStory } from '../components/home/BrandStory';
import { FeaturedCampaign } from '../components/home/FeaturedCampaign';
import { TeamwearBanner } from '../components/home/TeamwearBanner';
import { Newsletter } from '../components/home/Newsletter';

export const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col">
      {/* 1. Cinematic Hero Section */}
      <CinematicHero />

      {/* 2. Shop by Category */}
      <CategoryGrid />

      {/* 3. Trending Now Product Grid */}
      <TrendingProducts />

      {/* 4. Brand Editorial Storytelling */}
      <BrandStory />

      {/* 5. Featured Campaign "The Everyday Athlete" */}
      <FeaturedCampaign />

      {/* 6. Teamwear & Custom Academy Orders */}
      <TeamwearBanner />

      {/* 7. Newsletter Subscription */}
      <Newsletter />
    </div>
  );
};
