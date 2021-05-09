import Base from "../../lib/Base";

class NavigationPage extends Base{
    get navigationTab(){
        return $('[role="navigation"]');
    }

    get logo() {
        return $('nav[role="navigation"] img[alt="Volvo"]');
    }

    get carButton() {
        return $('[id *="topNavCarMenu"]');
    }

    get sideToggle() {
        return $('nav[role="navigation"] [id *="siteNavSideNavToggle"]');
    }

    get sidebarLogo() {
        return $('nav[dir="ltr"] img[alt="Volvo"]');
    }

    get close() {
        return $('nav[dir="ltr"] [id *="siteNavSideNavToggle"');
    }

    get buyLabel() {
        return $('[data-autoid="nav:sideNavLinksMenuDrawer"]:nth-child(1)');
    }
    get ownLabel() {
        return $('[data-autoid="nav:sideNavLinksMenuDrawer"]:nth-child(2)');
    }
    get whyVolvoLabel() {
        return $('[data-autoid="nav:sideNavLinksMenuDrawer"]:nth-child(3)');
    }
    get exploreLabel() {
        return $('[data-autoid="nav:sideNavLinksMenuDrawer"]:nth-child(4)');
    }
    get moreLabel() {
        return $('[data-autoid="nav:sideNavLinksMenuDrawer"]:nth-child(5)');
    }

    get internationalLabel() {
        return $('[data-autoid="nav:sideNavMarketContainer"]');
    }

    get facebookIcon() {
        return $('a[href*="facebook"]');
    }

    get twitterIcon() {
        return $('a[href*="twitter"]');
    }

    get instagramIcon() {
        return $('a[href*="instagram"]');
    }

    get youtubeIcon() {
        return $('a[href*="youtube"]');
    }

    verifyPageIsDisplayed() {
        this.navigationTab.waitForExist();
        expect(this.navigationTab).toBeVisible();
    }

    verifyNavigationBarDisplayed() {
        this.logo.waitForExist();
        expect(this.logo).toBeVisible();
        this.carButton.waitForExist();
        expect(this.carButton).toBeVisible();
        expect(this.carButton).toHaveText("Cars");
        this.sideToggle.waitForExist();
        expect(this.sideToggle).toBeVisible();
    }

    clickSideToggle() {
        expect(this.sideToggle).toBeVisible();
        this.sideToggle.click();
    }

    verifySideNavToggleOptions() {
        expect(this.sidebarLogo).toBeVisible();
        browser.verifyText(this.buyLabel, "Buy");
        browser.verifyText(this.ownLabel, "Own");
        browser.verifyText(this.whyVolvoLabel, "Why Volvo");
        browser.verifyText(this.exploreLabel, "Explore");
        browser.verifyText(this.moreLabel, "More");
        browser.verifyText(this.internationalLabel, "International");
        expect(this.facebookIcon).toBeVisible();
        expect(this.instagramIcon).toBeVisible();
        expect(this.twitterIcon).toBeVisible();
        expect(this.youtubeIcon).toBeVisible();
    }

    clickClose() {
        expect(this.close).toBeVisible();
        this.close.click();
        this.sideToggle.waitForExist();
    }
    
    clickCar() {
        this.carButton.waitForExist();
        this.carButton.click();
    }
}
export default new NavigationPage();