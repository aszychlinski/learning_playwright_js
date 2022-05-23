const {ProductPage} = require('../part_two/productPage');
const {CartPage} = require('../part_two/cartPage');
const {LoginPage} = require('../part_two/loginPage');
const {ConfirmOrderPage} = require('../part_two/confirmOrderPage');
const {OrderProcessedPage} = require('../part_two/orderProcessedPage');

class CommonActions {

    constructor(page) {
        this.page = page;
        this.productPage = new ProductPage(page);
        this.cartPage = new CartPage(page);
        this.loginPage = new LoginPage(page);
        this.confirmOrderPage = new ConfirmOrderPage(page);
        this.orderProcessedPage = new OrderProcessedPage(page);
        this.homePageURL = 'https://automationteststore.com/';
        this.searchInput = page.locator('#filter_keyword');
    }

    async open() {
        await this.page.goto(this.homePageURL);
    }

    async performCheckout() {
        await this.cartPage.goToCart()
        await this.cartPage.clickCheckoutButton()
        await this.loginPage.performLogin()
        await this.confirmOrderPage.clickConfirmOrder()
        await this.orderProcessedPage.verifySuccessHeader()
        await this.orderProcessedPage.clickContinueButton()
    }

    async performSearch(query) {
        await this.searchInput.fill(query);
        await this.page.keyboard.press('Enter');
    }

    async addProductToCartById(product_id) {
        await this.productPage.viewProductPage(product_id);
        await this.productPage.clickAddToCart();
    }
}

module.exports = {CommonActions};