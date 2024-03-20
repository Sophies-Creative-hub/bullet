require("geckodriver");

const { Builder, By, Key, Options } = require("selenium-webdriver");
const assert = require("chai").assert;

// Beschreibung - beschreibt den Test
describe("Notiz hinzufügen", function () {
    // it - beschreibt das erwartete Verhalten
    it("sollte eine Notiz hinzufügen und auf der Seite anzeigen", async function () {
        /* Selenium automatisiert:
           1. Öffnen von Firefox im headless Modus
           2. Navigieren zur App
           3. Eingeben von "Hello Selenium" in das Eingabefeld 
           4. Drücken der Eingabetaste
        */
        // Öffnet Firefox-Browser im headless Modus
        const firefoxCapabilities = Capabilities.firefox();
        firefoxCapabilities.set('moz:firefoxOptions', { args: ['-headless'] });
        const driver = new Builder().withCapabilities(firefoxCapabilities).build();

        try {
            // Öffnet die Website
            await driver.get("http://localhost:3000/");

            // Sucht das Eingabefeld und gibt eine Notiz ein
            await driver.findElement(By.xpath('//*[@id="new-item"]/input'))
                .sendKeys("Hello Selenium", Key.RETURN);

            // Holt sich den Text der Notiz
            let note = await driver.findElement(By.xpath('//*[@id="items"]/div/p'))
                .getText();

            /* Überprüft, ob der Text der Notiz mit dem eingegebenen Text
             "Hello Selenium" übereinstimmt    */
            assert.equal(note, "Hello Selenium");
            console.log("TEST ERFOLGREICH");
        } finally {
            // Schließt den Browser
            await driver.quit();
        }

    })
})
