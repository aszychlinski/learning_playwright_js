const {expect} = require('@playwright/test')

class TopNavigation {

    constructor(page) {
        this.page = page;
        this.loginButton = 'ul#customer_menu_top a[href="https://automationteststore.com/index.php?rt=account/login"]';
        this.welcomeBackButton = 'div#customernav a[href="https://automationteststore.com/index.php?rt=account/account"]';
        this.addressBookButton = 'ul.nav-dash > li:nth-of-type(3)';
        this.cartStatusAmount = page.locator('ul.topcart span.label');
        this.cartStatusPrice = page.locator('ul.topcart span.cart_total');
        this.cartStatusPriceString = 'ul.topcart span.cart_total';
    }

    async clickLoginButton() {
        await this.page.click(this.loginButton)
    }

    async clickAddressBookButton() {
        await this.page.click(this.addressBookButton, {force: true})
    }

    async verifyCartStatus(expectedAmount, expectedValue) {
        await expect(this.cartStatusAmount).toHaveText(expectedAmount);
        let value = await this.page.textContent(this.cartStatusPriceString);
        value = await value.replace('$', '').replace('.', '');
        value = await parseInt(value);
        if (expectedValue != value) {
            throw 'Anomalous cart value';
        }
    }
}

module.exports = {TopNavigation};
