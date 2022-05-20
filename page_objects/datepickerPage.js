class DatepickerPage {

    constructor(page) {
        this.page = page;
        this.dateInput = page.locator('div input');
        this.todayDay = page.locator('.today.day');
        this.activeDay = page.locator('.active.day');
        this.tomorrowDay = page.locator('.today + td');
    }

    async open() {
        await this.page.goto('https://webdriveruniversity.com/Datepicker/index.html');
    }
}

module.exports = {DatepickerPage};
