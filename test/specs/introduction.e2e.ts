import App from "../../lib/App";
import NavigationPage from "../../page-objects/components/Navigation.page";
import LandingPage from "../../page-objects/pages/Landing.page";

const config = require("../../lib/config");

describe("Verify the contents of the Landing page", ()=> {
    it("Load the URL successfully", () => {
        App.launchURL();
        NavigationPage.verifyPageIsDisplayed();
        expect(browser).toHaveUrl(config.baseURL);
    });

    it("Verify Header and introduction of the landing page", ()=> {
        LandingPage.verifyHeadingAndIntro();
    });
    
    it("Verify video is playing in background when in view", ()=> {
        LandingPage.checkStoryVideoPlaysWhenInView();
        LandingPage.verifyPlayVideoButtonVisible();
    });
})