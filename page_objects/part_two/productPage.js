class ProductPage {

    constructor(page) {
        this.page = page;
        this.addToCartButton = 'a.cart';
    }
    
    async clickAddToCart() {
        await this.page.click(this.addToCartButton);
    }

    async viewProductPage(product_id) {
        await this.page.goto(`https://automationteststore.com/index.php?rt=product/product&product_id=${product_id}`);
    }
}

module.exports = {ProductPage};
