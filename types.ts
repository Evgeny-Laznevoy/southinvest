import React from 'react';

export interface PropertyCard {
  id: string;
  title: string;
  image: string;
  location: string;
  category: string; // Filter key (e.g., 'crimea', 'sochi')
  priceStart: string;
  yield: string;
  size?: string; // e.g. "col-span-2" for grid layout
}

export interface StatItem {
  value: string;
  label: string;
  description: string;
}

export interface ServiceItem {
  title: string;
  description: string;
  icon: React.ElementType;
}