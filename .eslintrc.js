module.exports = {
  "extends": "airbnb",
  "env": {
    "browser": false,
    "node": true,
    "es6": true
  },
  "rules": {
    "strict": [0],
    "quotes":[0],
    "semi": [2, "always"],
    "no-param-reassign": [0],
    "no-shadow": [0],
    'no-console': 'off',
    'no-plusplus': 'off',
    "no-unused-expressions": [0],
    "class-methods-use-this": [0],
    "prefer-destructuring": [0],
    "no-underscore-dangle": [0],
    "func-names": [0],
    "import/no-extraneous-dependencies": ["error", {
      "devDependencies": true,
      "optionalDependencies": false,
      "peerDependencies": false
    }]
  }
};
