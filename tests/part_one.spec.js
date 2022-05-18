const {test,expect} = require('@playwright/test')
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))


test('4a', async ({page}) => {
    // Uzupełniamy wszystkie dane, i resetujemy - weryfikujemy czy wyczyściło poprawnie

    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
    await page.locator('input[name="first_name"]').fill('Adam')
    await page.locator('input[name="last_name"]').fill('Szychliński')
    await page.locator('input[name="email"]').fill('adam.szychlinski@itmagination.com')
    await page.locator('textarea[name="message"]').fill('lubię placki')

    await page.locator('input[type="reset"]').click();

    await expect(page.locator('input[name="first_name"]')).toHaveText('');
    await expect(page.locator('input[name="last_name"]')).toHaveText('');
    await expect(page.locator('input[name="email"]')).toHaveText('');
    await expect(page.locator('textarea[name="message"]')).toHaveText('');

});


test('4b', async ({page}) => {
    // Wprowadzamy cześć danych i próbujemy wysłać - sprawdzamy komunikat błędu

    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
    await page.locator('input[name="email"]').fill('adam.szychlinski@itmagination.com');

    await page.locator('input[type="submit"]').click();

    await expect(page.locator('body')).toContainText('Error: all fields are required');

});


test('4c', async ({page}) => {
    // Wprowadzamy błędny email i sprawdzamy komunikat

    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
    await page.locator('input[name="first_name"]').fill('Adam')
    await page.locator('input[name="last_name"]').fill('Szychliński')
    await page.locator('input[name="email"]').fill('adam.szychlinski@itmagination')
    await page.locator('textarea[name="message"]').fill('lubię placki')

    await page.locator('input[type="submit"]').click();

    await expect(page.locator('body')).toContainText('Error: Invalid email address');

});


test('4d', async ({page}) => {
    // Wprowadzamy wszystkie dane i sprawdzamy komunikat

    await page.goto('https://webdriveruniversity.com/Contact-Us/contactus.html');
    await page.locator('input[name="first_name"]').fill('Adam')
    await page.locator('input[name="last_name"]').fill('Szychliński')
    await page.locator('input[name="email"]').fill('adam.szychlinski@itmagination.com')
    await page.locator('textarea[name="message"]').fill('lubię placki')

    await page.locator('input[type="submit"]').click();

    await expect(page.locator('h1')).toContainText('Thank You for your Message!');

});

test('4f', async ({page}) => {
    // Wybieramy wszystkie możliwe opcje z dropdownow i sprawdzamy ich wartości czy są poprawne

    await page.goto('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

    const dropdowns = await page.locator('.dropdown-menu-lists:not(#fruit-selects)');
    const dropdownsCount = await dropdowns.count();
    for (let i = 1; i < dropdownsCount + 1; ++i) {
        const currentOptionStrings = await page.locator(`#dropdowm-menu-${i} option`).allTextContents();
        const currentOptionStringsCount = await currentOptionStrings.length;
        for (let j = 0; j < currentOptionStrings.length; j++) {
            await page.selectOption(`#dropdowm-menu-${i}`, currentOptionStrings[j].toLowerCase());
        }
    }
    
});


test('4g', async ({page}) => {
    // Zaznaczamy wszystkie checkboxy a następnie odznaczamy 2 i 4 - sprawdzamy czy  zostały odznaczone i zaznaczone poprawnie

    await page.goto('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

    await page.check('input[value="option-1"]');
    await page.check('input[value="option-2"]');
    await page.check('input[value="option-4"]');
    await page.uncheck('input[value="option-2"]');
    await page.uncheck('input[value="option-4"]');

    await expect(page.locator('input[value="option-1"]')).toBeChecked();
    await expect(page.locator('input[value="option-2"]')).not.toBeChecked();
    await expect(page.locator('input[value="option-3"]')).toBeChecked();
    await expect(page.locator('input[value="option-4"]')).not.toBeChecked();

});

test('4h', async ({page}) => {
    // Klikamy wszystkie Radio buttony po każdym kliknięciu sprawdzamy czy zaznaczył się ten który chcieliśmy

    await page.goto('https://webdriveruniversity.com/Dropdown-Checkboxes-RadioButtons/index.html');

    const radios = page.locator('input[type="radio"]:not([disabled])');
    const count = await radios.count();
    for (let i = 0; i < count; ++i) {
        await radios.nth(i).check();
        await expect(radios.nth(i)).toBeChecked();
    }
});

test('6', async ({page}) => {
    // "Automatyzujemy stronę Datepicker - wpisujemy date i sprawdzamy czy została wybrana poprawna"
    // w tym datepickerze nie da rady pisać z palca... musiałem wymyślić coś innego do zrobienia

    const date = new Date()
    const today = date.getDate()
    const tomorrow = today + 1

    await page.goto('https://webdriveruniversity.com/Datepicker/index.html');
    await page.locator('div input').click();
    await expect(page.locator('.today.day')).toHaveText(today.toString());
    await page.locator('.today + td').click();
    await page.locator('div input').click();
    await expect(page.locator('.active.day')).toHaveText(tomorrow.toString());

});

test('7', async ({page}) => {
    // Automatyzujemy stronę Autocomplete TextField - wpisujemy 3 pierwsze znaki i wybieramy 2 element z listy podpowiadanej np. ('chi')

    await page.goto('https://webdriveruniversity.com/Autocomplete-TextField/autocomplete-textfield.html');
    await page.locator('#myInput').fill('Chi');
    await page.locator('#myInputautocomplete-list > div:first-of-type').click();
    await expect(page.locator('#myInput')).toHaveJSProperty('value', 'Chicken');

});

test('8', async ({page}) => {
    // Automatyzujemy stronę Ajax-Loader - czekamy aż strona się załaduje(bez statycznych waitow) i klikamy guzik

    await page.goto('https://webdriveruniversity.com/Ajax-Loader/index.html');
    await page.waitForSelector('#loader', {state: 'hidden', timeout: 15000});
    await page.waitForSelector('div#myDiv', {state: 'visible', timeout: 5000});
    await page.locator('#myDiv p').click();
    await page.waitForSelector('#myModalClick', {state: 'visible', timeout: 5000});
    await expect(page.locator('.modal-title')).toHaveText('Well Done For Waiting....!!!');

});
