import App from "../../lib/App";
import NavigationPage from "../../page-objects/components/Navigation.page";
import LandingPage from "../../page-objects/pages/Landing.page";

const _ = require("lodash");
const config = require('../../lib/config');

describe(" Test to check the Testimonials present in the landing page", () => {
    it("Load the URL successfully", () => {
        App.launchURL();
        NavigationPage.verifyPageIsDisplayed();
        expect(browser).toHaveUrl(config.baseURL);
    });

    it("Verify the testimonials header and intro", () => {
        LandingPage.verifyTestimonialsHeaderAndIntro();
    });

    it("Verify video testimonials from surviors", () => {
        const testimonials = config.testimonials;
        _.forEach(testimonials, (testimonial: any)=> {
            const showcard = LandingPage.getTestimonialShowcard(testimonial.index);
            const name = LandingPage.getTestimonialName(testimonial.index);
            const description = LandingPage.getTestimonialDescription(testimonial.index);
            
            name.scrollIntoView();
            showcard.waitForExist();
            // LandingPage.saveTestimonial(showcard, testimonial.name);
            expect(name).toHaveText(testimonial.name);
            expect(description).toHaveText(testimonial.description);
            LandingPage.playAndVerifyTestimony(showcard, testimonial.name);
            browser.pause(500);
        });
    })
})