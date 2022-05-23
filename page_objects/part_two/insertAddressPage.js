const {expect} = require('@playwright/test');

class InsertAddressPage {
    
    constructor(page) {
        this.page = page;
        this.continueButton = 'button[title="Continue"][type="submit"]';
        this.dropdownWithError = page.locator('div[class="form-group has-error"]');
        this.firstNameInput = 'input#AddressFrm_firstname';
        this.lastNameInput = 'input#AddressFrm_lastname';
        this.addressOneInput = 'input#AddressFrm_address_1';
        this.cityInput = 'input#AddressFrm_city';
        this.regionStateDropdown = 'select#AddressFrm_zone_id';
        this.postCodeInput = 'input#AddressFrm_postcode';
        this.mandatoryFields = [this.firstNameInput, this.lastNameInput, this.addressOneInput, this.cityInput, this.postCodeInput]
    }


    generateString(length) {
        let result             = '';
        const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for ( let i = 0; i < length; i++ ) {
            result += characters.charAt(Math.floor(Math.random() *
                charactersLength));
        }
        return result;
    }

    async clickContinueButton() {
        await this.page.click(this.continueButton);
    }

    async verifyAmountOfErrorsEquals(amount) {
        await expect(this.dropdownWithError).toHaveCount(amount);
    }

    async clearAllFields() {
        for(const field of this.mandatoryFields) {
            await this.page.fill(field, '')
        }
    }

    async testLowerBoundary() {
        await this.page.fill(this.addressOneInput, this.generateString(2));
        await this.page.fill(this.cityInput, this.generateString(2));
        await this.page.fill(this.postCodeInput, this.generateString(1));
        await this.clickContinueButton()
    }

    async testUpperBoundary() {
        await this.page.fill(this.firstNameInput, this.generateString(33));
        await this.page.fill(this.lastNameInput, this.generateString(33));
        await this.page.fill(this.addressOneInput, this.generateString(129));
        await this.page.fill(this.cityInput, this.generateString(129));
        await this.page.fill(this.postCodeInput, this.generateString(11));
        await this.clickContinueButton()
    }

    async testCorrectData() {
        await this.page.fill(this.firstNameInput, this.generateString(24));
        await this.page.fill(this.lastNameInput, this.generateString(24));
        await this.page.fill(this.addressOneInput, this.generateString(96));
        await this.page.fill(this.cityInput, this.generateString(96));
        await this.page.selectOption(this.regionStateDropdown, '3599'); // 3599 == Swansea
        await this.page.fill(this.postCodeInput, this.generateString(8));
        await this.clickContinueButton()
    }
}

module.exports = {InsertAddressPage};