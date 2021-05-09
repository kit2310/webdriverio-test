import App from "../../lib/App";
import NavigationPage from "../../page-objects/components/Navigation.page";
import LandingPage from "../../page-objects/pages/Landing.page";
const config = require("../../lib/config");

describe("Test to verify the Conclusion of the landing page ", () => {
    it("Load the URL successfully", () => {
        App.launchURL();
        NavigationPage.verifyPageIsDisplayed();
        expect(browser).toHaveUrl(config.baseURL);
    });
    
    it("Check the conclusion header and intro", () =>{
        LandingPage.verifyConclusionHeaderAndIntro();
    });

    it("Verify safety image present in conclusion", () =>{
        LandingPage.verifySafetyImage();
    });

    it("verify learn more button navigated to safety heritage" ,()=> {
        const url = config.safetyHeritageURL;
        LandingPage.clickLearnMoreButton();
        App.hasURLChanged(url);
    })
});