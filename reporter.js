const report = require("multiple-cucumber-html-reporter");
const fs = require("fs");

report.generate({
    jsonDir: "./cypress/cucumberReports",
    reportPath: "./cypress/cucumberReports/cucumber-htmlreport.html",
    metadata: {
        browser: {
            name: "chrome",
            version: 1.0,
        },
        device: "Local test machine",
        platform: {
            name: "macos",
        },
    },
    reportName: "GD Report",
    customData: {
        title: "Run info",
        data: [
            { label: "Project", value: "GD-Cypress-Cucumber" },
            { label: "Environment", value: "Local" },

        ],
    },
});