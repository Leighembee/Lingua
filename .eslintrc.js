module.exports = {
  "extends": [
  	"fullstack",
    "eslint:recommended",
    "plugin:react/recommended"
  ],
  "parserOptions": {
    "ecmaVersion": 8,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true,
      "experimentalObjectRestSpread": true
    }
  },
  "rules": {
    "semi": [1, "never"],
    "no-console": 0,
    "react/prop-types": 0
  }
}
