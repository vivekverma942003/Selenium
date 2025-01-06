const { Builder, By, Key, until } = require("selenium-webdriver");
const { v4: uuidv4 } = require("uuid");
const Trend = require('../models/Trend');

Here this is the  dummy password please enter the correct password and username 
const username = "####";
const password = "######";

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
        await driver.get("https://twitter.com/home");

        // Wait for the "What’s Happening" section to load
        // Wait for the trending section

        console.log("Trending section starting");
        const trendingSection = await driver.wait(
            until.elementLocated(By.xpath("//div[contains(@aria-label, 'Timeline: Trending now')]")),
            20000
        );

        console.log("Trending section completed");
        // Extract trending items inside the section


        console.log("Trending items started");
g      

        console.log("Trending items ended");


        console.log(trendingItems + " this is the trending dataitems" + trendingItems.length);
        // Log the trending items
        for (const item of trendingItems) {
            const text = await item.getText();
            console.log("Trending Item:", text);
        }

        // Extract the text of top 5 trending items
        const topics = [];
        for (let i = 0; i < Math.min(trendingItems.length, 5); i++) {
            const text = await trendingItems[i].getText();
            if (text) topics.push(text.trim());
        }

        console.log("Top 5 Trending Topics:", topics);




        const uniqueId = uuidv4();
        const proxyIP = "1.2.3.4"
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
        await trendData.save();
        // console.log('Trend data saved:', trendData);

        return trendData;
    } catch (err) {
        console.error("Error:", err);
    } finally {
        await driver.quit();
    }
}

module.exports = scrapeTwitter;












