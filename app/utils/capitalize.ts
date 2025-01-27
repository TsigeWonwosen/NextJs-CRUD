export function capitalizeTitle(title: string) {
  return title
    .toLowerCase() // Convert the entire string to lowercase first
    .split(" ") // Split the string into an array of words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize the first letter of each word
    .join(" "); // Join the words back into a single string
}
