import App from "../../lib/App"
import CarPage from "../../page-objects/components/Car.page";
import NavigationPage from "../../page-objects/components/Navigation.page";

const config = require('../../lib/config');

describe("E2E - Navigation", () => {
    it("Load the URL successfully", () => {
        App.launchURL();
        NavigationPage.verifyPageIsDisplayed();
        expect(browser).toHaveUrl(config.baseURL);
    });

    it("Verify Navigation Bar contents" , () => {
        NavigationPage.verifyNavigationBarDisplayed();
    });

    it("Verify Side navigation options", () => {
        NavigationPage.clickSideToggle();
        NavigationPage.verifySideNavToggleOptions();
        NavigationPage.clickClose();
    });

    it("Verify car menu options", () => {
        NavigationPage.clickCar();
        CarPage.verifyDifferentCarVariantsDisplayed();
    });

    it("Verify vechilces in Car menu", ()=> {
        CarPage.verifyModelVariants(config.carVariants[1]);
        CarPage.clickCloseButton();
    })
})