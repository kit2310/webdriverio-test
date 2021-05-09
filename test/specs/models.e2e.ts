import App from "../../lib/App";
import NavigationPage from "../../page-objects/components/Navigation.page";
import LandingPage from "../../page-objects/pages/Landing.page";
const config = require("../../lib/config");
const _ = require("lodash");

describe("Test to verify that  all Car models are displayed.", ()=> {
    it("Load the URL successfully", () => {
        App.launchURL();
        NavigationPage.verifyPageIsDisplayed();
        expect(browser).toHaveUrl(config.baseURL);
    });

    it("Verify headers" , () => {
        LandingPage.verifyModelsHeader();
        LandingPage.checkModelButtonsVisible();
    });

    it("Verify different models of cars -its meta data and images" , () => {
        const models = config.models;
        _.forEach(models, (model: any, index: number) => {
            LandingPage.verifyModelCategory(index, model.category);
            LandingPage.verifyModelName(index, model.name);
            LandingPage.verifyModelRechargeType(index, model.rechargeType);
            LandingPage.verifyModelImagesMatch(index, model.name, model.rechargeType);
            LandingPage.verifyLinksToModelVisibile(index);
            browser.pause(1000);
            if(LandingPage.checkIfNextButtonIsActive()) {
                browser.pause(500);
                LandingPage.clickNextButton();
            }
        });
    });

    it("Verify links", ()=> {
        LandingPage.isRechargeCarLinkPresent();
        LandingPage.isMildHybridCarLinkPresent();
    });
    
})