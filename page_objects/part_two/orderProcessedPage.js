const {expect} = require('@playwright/test');

class OrderProcessedPage {
    
    constructor(page) {
        this.page = page;
        this.continueButton = 'a.btn[title="Continue"]';
        this.headerText = ' Your Order Has Been Processed!';
        this.orderProcessedHeader = page.locator('h1.heading1 span.maintext');
        // this.orderNumberElement = 'section.mb40 p:nth-child(3)';
        this.invoiceLink = 'section.mb40 p:nth-child(4) a';
    }

    async verifySuccessHeader() {
        await expect(this.orderProcessedHeader).toHaveText(this.headerText);
    }

    async clickContinueButton() {
        await this.page.click(this.continueButton);
    }

    async clickGoToInvoicePage() {
        await this.page.click(this.invoiceLink);
    }
}

module.exports = {OrderProcessedPage};
