/** @type {import('jest').Config} */
module.exports = {
  // No usamos preset de RN ni Expo para este objetivo
  testEnvironment: 'node',

  // Solo vamos a ejecutar tests en la carpeta simple-tests
  testMatch: ['**/tests/**/*.test.[jt]s?(x)'],

  // Ignora absolutamente todo lo demás
  testPathIgnorePatterns: ['/node_modules/'],
  transformIgnorePatterns: ['/node_modules/'],
};