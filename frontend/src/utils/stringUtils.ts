export const formatString = (input) =>{
    // Split the string by underscores, capitalize each word, and join with a space
    return input
      .split('_')                // Split by underscore
      .map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() // Capitalize each word
      )
      .join(' ');                 // Join words with a space
}