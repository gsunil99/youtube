export const API_KEY = 'AIzaSyBTHW_PQ6Vox7aTMmcrCWTnQqfaTZA5d9Y';
export const valueConverter = (value) => {
  if (value > 1000000) return Math.floor(value / 1000000) + 'M';
  if (value > 1000) return Math.floor(value / 1000) + 'K';
  return value;
};
