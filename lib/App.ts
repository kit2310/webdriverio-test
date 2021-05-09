const config = require('../lib/config');
class App {
    launchURL() {
        browser.url(config.baseURL);
        browser.pause(1000);
        browser.maximizeWindow();
        browser.pause(1000);
        $('.accept-cookies-button').waitForExist();
        $('.accept-cookies-button').click();
        browser.pause(2000);
    }

    hasURLChanged(url: string) {
        expect(browser).toHaveUrl(url);
    }
}
export default new App()