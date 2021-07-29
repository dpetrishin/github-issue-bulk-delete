const puppeteer = require('puppeteer');

(async () => {
    const browser = await puppeteer.launch(
    { 
        headless: true, 
        // slowMo: 50
    });
    let page = await browser.newPage();
    await login(page);

    for (let i = 169; i > 129; i = i - 100) {
        await Promise.all([
            removeIssues(browser, i, i - 10),
            removeIssues(browser, i - 10, i - 20),
            removeIssues(browser, i - 20, i - 30),
            removeIssues(browser, i - 30, i - 40),
            removeIssues(browser, i - 40, i - 50),
            removeIssues(browser, i - 50, i - 60),
            removeIssues(browser, i - 60, i - 70),
            removeIssues(browser, i - 70, i - 80),
            removeIssues(browser, i - 80, i - 90),
            removeIssues(browser, i - 90, i - 100),
        ])
    }

    await browser.close();
})();

async function removeIssues(browser, from, to) {
    for (let i = from; i > to; --i) {
        let page = await browser.newPage();
        await navigateToIssue(page, i);
    } 
}

async function login(page) {
    await page.goto('https://github.com/login?return_to=%2Feconocom-belux%2Feconocom-mars-leasing%2Fissues%3Fq%3Dis%253Aissue%2Bis%253Aopen');
    
    await Promise.all([
        page.$eval('#login_field', el => el.value = 'dmitry.petrishin@gmail.com'),
        page.$eval('#password', el => el.value = '4P4k8K35j2'),
        page.$eval('input[name=commit]', form => form.click() ), 
        page.waitForNavigation(),
    ]);   
}

async function navigateToIssue(page, number) { 
    console.log(`Navigate to ${number} page...`);
    await page.goto(`https://github.com/econocom-belux/econocom-mars-leasing/issues/${number}`);
    page.waitForNavigation();

    if (await page.$('button[name=verify_delete]') !== null) {
        console.log('Button is found');
        await Promise.all([
            page.$eval('button[name=verify_delete]', form => form.click() ),
            page.waitForNavigation()
        ]);
    } 
    else {
        console.log('Already deleted.');
    }

    
    console.log(`Page ${number} is removed.`);
}

function delay(time) {
    return new Promise(function(resolve) { 
        setTimeout(resolve, time)
    });
 }