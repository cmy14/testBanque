module.exports = {
  moduleNameMapper: {
    '^src/(.*)': '<rootDir>/src/$1', // Pour les imports absolus (src/)
  },
  testEnvironment: 'node',
};
