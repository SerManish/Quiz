const puppeteer = require('puppeteer');
var fs = require('fs');

(async () => {
    var database = {"os":{},"dsa":{}}

    const browser = await puppeteer.launch();

    subjects = ["os","dsa"];
    links = ["https://www.sanfoundry.com/operating-system-questions-answers/","https://www.sanfoundry.com/1000-data-structure-questions-answers/"]

    for(let j=0;j<2;j++)
    {
        const page = await browser.newPage();

        // subject's questions and answers
        await page.goto(links[j], {waitUntil: 'load', timeout: 0});
        // urls of all subject's pages from sanfoundry
        var urls = await page.evaluate(() => Array.from(document.querySelectorAll('td a'),elem => elem.href));
        await page.close();
        var data = {'easy':[],'medium':[],'hard':[]}


        urls = [urls[0],urls[1]];                                 //remove this line for 3000+ questions


        // Scraping questions and answers 
        let numberOfUrls = urls.length;
        for(let i = 0;i<numberOfUrls;i++)
        {
            let url = urls[i];
            const anotherPage = await browser.newPage();
            await anotherPage.goto(url, { waitUntil: 'load', timeout: 0 });
            var questions = await anotherPage.evaluate(
                () => Array.from(document.querySelectorAll('p'), elem => elem.innerText)
            );
            var answers = await anotherPage.evaluate(
                () => Array.from(document.querySelectorAll('.collapseomatic_content'), elem => elem.innerText)
            );
            for (let i = 0; i < 5; i++) {
                let tmp = questions[i + 1].split('\n').splice(0, 5);
                tmp.push(answers[i]);
                data['easy'].push(tmp);
            }
            for (let i = 5; i < 8; i++) {
                let tmp = questions[i + 1].split('\n').splice(0, 5);
                tmp.push(answers[i]);
                data['medium'].push(tmp);
            }
            for (let i = 8; i < 10; i++) {
                let tmp = questions[i + 1].split('\n').splice(0, 5);
                tmp.push(...(answers[i].split('\n')));
                data['hard'].push(tmp);
            }
            await anotherPage.close();
        }
        database[subjects[j]] = data;
    }

    //writing to database.json(included in gitignore)
    fs.writeFile("database.json", JSON.stringify(database), err => 
        {
            if(err)
            console.log(err);
        }
    );
    await browser.close();
})();