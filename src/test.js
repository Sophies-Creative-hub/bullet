const { Builder, By, Key, Capabilities } = require("selenium-webdriver");
require("geckodriver"); // Importiere das geckodriver-Paket

const assert = require('chai').assert;

// Beschreibt den Testfall für Selenium-Tests
describe("Selenium Tests", function () {
  
  // Testfall: Überprüft, ob eine Notiz hinzugefügt und angezeigt wird
  it("should add a note and display on the page", async function () {
    
    // Setzt die Capabilities für den Firefox-Browser im headless Modus
    const firefoxCapabilities = Capabilities.firefox();
    firefoxCapabilities.set('moz:firefoxOptions', { args: ['-headless'] });
    
    // Erstellt einen WebDriver mit den festgelegten Capabilities
    const driver = new Builder().withCapabilities(firefoxCapabilities).build();

    try {
      // Öffnet die lokale Website
      await driver.get("http://localhost:3000");

      // Findet das Eingabefeld und gibt eine Notiz ein
      await driver.findElement(By.xpath('//*[@id="new-item"]/input'))
                  .sendKeys("Hello Selenium", Key.RETURN);

      // Holt sich den Text der hinzugefügten Notiz
      let note = await driver.findElement(By.xpath('//*[@id="items"]/div/p'))
                            .getText();

      // Vergleicht den Text der Notiz mit dem eingegebenen Text "Hello Selenium"
      assert.strictEqual(note, "Hello Selenium");
      console.log("TEST PASSED");

    } finally {
      // Schließt den Browser
      await driver.quit();
    }
  });
});
