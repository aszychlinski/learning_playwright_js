class AjaxLoaderPage {

    constructor(page) {
        this.page = page;
        this.initialInput = page.locator('#myInput');
        this.firstSuggestion = page.locator('#myInputautocomplete-list > div:first-of-type');
        this.spinnerString = '#loader';
        this.buttonContainerString = 'div#myDiv';
        this.button = page.locator('#myDiv p');
        this.modalBackgroundString = '#myModalClick';
        this.modalHeader = page.locator('.modal-title');
    }

    async open() {
        await this.page.goto('https://webdriveruniversity.com/Ajax-Loader/index.html');
    }
}

module.exports = {AjaxLoaderPage};
