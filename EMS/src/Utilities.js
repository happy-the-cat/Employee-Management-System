// Functions

/*
 * Convert hex colors (3 & 6 chars) to RGB.
 * (c) https://stackoverflow.com/a/39077686
 * @param {String} A hex color value (3 or 6 chars, w/ or without #)
 * @return {String} Returns a string of r, g, b
 * */
const hexToRgb = hex =>
  hex
    .replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (m, r, g, b) => '#' + r + r + g + g + b + b,
    )
    .substring(1)
    .match(/.{2}/g)
    .map(x => parseInt(x, 16))
    .toString();

/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value (3 or 6 chars)
 * @return {String} The contrasting color (black or white)
 */
const getContrast = function (hexcolor) {
  // If a leading # is provided, remove it
  if (hexcolor.slice(0, 1) === '#') {
    hexcolor = hexcolor.slice(1);
  }
  // If a three-character hexcode, make six-character
  if (hexcolor.length === 3) {
    hexcolor = hexcolor
      .split('')
      .map(function (hex) {
        return hex + hex;
      })
      .join('');
  }
  // Convert to RGB value
  const r = parseInt(hexcolor.substr(0, 2), 16);
  const g = parseInt(hexcolor.substr(2, 2), 16);
  const b = parseInt(hexcolor.substr(4, 2), 16);
  // Get YIQ ratio
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  // Check contrast
  return yiq >= 128 ? 'black' : 'white';
};

/*
 * Remove duplicates from array object.
 * (c) https://dev.to/pixari/what-is-the-best-solution-for-removing-duplicate-objects-from-an-array-4fe1
 * @param {Array} The object array or normal array to be filtered
 * @return {Array} An array with same but filtered contents
 * */
const removeDuplicatesFromArray = arr =>
  [...new Set(arr.map(element => JSON.stringify(element)))].map(e =>
    JSON.parse(e),
  );

/*
 * Filter array of duplicates of a particular key
 * (c) https://dev.to/pixari/what-is-the-best-solution-for-removing-duplicate-objects-from-an-array-4fe1
 * @param {Array} The object array to be filtered
 * @param {String} A string of the key to be used as basis for searching duplicates
 * @return {Array} The filtered array
 * */
const filterArrayWithKey = (array, key) => array.filter(by(key), new Set());
const by = property => {
  const set = new Set();
  return obj => !(set.has(obj[property]) || !set.add(obj[property]));
};

export {hexToRgb, getContrast, removeDuplicatesFromArray, filterArrayWithKey};
