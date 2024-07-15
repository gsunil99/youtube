export const API_KEY = 'AIzaSyDz-Cm4KCTWiGswv7ljRoPuE1omtjurbAY';
export const valueConverter = (value) => {
  if (value > 1000000) return Math.floor(value / 1000000) + 'M';
  if (value > 1000) return Math.floor(value / 1000) + 'K';
  return value;
};
