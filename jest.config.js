export default {
  collectCoverage: true,
  moduleNameMapper: {
    "\\.(css|less|sass|scss)$": "identity-obj-proxy",
  },
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  collectCoverageFrom: [
    "src/hooks/useProduct.js",
    "src/App.jsx",
    "src/main.jsx",
  ],
  coverageDirectory: "coverage",
  coveragePathIgnorePatterns: [
    "/node_modules/",
    "/config",
    "/Helpers/security.util.js",
    "/Controllers/authorization.controller.js",
    "/Controllers/security.controller.js",
    "/Services/authorization.service.js",
  ],
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["@testing-library/jest-dom"],
};
