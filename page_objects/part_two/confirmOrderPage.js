class ConfirmOrderPage {

    constructor(page) {
        this.page = page;
        this.confirmOrderButton = '#checkout_btn';
    }

    async clickConfirmOrder() {
        await this.page.click(this.confirmOrderButton);
    }
}

module.exports = {ConfirmOrderPage};
