require("geckodriver"); // Ändern Sie hier "chromedriver" zu "geckodriver"

const { Builder, By, Key } = require("selenium-webdriver");
var assert = require("chai").assert;

//describe - describes test
describe("add note", function () {
    //it - describes expected behaviour
    it("should add a note and display on the page", async function () {
        /*Selenium automates:
       1. Open Firefox // Hier wurde der Kommentar für Klarheit angepasst
       2. Navigate to app
       3. Type "Hello Selenium" in input box
       4. Clicks the Enter key
      */
        //Chai asserts if new note's text matches the input

        //open Firefox browser // Hier wurde der Kommentar für Klarheit angepasst
        let driver = await new Builder().forBrowser("firefox").build(); // Hier wurde "chrome" durch "firefox" ersetzt

        try {
            //open the website
            await driver.get("http://localhost:3000/");

            //find the search box and enter a note
            await driver
                .findElement(By.xpath('//*[@id="new-item"]/input'))
                .sendKeys("Hello Selenium", Key.RETURN);

            //get the note's text
            let note = await driver
                .findElement(By.xpath('//*[@id="items"]/div/p'))
                .getText();

            //assert that the note's text is the same as the input text "Hello Selenium"    
            assert.equal(note, "Hello Selenium");
            console.log("TEST PASSED");
        } finally {
            //close the browser
            await driver.quit();
        }

    })
})
