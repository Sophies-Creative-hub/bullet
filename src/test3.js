require("geckodriver");

const { Builder, By, Key, Options } = require("selenium-webdriver");
const assert = require("chai").assert;

// Beschreibung - beschreibt den Test
describe("Notiz hinzufügen", function () {
    // Es beschreibt das erwartete Verhalten
    it("sollte eine Notiz hinzufügen und auf der Seite anzeigen", async function () {
        /* Selenium automatisiert:
           1. Öffnen Sie Firefox im headless Modus
           2. Navigieren Sie zur App
           3. Geben Sie "Hello Selenium" in das Eingabefeld ein
           4. Drücken Sie die Eingabetaste
        */
        // Öffnen Sie den Firefox-Browser im headless Modus
        const firefoxOptions = new Options().headless();
        let driver = await new Builder()
            .forBrowser("firefox")
            .setFirefoxOptions(firefoxOptions)
            .build();

        try {
            // Öffnen Sie die Website
            await driver.get("http://localhost:3000/");

            // Suchen Sie das Eingabefeld und geben Sie eine Notiz ein
            await driver.findElement(By.xpath('//*[@id="new-item"]/input'))
                .sendKeys("Hello Selenium", Key.RETURN);

            // Holen Sie sich den Text der Notiz
            let note = await driver.findElement(By.xpath('//*[@id="items"]/div/p'))
                .getText();

            // Überprüfen Sie, ob der Text der Notiz mit dem eingegebenen Text "Hello Selenium" übereinstimmt    
            assert.equal(note, "Hello Selenium");
            console.log("TEST ERFOLGREICH");
        } finally {
            // Schließen Sie den Browser
            await driver.quit();
        }

    })
})
