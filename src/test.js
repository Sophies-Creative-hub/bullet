require("chromedriver");

const { Builder, By, Key } = require("selenium-webdriver");
const assert = require("assert");

async function runTest() {
  // Set up Selenium WebDriver with Chrome in headless mode
  const chromeCapabilities = Capabilities.chrome();
  chromeCapabilities.set('goog:chromeOptions', { args: ['--headless'] });
  const driver = new webdriver.Builder().withCapabilities(chromeCapabilities).build();

  try {
    // Open the local website
    await driver.get("https://victoria-lo.github.io/bulletin-board/"); // Update the URL to your local server

    //find the search box and enter a note
    await driver.findElement(By.xpath('//*[@id="new-item"]/input')).sendKeys("Hello Selenium", Key.RETURN);

    //get the note's text
    let note = await driver.findElement(By.xpath('//*[@id="items"]/div/p')).getText();

    //assert that the note's text is the same as the input text "Hello Selenium"
    assert.strictEqual(note, "Hello Selenium");
    console.log("TEST PASSED");

  } finally {
    //close the browser
    await driver.quit();
  }
})();
