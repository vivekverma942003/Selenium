const { Builder, By, Key, until } = require("selenium-webdriver");
const username = "vishalkrverma50";
const password = "sonu@123";
async function scrapeTwitter() {
  let driver = await new Builder().forBrowser("chrome").build();

  try {
    // Navigate to Twitter login page
    await driver.get("https://twitter.com/login");

    // Wait for the username field and input email/username
    const usernameField = await driver.wait(
      until.elementLocated(By.css("input[autocomplete='username']")),
      10000
    );
    await usernameField.sendKeys(username, Key.RETURN);

    // Wait for the password field
    const passwordField = await driver.wait(
      until.elementLocated(By.css("input[name='password']")),
      10000
    );
    await passwordField.sendKeys(password, Key.RETURN);

    // Wait until logged in
    await driver.wait(until.urlContains("home"), 10000);
    console.log("Logged in successfully!");

    // Navigate to a Twitter profile
    await driver.get("https://twitter.com/elonmusk");

    // Wait for tweets to load
    await driver.wait(until.elementsLocated(By.css("article")), 10000);

    // Scrape tweets
    const tweets = await driver.findElements(By.css("article"));
    for (let tweet of tweets) {
      try {
        const tweetText = await tweet.findElement(By.css("[lang]")).getText();
        console.log("Tweet:", tweetText);
      } catch (err) {
        console.error("Could not extract tweet text:", err);
      }
    }
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await driver.quit();
  }
}

scrapeTwitter();



// this is part 2

const { Builder, By } = require('selenium-webdriver');
const Trend = require('../models/Trend');
// const fetch = require('node-fetch'); // For ProxyMesh IP fetching
const username = "vishalkrverma50";
const password = "sonu@123";
const scrapeTwitter = async () => {
    const driver = await new Builder()
        .forBrowser('chrome') // Ensure you have ChromeDriver installed
        // .usingServer('http://localhost:4444/wd/hub') // Link to Selenium Grid
        .build();
    console.log({ driver });
    try {
        // Navigate to Twitter login page
        // await driver.get('https://twitter.com/login');
        await driver.get('https://twitter.com/login');

        // https://x.com/i/flow/login

        // Login automation: Replace with your Twitter credentials
        

        // Wait for username field and input username
        const usernameField = await driver.wait(
            until.elementLocated(By.css("input[autocomplete='username']")),
            10000
        );
        await usernameField.sendKeys(username, Key.RETURN);

        // Wait for password field and input password
        const passwordField = await driver.wait(
            until.elementLocated(By.css("input[name='password']")),
            10000
        );
        await passwordField.sendKeys(password, Key.RETURN);

        // Wait for page to load after login
        await driver.wait(until.urlContains("home"), 10000);
        console.log("Logged in successfully!");

        // Locate and fetch trending topics
        await driver.get("https://twitter.com/elonmusk");

        // Wait for tweets to load
       const topics= await driver.wait(until.elementsLocated(By.css("article")), 10000);
       console.log(topics);
        // Simulate getting proxy IP address
        // const proxyIP = '192.168.1.1'; // Replace with actual ProxyMesh IP

        // Generate unique ID for this scrape session
        // const uniqueId = uuidv4();

        // // Prepare trend data
        const trendData = new Trend({
            id: uniqueId,
            trend1: topics[0] || '',
            trend2: topics[1] || '',
            trend3: topics[2] || '',
            trend4: topics[3] || '',
            trend5: topics[4] || '',
            ipAddress: proxyIP,
            timestamp: new Date(),
        });

        // Save to MongoDB
        await trendData.save();
        console.log('Trend data saved:', trendData);

        return trendData;
    } catch (err) {
        console.error("this is the catch error " + err.message);
        return null;
    } finally {
        await driver.quit();
    }
};

module.exports = scrapeTwitter;
