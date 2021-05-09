import App from "../../lib/App";
import NavigationPage from "../../page-objects/components/Navigation.page";
import LandingPage from "../../page-objects/pages/Landing.page";
const config = require("../../lib/config");
describe("Verify the feature contents of the landing page", () =>{

    it("Load the URL successfully", () => {
        App.launchURL();
        NavigationPage.verifyPageIsDisplayed();
        expect(browser).toHaveUrl(config.baseURL);
    });
    
    it("Check and verify the feature introduction", () => {
        LandingPage.verifyFeaturesHeader();
    });

    it("Check the mentioned features", () => {
        LandingPage.verifyFeaturesDisplayed();
    });

    it("Navigate to Car safety",() => {
        LandingPage.clickCarSafetyLink();
        App.hasURLChanged(config.carSafetyURL);
    })

    
})