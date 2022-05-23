const {secrets} = require("./secrets");
const {TopNavigation} = require("./topNavigation");

class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.topNavigation = new TopNavigation(page);
        this.loginUrl = 'https://automationteststore.com/index.php?rt=account/login';
        this.loginInput = page.locator('#loginFrm_loginname');
        this.passwordInput = page.locator('#loginFrm_password');
        this.loginButton = page.locator('button[title="Login"]');
    }

    async performLogin() {
        if (await this.page.url() != this.loginUrl){
            await this.topNavigation.clickLoginButton();
        }
        
        await this.loginInput.fill(secrets.login)
        await this.passwordInput.fill(secrets.password)
        await this.loginButton.click()
    }
}

module.exports = {LoginPage};
