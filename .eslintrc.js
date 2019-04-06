module.exports = {
    "env": {
        "es6": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 2018,
        "sourceType": "module",
        "project": "./tsconfig.json"
    },
    "plugins": [
        "@typescript-eslint",
        "promise"
    ],
    "rules": {
        "indent": [
            "error",
            4,
            { "SwitchCase": 1 }
        ],
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": [
            "off"
        ],
        "no-case-declarations": [
          "off"
        ],
        "prefer-const": [
          "error"
        ],
        "arrow-parens": [
          "error",
          "as-needed"
        ],
        "promise/catch-or-return": "error",
        "promise/param-names": "error",
        "promise/no-return-wrap": "error",
        "@typescript-eslint/no-angle-bracket-type-assertion": [ "off" ]
    },
    "overrides": [{
        "files": ["*.json"],
        "rules": {
            "quotes": [
                "error",
                "double"
            ],
            "semi": [
                "error",
                "never"
            ]
        }
    }]
};
