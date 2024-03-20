const { Builder, By, Key, Capabilities } = require("selenium-webdriver");
require("geckodriver");
const assert = require('chai').assert;

describe("Selenium Tests", function () {
  it("should add a note and display on the page", async function () {
    // Set up Selenium WebDriver with Firefox in headless mode
    const firefoxCapabilities = Capabilities.firefox();
    firefoxCapabilities.set('moz:firefoxOptions', { args: ['-headless'] });
    const driver = new Builder().withCapabilities(firefoxCapabilities).build();

    try {
      // Open the local website
      await driver.get("http://localhost:3000");

      // Find the search box and enter a note
      await driver.findElement(By.xpath('//*[@id="new-item"]/input'))
                  .sendKeys("Hello Selenium", Key.RETURN);

      // Get the note's text
      let note = await driver.findElement(By.xpath('//*[@id="items"]/div/p'))
                            .getText();

      // Assert that the note's text is the same as the input text "Hello Selenium"
      assert.strictEqual(note, "Hello Selenium");
      console.log("TEST PASSED");

    } finally {
      // Close the browser
      await driver.quit();
    }
  });
});
