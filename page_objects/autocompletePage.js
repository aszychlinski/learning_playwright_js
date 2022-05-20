class AutocompletePage {

    constructor(page) {
        this.page = page;
        this.initialInput = page.locator('#myInput');
        this.firstSuggestion = page.locator('#myInputautocomplete-list > div:first-of-type');
    }

    async open() {
        await this.page.goto('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html');
    }
}

module.exports = {AutocompletePage};
