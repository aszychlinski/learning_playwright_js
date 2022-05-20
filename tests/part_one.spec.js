const {test,expect} = require('@playwright/test')
const {ContactUsPage} = require('../page_objects/contactUsPage')
const {DropdownPage} = require('../page_objects/dropdownPage')
const {DatepickerPage} = require('../page_objects/datepickerPage')
const {AutocompletePage} = require('../page_objects/autocompletePage')
const {AjaxLoaderPage} = require('../page_objects/ajaxLoaderPage')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


test('4a', async ({page}) => {
    // Uzupełniamy wszystkie dane, i resetujemy - weryfikujemy czy wyczyściło poprawnie

    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.open();
    await contactUsPage.firstNameInput.fill('Adam');
    await contactUsPage.lastNameInput.fill('Szychliński');
    await contactUsPage.emailInput.fill('adam.szychlinski@itmagination.com');
    await contactUsPage.messageInput.fill('lubię placki');

    await contactUsPage.resetButton.click();

    await expect(contactUsPage.firstNameInput).toHaveText('');
    await expect(contactUsPage.lastNameInput).toHaveText('');
    await expect(contactUsPage.emailInput).toHaveText('');
    await expect(contactUsPage.messageInput).toHaveText('');

});


test('4b', async ({page}) => {
    // Wprowadzamy cześć danych i próbujemy wysłać - sprawdzamy komunikat błędu

    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.open();
    await contactUsPage.emailInput.fill('adam.szychlinski@itmagination.com');

    await contactUsPage.submitButton.click();

    await expect(contactUsPage.errorMessage).toContainText('Error: all fields are required');

});


test('4c', async ({page}) => {
    // Wprowadzamy błędny email i sprawdzamy komunikat

    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.open();
    await contactUsPage.firstNameInput.fill('Adam');
    await contactUsPage.lastNameInput.fill('Szychliński');
    await contactUsPage.emailInput.fill('adam.szychlinski@itmagination');
    await contactUsPage.messageInput.fill('lubię placki');

    await contactUsPage.submitButton.click();

    await expect(contactUsPage.errorMessage).toContainText('Error: Invalid email address');

});


test('4d', async ({page}) => {
    // Wprowadzamy wszystkie dane i sprawdzamy komunikat

    const contactUsPage = new ContactUsPage(page);
    await contactUsPage.open();
    await contactUsPage.firstNameInput.fill('Adam');
    await contactUsPage.lastNameInput.fill('Szychliński');
    await contactUsPage.emailInput.fill('adam.szychlinski@itmagination.com');
    await contactUsPage.messageInput.fill('lubię placki');

    await contactUsPage.submitButton.click();

    await expect(contactUsPage.successMessage).toContainText('Thank You for your Message!');

});

test('4f', async ({page}) => {
    // Wybieramy wszystkie możliwe opcje z dropdownow i sprawdzamy ich wartości czy są poprawne

    const dropdownPage = new DropdownPage(page);
    await dropdownPage.open();

    for (let i = 1; i < await dropdownPage.allDropdowns.count() + 1; ++i) {
        const currentOptionStrings = await dropdownPage.optionSet(i).allTextContents();
        const currentOptionStringsCount = await currentOptionStrings.length;
        for (let j = 0; j < currentOptionStrings.length; j++) {
            await page.selectOption(dropdownPage.optionAsString(i), currentOptionStrings[j].toLowerCase());
        }
    }
    
});


test('4g', async ({page}) => {
    // Zaznaczamy wszystkie checkboxy a następnie odznaczamy 2 i 4 - sprawdzamy czy  zostały odznaczone i zaznaczone poprawnie

    const dropdownPage = new DropdownPage(page);
    await dropdownPage.open();
    
    await dropdownPage.checkBox(1);
    await dropdownPage.checkBox(2);
    await dropdownPage.checkBox(4);
    await dropdownPage.unCheckBox(2);
    await dropdownPage.unCheckBox(4);

    await expect(dropdownPage.getCheckBox(1)).toBeChecked();
    await expect(dropdownPage.getCheckBox(2)).not.toBeChecked();
    await expect(dropdownPage.getCheckBox(3)).toBeChecked();
    await expect(dropdownPage.getCheckBox(4)).not.toBeChecked();

});

test('4h', async ({page}) => {
    // Klikamy wszystkie Radio buttony po każdym kliknięciu sprawdzamy czy zaznaczył się ten który chcieliśmy

    const dropdownPage = new DropdownPage(page);
    await dropdownPage.open();

    const count = await dropdownPage.activeRadioButtons.count();
    for (let i = 0; i < count; ++i) {
        await dropdownPage.activeRadioButtons.nth(i).check();
        await expect(dropdownPage.activeRadioButtons.nth(i)).toBeChecked();
    }
});

test('6', async ({page}) => {
    // "Automatyzujemy stronę Datepicker - wpisujemy date i sprawdzamy czy została wybrana poprawna"
    // w tym datepickerze nie da rady pisać z palca... musiałem wymyślić coś innego do zrobienia

    const date = new Date();
    const today = date.getDate();
    const tomorrow = today + 1
    const datepickerPage = new DatepickerPage(page);
    await datepickerPage.open();

    await datepickerPage.dateInput.click();
    await expect(datepickerPage.todayDay).toHaveText(today.toString());
    await datepickerPage.tomorrowDay.click();
    await datepickerPage.dateInput.click();
    await expect(datepickerPage.activeDay).toHaveText(tomorrow.toString());

});

test('7', async ({page}) => {
    // Automatyzujemy stronę Autocomplete TextField - wpisujemy 3 pierwsze znaki i wybieramy 2 element z listy podpowiadanej np. ('chi')

    const autocompletePage = new AutocompletePage(page);
    await autocompletePage.open();
    await autocompletePage.initialInput.fill('Chi');
    await autocompletePage.firstSuggestion.click();
    await expect(autocompletePage.initialInput).toHaveJSProperty('value', 'Chicken');

});

test('8', async ({page}) => {
    // Automatyzujemy stronę Ajax-Loader - czekamy aż strona się załaduje(bez statycznych waitow) i klikamy guzik

    const ajaxLoaderPage = new AjaxLoaderPage(page);
    await ajaxLoaderPage.open();
    await page.waitForSelector(ajaxLoaderPage.spinnerString, {state: 'hidden', timeout: 15000});
    await page.waitForSelector(ajaxLoaderPage.buttonContainerString, {state: 'visible', timeout: 5000});
    await ajaxLoaderPage.button.click();
    await page.waitForSelector(ajaxLoaderPage.modalBackgroundString, {state: 'visible', timeout: 5000});
    await expect(ajaxLoaderPage.modalHeader).toHaveText('Well Done For Waiting....!!!');

});
