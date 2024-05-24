const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const homePage = require("../../pageObjacts/HomePage")
const shopPage = require("../../pageObjacts/ShopPage")
const Jfix = require("../../../fixtures/example.json")
let name

//Scenario: Ecommerce products delivery
Given('I open Ecommerce page', () =>{
    cy.visit(Cypress.env('url')+"angularpractice/")
})

When('I add items in the cart', () =>{
    homePage.getEditBox.type(Jfix.name)
    homePage.twoWayDataBinding.should('have.value', Jfix.name)
    homePage.getEditBox.should('have.attr', 'minlength', '2')
    homePage.getEntrepreneurRadioButton.should('be.disabled')

    homePage.getEmailBox.type(Jfix.email)
    homePage.getPassWord.type(Jfix.password)
    homePage.getCheckMeOut.check()
    homePage.getGender.select(Jfix.gender)
    homePage.getRadio1.check()
    homePage.getCalender.type(Jfix.date)
    homePage.getSuccessButton.click()
    homePage.getSuccessAlert.contains(Jfix.submitText)

    homePage.getShopTab.click()
    cy.url().should('include', 'shop')
        
    Jfix.productName.forEach(function (element) {
        cy.selectProduct(element)
    })

    shopPage.getCheckoutbt.click()
})

Then('Validate the total prices', () =>{
    var sum=0
        shopPage.getProdPrice.each(($el,index,$list) =>
            {
                const prodPrice = $el.text()
                var result = prodPrice.split(" ")
                result = result[1].trim()
                cy.log(result)
                sum=Number(sum)+Number(result)  
            }).then(function()
            {
                cy.log(sum)
            })

        shopPage.getTotalPrice.then(function(element)
        {
            const finalValue = element.text()
            var totalSum = finalValue.split(" ")
            totalSum = totalSum[1].trim()
            expect(Number(totalSum)).to.equals(sum)
        })
        

        const array1 = []
        shopPage.getProductatCart.each((element) => {

            const text1 = element.text()
            array1.push(text1)
        }).then(()=>{
            expect(array1[1]).to.include(Jfix.productName[1])
        })
})

Then('select the country submit and verify Thankyou',() =>{
    //Continue for checkout
    shopPage.getCheckoutSub.click()
    shopPage.getCountryBox.type(Jfix.Country)
    
    shopPage.getCountrySuggetions.contains('India').click()
    shopPage.getcheckbox.click()
    shopPage.getPurcase.click()
    shopPage.getSuccessMessage. should('include.text',Jfix.SuccessText)
})

//Scenario: Filling the form to shop
When('I fill the form details',(dataTable) =>{
    name = dataTable.rawTable[1][0]
    homePage.getEditBox.type(name)
    homePage.getGender.select(dataTable.rawTable[1][1])
})

Then('Validate the forms bahavior',() =>{
    homePage.twoWayDataBinding.should('have.value', name)
    homePage.getEditBox.should('have.attr', 'minlength', '2')
    homePage.getEntrepreneurRadioButton.should('be.disabled')
})

Then('select the Shop page',() =>{
    homePage.getShopTab.click()
})