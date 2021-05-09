
declare namespace WebdriverIO {
    export interface Browser {
        waitAndClick(el: WebdriverIO.Element): void;
        verifyText(el: WebdriverIO.Element, text: string): void;
    }   
}