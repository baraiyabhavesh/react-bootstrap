/**
 * Safe string utility functions to prevent errors when values are undefined/null
 */

/**
 * Safely checks if a string includes a substring
 * @param {string|undefined|null} str - The string to check
 * @param {string} searchString - The substring to search for
 * @returns {boolean} - True if string includes searchString, false otherwise
 */
export function safeIncludes(str, searchString) {
  if (!str || typeof str !== "string") return false;
  return str.includes(searchString);
}

/**
 * Safely checks if a string starts with a substring
 * @param {string|undefined|null} str - The string to check
 * @param {string} searchString - The substring to search for
 * @returns {boolean} - True if string starts with searchString, false otherwise
 */
export function safeStartsWith(str, searchString) {
  if (!str || typeof str !== "string") return false;
  return str.startsWith(searchString);
}

/**
 * Safely checks if a string ends with a substring
 * @param {string|undefined|null} str - The string to check
 * @param {string} searchString - The substring to search for
 * @returns {boolean} - True if string ends with searchString, false otherwise
 */
export function safeEndsWith(str, searchString) {
  if (!str || typeof str !== "string") return false;
  return str.endsWith(searchString);
}

/**
 * Safely replaces a substring in a string
 * @param {string|undefined|null} str - The string to process
 * @param {string} searchValue - The substring to replace
 * @param {string} replaceValue - The replacement string
 * @returns {string} - The replaced string, or empty string if input is invalid
 */
export function safeReplace(str, searchValue, replaceValue) {
  if (!str || typeof str !== "string") return "";
  return str.replace(searchValue, replaceValue);
}

