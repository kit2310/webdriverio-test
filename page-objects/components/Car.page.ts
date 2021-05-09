import Base from "../../lib/Base";

const config = require("../../lib/config");
const _ = require("lodash");
class CarPage extends Base{
    get crossover() {
        return $('//h4[text()="Crossover"]');
    }
    get closeButton() {
        return $('[data-autoid="nav:carMenuCloseButton"]');
    }

    getCarName(model: string) {
        // const selector =$(`//em[text()= "${model}"]`);
        const selector = $(`//div[@role="tabpanel" and @aria-hidden="false"]//a[@data-autoid="nav:carContainer"]//em[text()= "${model}"]`)
        return selector;
    }

    getCarVariant(variant: string) {
        const selector = $(`//h2[text()="${variant}"]`);
        return selector;
    }

    getCarType(type: string) {
        // const selector = $(`//div[@aria-hidden="false" and @role="tabpanel"]//a[text()= "${type}"]`);
        const selector = $(`//div[@aria-hidden="false" and @role="tabpanel"]//a[contains(translate(., 'abcdefghijklmnopqrstuvwxyz','ABCDEFGHIJKLMNOPQRSTUVWXYZ'), '${type}')]`);
        return selector;
    }

    verifyCarVariantTabFocused(carVariant: string) {
        const selector= $(`//h2[text()="${carVariant}"]/parent::button`);
        expect(selector).toHaveAttribute("aria-selected", "true");
    }
    verifyDifferentCarVariantsDisplayed() {
        this.getCarVariant(config.carVariants[0]).waitForExist();
        expect(this.getCarVariant(config.carVariants[0])).toBeVisible();
        expect(this.getCarVariant(config.carVariants[0])).toHaveText(config.carVariants[0]);
        expect(this.getCarVariant(config.carVariants[1])).toBeVisible();
        expect(this.getCarVariant(config.carVariants[1])).toHaveText(config.carVariants[1]);
        this.verifyCarVariantTabFocused(config.carVariants[1]);
        expect(this.getCarVariant(config.carVariants[2])).toBeVisible();
        expect(this.getCarVariant(config.carVariants[2])).toHaveText(config.carVariants[2]);
    }

    verifyModelVariants(variant: string) {

        // current variants are electric, hybrid, mild hybrid. Need to add data for electric and mild hybrid in config.ts.
        this.getCarVariant(variant).click();
        const modelVariant = config[variant];
        for(let key in modelVariant) {
            const cars: string[] =  modelVariant[key];
            this.getCarType(key).waitForExist();
            expect(this.getCarType(key)).toHaveText(_.toUpper(key));
            cars.forEach((car: string) => {
                this.getCarName(car).waitForExist();
                expect(this.getCarName(car)).toHaveText(car);
            });
        }

    }

    clickCloseButton() {
        browser.waitAndClick(this.closeButton);
    }
}

export default new CarPage();