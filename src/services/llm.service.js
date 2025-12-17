async function generateAnswer(context, query) {
  return `
Answer based on news context:

${context.slice(0, 500)}

User question: ${query}
`;
}

module.exports = { generateAnswer };