class DropdownPage {

    constructor(page) {
        this.page = page;
        this.allDropdowns = page.locator('.dropdown-menu-lists:not(#fruit-selects)');
        this.activeRadioButtons = page.locator('input[type="radio"]:not([disabled])');
    }

    async open() {
        await this.page.goto('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');
    }
    
    optionSet(int) {
        return this.page.locator(`#dropdowm-menu-${int} option`);
    }
    
    async checkBox(int) {
        await this.page.check(`input[value="option-${int}"]`);
    }

    async unCheckBox(int) {
        await this.page.uncheck(`input[value="option-${int}"]`);
    }
    
    getCheckBox(int) {
        return this.page.locator(`input[value="option-${int}"]`);
    }
    
    optionAsString(int) {
        return `#dropdowm-menu-${int}`
    }
    
}

module.exports = {DropdownPage};
