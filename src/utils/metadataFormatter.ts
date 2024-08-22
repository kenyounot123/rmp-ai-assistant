function formatMetadata(metadata: any): string {
  return `
  Professor's Information:
  - Number of Ratings: ${metadata.numOfRatings || 'N/A'}
  - Department: ${metadata.profDepartment || 'N/A'}
  - Difficulty: ${metadata.profDifficulty || 'N/A'}
  - Rating Value: ${metadata.profRatingValue || 'N/A'}
  - School: ${metadata.profSchool || 'N/A'}
  `;
}
export { formatMetadata }