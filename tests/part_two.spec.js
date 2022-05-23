const {test,expect} = require('@playwright/test');
const {CommonActions} = require('../page_objects/part_two/commonActions');
const {ProductPage} = require('../page_objects/part_two/productPage');
const {LoginPage} = require('../page_objects/part_two/loginPage');
const {TopNavigation} = require('../page_objects/part_two/topNavigation');
const {AddressPage} = require('../page_objects/part_two/addressPage');
const {InsertAddressPage} = require('../page_objects/part_two/insertAddressPage');
const {CartPage} = require('../page_objects/part_two/cartPage');
const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
const products = require('../test_data/products.json');


test('1', async ({page}) => {
    // Napisz test dodający koszulkę oraz buty do koszyka (bez użycia wyszukiwarki), następnie przy pomocy
    // wyszukiwarki dodaj jakiś kosmetyk i doprowadź zamówienie do finalizacji :) - sprawdź czy wszystko poszło OK

    const commonActions = new CommonActions(page);
    const productPage = new ProductPage(page);
    
    await commonActions.addProductToCartById(products.tshirts.CASUAL_BASEBALL.id);
    await commonActions.addProductToCartById(products.shoes.WOMENS_STILETTO.id);
    await commonActions.performSearch(products.cosmetics.OBSESSION.name);
    await productPage.clickAddToCart();
    await commonActions.performCheckout();
});

test('2', async ({page}) => {
    // Sprawdź czy dane na ekranie wprowadzania adresu są walidowane poprawnie w formularzu

    const commonActions = new CommonActions(page);
    const loginPage = new LoginPage(page);
    const topNavigation = new TopNavigation(page);
    const addressPage = new AddressPage(page);
    const insertAddressPage = new InsertAddressPage(page);

    await commonActions.open()
    await loginPage.performLogin()
    await topNavigation.clickAddressBookButton()
    await addressPage.clickNewAddressButton()
    await insertAddressPage.clickContinueButton()
    await insertAddressPage.verifyAmountOfErrorsEquals(6)
    await insertAddressPage.testLowerBoundary()
    await insertAddressPage.verifyAmountOfErrorsEquals(6)
    await insertAddressPage.testUpperBoundary()
    await insertAddressPage.verifyAmountOfErrorsEquals(6)
    await insertAddressPage.testCorrectData()
    await insertAddressPage.verifyAmountOfErrorsEquals(0)
          // test nie przechodzi do końca bo znajduje błąd - walidacja dwóch inputów jest niewłaściwa
    await addressPage.verifyYouAreHere()
    await addressPage.verifyAddressInserted()
});

test('3', async ({page}) => {
    // Sprawdź czy po dodaniu artykułu do koszyka poprawnie zmienia się ilość oraz wartość koszyka nad paskiem menu strony

    const cartPage = new CartPage(page);
    const commonActions = new CommonActions(page);
    const topNavigation = new TopNavigation(page);

    await cartPage.goToCart()
    await cartPage.verifyCartIsEmpty()
    await commonActions.addProductToCartById(products.shoes.WOMENS_STILETTO.id)
    await topNavigation.verifyCartStatus('1', products.shoes.WOMENS_STILETTO.price * 1)
    await commonActions.addProductToCartById(products.shoes.WOMENS_STILETTO.id)
    await topNavigation.verifyCartStatus('2', products.shoes.WOMENS_STILETTO.price * 2)
    await commonActions.addProductToCartById(products.shoes.WOMENS_STILETTO.id)
    await topNavigation.verifyCartStatus('3', products.shoes.WOMENS_STILETTO.price * 3)
});