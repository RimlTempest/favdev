// lighthouse ciの設定
const paths = ['/', '/about']

const url = paths.map((path) => `http://localhost:3000${path}`)

module.exports = {
  "ci": {
    "collect": {
      "numberOfRuns": 3,
      "startServerCommand": "yarn dx",
      url
    },
    "assert": {
      "preset": "lighthouse:recommended",
      "assertions": {
        "offscreen-images": "off",
        "uses-webp-images": "off"
        // パフォーマンスの最低スコアを設定
        // "categories:performance": ["warn", { "minScore": 0.9 }],
        // "categories:accessibility": ["error", { "minScore": 1 }]
      }
    },
    "upload": {
      "target": "temporary-public-storage"
    }
  }
}
