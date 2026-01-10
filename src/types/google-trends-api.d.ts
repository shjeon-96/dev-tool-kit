// Type declarations for google-trends-api package

declare module "google-trends-api" {
  interface DailyTrendsOptions {
    geo?: string;
    hl?: string;
  }

  interface RealTimeTrendsOptions {
    geo?: string;
    hl?: string;
    category?: string;
  }

  interface InterestOverTimeOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    timezone?: number;
    category?: number;
    property?: "images" | "news" | "youtube" | "froogle";
    granularTimeResolution?: boolean;
  }

  interface InterestByRegionOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    resolution?: "COUNTRY" | "REGION" | "CITY" | "DMA";
  }

  interface RelatedQueriesOptions {
    keyword: string | string[];
    startTime?: Date;
    endTime?: Date;
    geo?: string;
    hl?: string;
    category?: number;
  }

  interface AutoCompleteOptions {
    keyword: string;
    hl?: string;
  }

  /**
   * Get daily trending searches
   * Returns 20 daily trending search results
   */
  function dailyTrends(options: DailyTrendsOptions): Promise<string>;

  /**
   * Get real-time trending stories
   * Returns 13 real-time trending stories
   */
  function realTimeTrends(options: RealTimeTrendsOptions): Promise<string>;

  /**
   * Get interest over time for keywords
   */
  function interestOverTime(options: InterestOverTimeOptions): Promise<string>;

  /**
   * Get interest by region for keywords
   */
  function interestByRegion(options: InterestByRegionOptions): Promise<string>;

  /**
   * Get related queries for a keyword
   */
  function relatedQueries(options: RelatedQueriesOptions): Promise<string>;

  /**
   * Get related topics for a keyword
   */
  function relatedTopics(options: RelatedQueriesOptions): Promise<string>;

  /**
   * Get autocomplete suggestions
   */
  function autoComplete(options: AutoCompleteOptions): Promise<string>;
}
