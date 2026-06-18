import type { TrendCategory } from "@/shared/types/trend";

export interface TrendItemImage {
  src: string;
  alt: string;
  prompt: string;
}

interface TrendItemImageInput {
  id: string;
  name: string;
  category: TrendCategory;
}

export function createTrendItemImage({
  category,
  id,
  name,
}: TrendItemImageInput): TrendItemImage {
  return {
    src: `/images/trend-battle/generated/${id}.webp`,
    alt: createImageAlt(name, category),
    prompt: createImagePrompt(name, category),
  };
}

function createImageAlt(name: string, category: TrendCategory) {
  switch (category) {
    case "country_population":
      return `${name} realistic landmark image`;
    case "city_population":
      return `${name} realistic city image`;
    case "movie_box_office":
      return `${name} cinematic generated image without logos or text`;
    case "animal_speed":
      return `${name} realistic wildlife image`;
    case "mountain_height":
      return `${name} realistic mountain image`;
  }
}

function createImagePrompt(name: string, category: TrendCategory) {
  const shared =
    "No text, no logos, no UI, no watermark. Landscape 16:9 mobile game card crop, realistic lighting, clear center subject, high detail.";

  switch (category) {
    case "country_population":
      return `Photorealistic editorial travel image representing ${name}. Show a real, recognizable landmark, skyline, or landscape strongly associated with ${name}; avoid generic flags or map graphics. ${shared}`;
    case "city_population":
      return `Photorealistic editorial travel image of ${name}. Show a recognizable real cityscape, landmark, skyline, or street-level urban view strongly associated with ${name}; avoid generic city imagery. ${shared}`;
    case "movie_box_office":
      return `Photorealistic cinematic scene inspired by the movie "${name}" for a box office quiz card, without using actor likenesses, copyrighted characters, posters, title text, logos, or exact branded designs. Capture the genre and atmosphere in an original scene. ${shared}`;
    case "animal_speed":
      return `Photorealistic wildlife image of ${name}. Show the real animal clearly in a natural habitat, preferably in motion when appropriate. Avoid illustration, mascot style, text, or fantasy elements. ${shared}`;
    case "mountain_height":
      return `Photorealistic editorial landscape image of ${name}. Show the real mountain or a realistic high-altitude view strongly associated with ${name}, with snow, rock, scale, and atmospheric depth. ${shared}`;
  }
}
