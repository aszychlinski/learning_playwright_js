const {expect} = require('@playwright/test');

class AddressPage {

    constructor(page) {
        this.page = page;
        this.newAddressButton = 'a[href="https://automationteststore.com/index.php?rt=account/address/insert"]'
        this.URL = 'https://automationteststore.com/index.php?rt=account/address';
        this.addressInsertedMessage = page.locator('div[class="alert alert-success"]');
    }

    async clickNewAddressButton() {
        await this.page.click(this.newAddressButton);
    }

    async verifyYouAreHere() {
        await expect(this.page).toHaveUrl(this.URL);
    }

    async verifyAddressInserted() {
        await expect(this.addressInsertedMessage).toContainText('Your address has been successfully inserted');
    }

}

module.exports = {AddressPage};
