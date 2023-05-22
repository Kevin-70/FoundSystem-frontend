const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },reporter: 'mochawesome',
  reporterOptions: {
      reportDir: 'tests/e2e/results' // 指定生成测试报告的位置，相对cypress.config.js文件的位置
  }
});
