const { Builder, By, Key, until } = require('selenium-webdriver');
var cheerio = require('cheerio');
var cron = require('node-cron');
const { Users } = require("../services");

module.exports = (app) => {
    app.post('/', (req, res) => {
        (function run() {
            const { tracker_number, mobile_number } = req.body;
            (async function example() {
                let driver = await new Builder().forBrowser('chrome').build();
                try {
                    await driver.get("https://trackcourier.io/speed-post-tracking");
                    await driver.findElement(By.xpath('/html/body/div/div/div/div[1]/fieldset/form/div[1]/input')).sendKeys(tracker_number, Key.RETURN);
                    await setTimeout(async function () {
                        var Events_list = []
                        let page_data = await driver.executeScript('return document.documentElement.outerHTML')
                        let $ = cheerio.load(page_data)
                        $('li').each(function (i, el) {
                            let date_time = $(el).find('.checkpoint__time').text().replace(/\s\s+/g, ' ').trim().split(' ')
                            let event = $(el).find('span', '.ng-binding').text()
                            let Office_info = $(el).find('div', '.checkpoint__content')
                            let Office = $(Office_info).find('div', '.hint ng-binding').text()
                            Events_list.push({ 'date': date_time[0], 'time': date_time[1], 'event': event, 'office': Office.slice(8), "mobile_number": mobile_number })
                        })
                        await driver.quit();
                        var Event_Details = Events_list.slice(0, -3);
                        let users = new Users()
                        await users.getByNumber(mobile_number).then((data) => {
                            if (data.length == 0) {
                                users.SmS(mobile_number,Event_Details)
                                users.insertIntoDb(Event_Details)
                                console.log(Event_Details);
                            }else if (data.length < Event_Details.length) {
                                users.SmS(mobile_number,Event_Details[0])
                                users.insertIntoDb(Event_Details[0])
                            }else if(true){
                                cron.schedule('0 0 */8 * * *', () => {
                                    run()
                                });
                            }
                        }).catch((err) => {
                            console.log(err.message);
                        })
                    }, 30 * 1000);


                } catch (error) {
                    console.error(error);
                }

            })();
        })();
    })
};