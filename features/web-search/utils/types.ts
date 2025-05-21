export type WebSearchImage = {
  title: string;
  image_url: string;
  context_link: string;
};

export type WebSearchResult = {
  link: string;
  snippet: string;
  images: WebSearchImage[];
};

export type WebSearchResults = {
  [title: string]: WebSearchResult;
};

export type WebSearchResponse = {
  query: string;
  results: WebSearchResults;
};

export type YouTubeSearchResult = {
  title: string;
  url: string;
  description?: string;
  thumbnail?: string;
};

export type YouTubeSearchResponse = {
  results: YouTubeSearchResult[];
};

export type CombinedSearchResponse = {
  webSearch: WebSearchResponse;
  youtubeSearch: YouTubeSearchResponse;
};
