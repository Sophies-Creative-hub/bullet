const { Builder, By, Key, Capabilities } = require("selenium-webdriver");
require("chromedriver");
const assert = require('chai').assert; // Fügen Sie diese Zeile hinzu

async function runTest() {
  // Set up Selenium WebDriver with Chrome in headless mode
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('goog:chromeOptions', { args: ['--headless'] });
  const driver = new Builder().withCapabilities(chromeCapabilities).build();

  try {
    // Open the local website
    await driver.get("https://victoria-lo.github.io/bulletin-board/");

    // Find the search box and enter a note
    await driver.findElement(By.xpath('//*[@id="new-item"]/input')).sendKeys("Hello Selenium", Key.RETURN);

    // Get the note's text
    let note = await driver.findElement(By.xpath('//*[@id="items"]/div/p')).getText();

    // Assert that the note's text is the same as the input text "Hello Selenium"
    assert.strictEqual(note, "Hello Selenium");
    console.log("TEST PASSED");

  } finally {
    // Close the browser
    await driver.quit();
  }
}

runTest();
