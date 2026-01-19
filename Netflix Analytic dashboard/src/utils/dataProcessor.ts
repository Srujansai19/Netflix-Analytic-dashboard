/**
 * Netflix Data Processor
 * 
 * Why use React instead of Power BI embed?
 * 1. Full UI/UX control - custom animations, interactions, and styling
 * 2. No iframe limitations - seamless integration with your app
 * 3. Real-time interactivity - hover effects, focus states, custom behaviors
 * 4. Performance optimization - only load and render what's needed
 * 5. No licensing costs - open source solution
 * 6. Custom data processing - transform data exactly as needed
 */

import netflixData from '../data/netflix.json';

export interface NetflixTitle {
  show_id: string;
  type: 'Movie' | 'TV Show';
  title: string;
  director: string;
  country: string;
  date_added: string;
  release_year: number;
  rating: string;
  duration: string;
  listed_in: string;
}

export interface KPIData {
  totalTitles: number;
  totalRatings: number;
  totalGenres: number;
  startYear: number;
  endYear: number;
  totalCountries: number;
}

export interface GenreData {
  name: string;
  value: number;
}

export interface RatingData {
  rating: string;
  count: number;
}

export interface TypeData {
  name: string;
  value: number;
  fill: string;
}

export interface CountryData {
  country: string;
  count: number;
}

export interface YearTrendData {
  year: number;
  movies: number;
  tvShows: number;
  total: number;
}

// Get all titles from the dataset
export const getTitles = (): NetflixTitle[] => {
  return netflixData.titles as NetflixTitle[];
};

// Calculate KPI metrics
export const getKPIData = (): KPIData => {
  const titles = getTitles();
  
  const uniqueRatings = new Set(titles.map(t => t.rating).filter(Boolean));
  const uniqueGenres = new Set(
    titles.flatMap(t => t.listed_in.split(', ').map(g => g.trim()))
  );
  const uniqueCountries = new Set(
    titles.flatMap(t => t.country.split(', ').map(c => c.trim())).filter(Boolean)
  );
  const years = titles.map(t => t.release_year).filter(Boolean);
  
  return {
    totalTitles: titles.length,
    totalRatings: uniqueRatings.size,
    totalGenres: uniqueGenres.size,
    startYear: Math.min(...years),
    endYear: Math.max(...years),
    totalCountries: uniqueCountries.size,
  };
};

// Get genres by total titles
export const getGenreData = (): GenreData[] => {
  const titles = getTitles();
  const genreCounts: Record<string, number> = {};
  
  titles.forEach(title => {
    const genres = title.listed_in.split(', ').map(g => g.trim());
    genres.forEach(genre => {
      genreCounts[genre] = (genreCounts[genre] || 0) + 1;
    });
  });
  
  return Object.entries(genreCounts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 10);
};

// Get ratings distribution
export const getRatingData = (): RatingData[] => {
  const titles = getTitles();
  const ratingCounts: Record<string, number> = {};
  
  titles.forEach(title => {
    if (title.rating) {
      ratingCounts[title.rating] = (ratingCounts[title.rating] || 0) + 1;
    }
  });
  
  return Object.entries(ratingCounts)
    .map(([rating, count]) => ({ rating, count }))
    .sort((a, b) => b.count - a.count);
};

// Get Movies vs TV Shows distribution
export const getTypeData = (): TypeData[] => {
  const titles = getTitles();
  const movies = titles.filter(t => t.type === 'Movie').length;
  const tvShows = titles.filter(t => t.type === 'TV Show').length;
  
  return [
    { name: 'Movies', value: movies, fill: 'hsl(357, 91%, 47%)' },
    { name: 'TV Shows', value: tvShows, fill: 'hsl(357, 70%, 55%)' },
  ];
};

// Get top countries by titles
export const getCountryData = (): CountryData[] => {
  const titles = getTitles();
  const countryCounts: Record<string, number> = {};
  
  titles.forEach(title => {
    const countries = title.country.split(', ').map(c => c.trim()).filter(Boolean);
    countries.forEach(country => {
      countryCounts[country] = (countryCounts[country] || 0) + 1;
    });
  });
  
  return Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);
};

// Get titles by release year trend
export const getYearTrendData = (): YearTrendData[] => {
  const titles = getTitles();
  const yearData: Record<number, { movies: number; tvShows: number }> = {};
  
  titles.forEach(title => {
    const year = title.release_year;
    if (year) {
      if (!yearData[year]) {
        yearData[year] = { movies: 0, tvShows: 0 };
      }
      if (title.type === 'Movie') {
        yearData[year].movies++;
      } else {
        yearData[year].tvShows++;
      }
    }
  });
  
  return Object.entries(yearData)
    .map(([year, data]) => ({
      year: parseInt(year),
      movies: data.movies,
      tvShows: data.tvShows,
      total: data.movies + data.tvShows,
    }))
    .sort((a, b) => a.year - b.year)
    .filter(d => d.year >= 2010);
};
