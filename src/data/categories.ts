export const categories = [
  'FPS',
  'RPG',
  'MOBA',
  'Strategy',
  'Battle Royale',
  'Simulation',
  'Sports',
  'Adventure',
  'Racing',
  'Fighting',
  'IRL',
  'ASMR',
  'Music',
  'Just Chatting',
  'Art',
  'Podcast',
  'Cooking',
];

export const getUniqueStreamTags = (tags: string[][]): string[] => {
  const allTags = tags.flat();
  return [...new Set(allTags)];
}; 