import scrollIntoView from "webdriverio/build/commands/element/scrollIntoView";
import Base from "../../lib/Base";
const _ = require("lodash");

const config = require("../../lib/config");

class LandingPage extends Base{
    get storyVideo() {
        return $('//video[not(@data-autoid)]');
    }

    get header() {
        return $('section[data-autoid="ModelIntro"] h2');
    }

    get introduction() {
        return $('section[data-autoid="ModelIntro"] p');
    }

    get playNow() {
        return $(`//button[contains(translate(., "ABCDEFGHIJKLMNOPQRSTUVWXYZ","abcdefghijklmnopqrstuvwxyz"), "watch the story")]`)
    }

    get featuresHeader() {
        return $('[data-component="TextStatement"] p');
    }

    get carSafety() {
       return $('[data-autoid="iconCallouts:cta"]');
    }

    get testimonialsHeader() {
        return $('[data-component="VideoTestimonials"] h2');
    }

    get testimonialsIntro() {
        return $('[data-component="VideoTestimonials"] h2 + p');
    }

    get conclusionHeader() {
        return $('[data-autoid="imageWithText:title"]');
    }

    get conclusionIntro() {
        return $('[data-autoid="imageWithText:description"]');
    }

    get learnMoreButton() {
        return $('[data-autoid="imageWithText:primaryCta"]');
    }

    get conclusionImage() {
        return $('[data-autoid="imageWithText:image"]');
    }

    get modelsHeader() {
        return $('[data-autoid="productListCarousel:title"]');
    }

    get rechargeCars() {
        return $('[data-autoid="ProductListCarousel:cta1"]');
    }

    get mildHybridCars() {
        return $('[data-autoid="ProductListCarousel:cta2"]');
    }

    get previousModelButton() {
        return $('[data-autoid="springCarouselPreviousButton"]');
    }

    get nextModelButton() {
        return $('[data-autoid="springCarouselNextButton"]');
    }

    get rechargeLink() {
        return $('[data-autoid="ProductListCarousel:cta1"]');
    }

    get mildHybridCarLink() {
        return $('[data-autoid="ProductListCarousel:cta2"]')
    }
    getModelCategory(index: number) {
        return $(`[data-autoid="productListCarouselItem-${index}"] [data-autoid="productListCarouselItem:category"]`);
    }

    getModelName(index: number) {
        return $(`[data-autoid="productListCarouselItem-${index}"] [data-autoid="productListCarouselItem:modelName"]`);
    }

    getModelRechargeType(index: number) {
        return $(`[data-autoid="productListCarouselItem-${index}"] [data-autoid="productListCarouselItem:rechargeType"]`)
    }

    getModelImage(index: number) {
        return $(`[data-autoid="productListCarouselItem-${index}"] picture`);
    }

    getLearnLink(index: number) {
        return $(`[data-autoid="productListCarouselItem-${index}"] + div [data-autoid="productListCarouselItem:link1"]`);
    }

    getShopLink(index: number) {
        return $(`[data-autoid="productListCarouselItem-${index}"] + div [data-autoid="productListCarouselItem:link2"]`);
    }
    
    getTestimonialShowcard(index: number) {
        return $(`[data-autoid="videoTestimonials:container"]:nth-child(${index}) [data-autoid *="videoTestimonials"]`);
    }

    getTestimonialName(index: number) {
        return $(`[data-autoid="videoTestimonials:container"]:nth-child(${index}) em`);
    }

    getTestimonialDescription(index: number) {
        return $(`[data-autoid="videoTestimonials:container"]:nth-child(${index}) em+p`);
    }

    playOnShowcard(index: number) {
        return $(`[data-autoid="videoTestimonials:container"]:nth-child(${index}) button`)
    }
    getFeatureIcon(icon: string) {
        const selector = $(`svg[data-icon='${icon}']`)
        return selector;
    }

    getFeatureName(name: string) {
        return $(`//em[text()="${name}"]`);
    } 

    getFeatureDescription(name: string) {
        return $(`//em[text()="${name}"]/following-sibling::div[@data-autoid="IconTextItem:text"]/p`);
    }

    // saveStoryStartScene() {
    //     this.storyVideo.scrollIntoView();
    //     browser.pause(1000);
    //     // browser.saveElement(this.storyVideo,'storyVideoCapture');
    // }

    checkStoryVideoPlaysWhenInView() {
        this.storyVideo.scrollIntoView();
        this.shortPause();
        expect(browser.checkElement(this.storyVideo,'../reference/storyVideoCapture')).toBeGreaterThan(10);
    }

    verifyHeadingAndIntro() {
        this.header.waitForExist();
        this.header.scrollIntoView();
        expect(this.header).toHaveText(config.header);
        expect(this.introduction).toHaveText(config.introduction)
    }

    verifyPlayVideoButtonVisible() {
        this.playNow.waitForExist();
        expect(this.playNow).toBeVisible();
    }

    verifyFeaturesHeader() {
        this.featuresHeader.waitForExist();
        this.featuresHeader.scrollIntoView();
        expect(this.featuresHeader).toBeVisible();
        expect(this.featuresHeader).toHaveText(config.featureHeader);
    }

    verifyFeaturesDisplayed() {
        const features: object[] = config.features;
        _.forEach(features, (feature: any) => {
            const featureIcon = this.getFeatureIcon(feature.icon);
            const featureName = this.getFeatureName(feature.name);
            const featureDescription = this.getFeatureDescription(feature.name);

            featureDescription.scrollIntoView();
            featureIcon.waitForExist();
            expect(featureIcon).toBeVisible();
            expect(featureName).toHaveText(feature.name);
            expect(featureDescription).toHaveText(feature.description);

        });
    }

    clickCarSafetyLink() {
        expect(this.carSafety).toHaveText(_.toUpper(config.carSafetyDesc));
        browser.waitAndClick(this.carSafety);
    }

    verifyTestimonialsHeaderAndIntro() {
        this.testimonialsHeader.waitForExist();
        this.testimonialsHeader.scrollIntoView();
        expect(this.testimonialsHeader).toHaveText(config.testimonialsHeader);
        expect(this.testimonialsIntro).toHaveText(config.testimonialsIntro);
    }

    playAndVerifyTestimony(showcardSelector: WebdriverIO.Element, name: string) {
        showcardSelector.scrollIntoView();
        // browser.saveElement(showcardSelector,`testimonialOf${name}`);
        showcardSelector.click();
        this.longPause();
        expect(browser.checkElement(showcardSelector,`../reference/testimonialOf${name}`)).toBeGreaterThan(10);
        showcardSelector.click();
    }

    verifyConclusionHeaderAndIntro() {
        this.conclusionIntro.scrollIntoView();
        this.conclusionHeader.waitForExist();
        this.conclusionIntro.waitForExist();
        expect(this.conclusionHeader).toHaveText(config.conclusionHeader);
        expect(this.conclusionIntro).toHaveText(config.conclusionIntro);
    }

    clickLearnMoreButton() {
        expect(this.learnMoreButton).toHaveText(_.toUpper(config.conclusionLearnMore));
        browser.waitAndClick(this.learnMoreButton);
    }

    verifySafetyImage() {
        this.conclusionImage.waitForExist();
        this.conclusionImage.scrollIntoView();
        expect(browser.checkElement(this.conclusionImage, "conclusionSafety")).toEqual(0);
    }

    verifyModelsHeader() {
        this.modelsHeader.scrollIntoView();
        this.modelsHeader.waitForExist();
        expect(this.modelsHeader).toHaveText(config.modelsHeader);
    }

    verifyModelCategory(index: number, modelCategory: string) {
        const category = this.getModelCategory(index);
        category.scrollIntoView();
        category.waitForExist();
        expect(category).toHaveText(_.toUpper(modelCategory));
    }

    verifyModelName(index: number, modelName: string) {
        const name = this.getModelName(index);
        name.waitForExist();
        expect(name).toHaveText(modelName);
    }

    verifyModelRechargeType(index: number, modelRechargeType: string) {
        const rechargeType = this.getModelRechargeType(index);
        rechargeType.waitForExist();
        expect(rechargeType).toHaveText(modelRechargeType);
    }

    verifyModelImagesMatch(index: number, modelName: string, modelRechargeType: string) {
        const modelImage = this.getModelImage(index);
        expect(modelImage).toBeVisible();
        browser.saveElement(modelImage,`${modelName}+${modelRechargeType}`);
        browser.pause(800);
        expect(browser.checkElement(modelImage,`${modelName}+${modelRechargeType}`)).toEqual(0);
    }

    verifyLinksToModelVisibile(index: number){
        const learn = this.getLearnLink(index);
        const shop = this.getShopLink(index);

        learn.waitForExist();
        expect(learn).toBeVisible();
        expect(learn).toHaveText(_.toUpper(config.learnLink));

        shop.waitForExist();
        expect(shop).toBeVisible();
        expect(shop).toHaveText(_.toUpper(config.shopLink));
    }

    checkModelButtonsVisible() {
        const previous = this.previousModelButton;
        const next = this.nextModelButton;

        previous.scrollIntoView();
        previous.waitForExist();
        expect(previous).toBeVisible();
        expect(previous).toHaveAttributeContaining("class","or");

        next.waitForExist();
        expect(next).toBeVisible();
        expect(next).toHaveAttributeContaining("class", "ca");
        // a as bx by bz cb cc cd ce cf or os ot x fade
        // a as bx by bz ca cb cc cd ce cf jr os x focus
    }

    checkIfNextButtonIsActive() {
        const next = this.nextModelButton;
        // next.scrollIntoView();
        next.waitForExist();
        expect(next).toBeVisible();
        const attr = next.getAttribute("class");
        const isActive = _.includes(attr, "ca");
        return isActive;
    }

    clickNextButton() {
        const next = this.nextModelButton;
        browser.waitAndClick(next);
    }

    isRechargeCarLinkPresent() {
        this.rechargeLink.waitForExist();
        this.rechargeLink.scrollIntoView();
        expect(this.rechargeLink).toHaveText(_.toUpper(config.rechargeLink));
    }

    isMildHybridCarLinkPresent() {
        this.mildHybridCarLink.waitForExist();
        expect(this.mildHybridCarLink).toHaveText(_.toUpper(config.mildHybridLink));
    }

    saveTestimonial(showcardSelector: WebdriverIO.Element, name: string) {
        showcardSelector.scrollIntoView();
        browser.saveElement(showcardSelector,`../reference/testimonialOf${name}`);
    }
}
export default new LandingPage();