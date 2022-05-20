class ContactUsPage {

    constructor(page) {
        this.page = page;
        this.firstNameInput = page.locator('input[name="first_name"]');
        this.lastNameInput = page.locator('input[name="last_name"]');
        this.emailInput = page.locator('input[name="email"]');
        this.messageInput = page.locator('textarea[name="message"]');
        this.submitButton = page.locator('input[type="submit"]');
        this.resetButton = page.locator('input[type="reset"]');
        this.successMessage = page.locator('h1');
        this.errorMessage = page.locator('body');
    }
    
    async open() {
        await this.page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
    }
}

module.exports = {ContactUsPage};
