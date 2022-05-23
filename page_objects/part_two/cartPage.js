const {expect} = require('@playwright/test');
const {TopNavigation} = require('../part_two/topNavigation');

class CartPage {

    constructor(page) {
        this.page = page;
        this.topNavigation = new TopNavigation(page);
        this.cartUrl = 'https://automationteststore.com/index.php?rt=checkout/cart';
        this.checkoutButton = '#cart_checkout1';
        this.emptyCartMessage = page.locator('div.contentpanel');
    }

    async clickCheckoutButton() {
        await this.page.click(this.checkoutButton)
    }

    async goToCart() {
        if (await this.page.url() !== this.cartUrl) {
            this.page.goto(this.cartUrl)
        }
    }

    async verifyCartIsEmpty() {
        await expect(this.emptyCartMessage).toContainText('Your shopping cart is empty!')
        await expect(this.topNavigation.cartStatusAmount).toHaveText('0')
        await expect(this.topNavigation.cartStatusPrice).toHaveText('$0.00')
    }
}

module.exports = {CartPage};
