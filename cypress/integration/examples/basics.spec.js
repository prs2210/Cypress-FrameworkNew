/// <reference types="Cypress"  />
/// <reference types="cypress-iframe" />
import 'cypress-iframe'

describe('My First Test suite', function () {

    //Test-1
    it('My First Test case', function () {

        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.get('.search-keyword').type('ca')
        cy.wait(3000)
        cy.get('.product').as('productLocator')
        cy.get('@productLocator').should('have.length', 5)
        cy.get('.product:visible').should('have.length', 4)
        //Parent child chaining
        cy.get('.products').find('.product').should('have.length', 4)

        cy.get('.products').find('.product').eq(2).contains('ADD TO CART').click().then(function () {
            console.log('sf')
        })

        cy.get('.products').find('.product').each(($el, index, $list) => {

            const textVeg = $el.find('h4.product-name').text()
            if (textVeg.includes('Cashews')) {
                cy.wrap($el).find('.increment').click()
                cy.wrap($el).find('button').click()
            }
        })

        //assert if logo text is correctly displayed
        cy.get('.brand').should('have.text', 'GREENKART')

        //this is to print in logs
        cy.get('.brand').then(function (logoelement) {
            cy.log(logoelement.text())
        })

        cy.get('footer>p').then(function (footertexts) {
            cy.log(footertexts.text())
        })


    })

    //Test-2
    it('My Exercise', function () {
        cy.visit(Cypress.env('url') + "seleniumPractise/#/")
        cy.get('.search-keyword').type('b')
        cy.wait(2000)
        cy.get('.products').find('.product').should('have.length', 8)
        cy.get('.products').find('.product').eq(7).contains('ADD TO CART').click()
        cy.get('a.cart-icon').click()
        cy.wait(2000)
        cy.get(".action-block button[type='button']").contains('PROCEED TO CHECKOUT').click()
        cy.wait(2000)
        cy.get('.products').contains('Place Order').click()

    })

    //Test-3
    it('My Exercise', function () {
        cy.visit(Cypress.env('url') + "seleniumPractise/#/")
        cy.get('.search-keyword').type('b')
        cy.wait(2000)
        cy.get('.products').find('.product').should('have.length', 8)
        cy.get('.products').find('.product').each(($el, index, $list) => {
            const ProName = $el.find('h4.product-name').text()
            if (ProName.includes('Strawberry')) {
                cy.wrap($el).contains('ADD TO CART').click()
                cy.wrap($el).get('a.cart-icon').click()
                cy.wrap($el).get(".action-block button[type='button']").contains('PROCEED TO CHECKOUT').click()
                cy.wait(2000)
                cy.wrap($el).get('p.product-name').should('have.text', ProName)
                cy.wrap($el).get('.products').contains('Place Order').click()
            }
        })
    })

    //Test-4 Web Controls UI
    it('Web Controls UI', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.get('#checkBoxOption1').check().should('be.checked').and('have.value', 'option1')
        cy.wait(2000)
        cy.get('#checkBoxOption1').uncheck().should('not.be.checked')
        cy.get('input[type="checkbox"]').check(['option1', 'option2', 'option3'])

        //Static dropdown
        cy.get('fieldset select').select('option1').should('have.value', 'option1')

        //Dynamic dropdown
        cy.get('input#autocomplete').type("ind")

        cy.get('.ui-menu-item-wrapper').each(($el, index, $list) => {
            if ($el.text() === 'India') {
                $el.click()
            }

        })
        cy.get('input#autocomplete').should('have.value', 'India')

    })

    //Test-5
    it('My Exercise', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.get('#displayed-text').should('be.visible')
        cy.get('input[value="Hide"]').click()
        cy.get('#displayed-text').should('be.hidden')
        cy.get('input[value="Show"]').click()
        cy.get('#displayed-text').should('be.visible')

        cy.get('[value="radio1"]').check().should('be.checked')
    })

    //Test-6 Alert Control-1
    it('Alert Control-1', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.get('input#name').type('Pankaj Shinde')
        cy.get('#alertbtn').click()
        cy.get('input#name').type('Pankaj Shinde')
        cy.get('#confirmbtn').click()

        cy.on('window:alert', (str) => {
            //Mocha
            expect(str).to.equal('Hello Pankaj Shinde, share this practice page and share your knowledge')
        })

    })

    //Test-7 Alert Control-2
    it('Alert Control-2', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.get('input#name').type('Pankaj Shinde')
        cy.get('#confirmbtn').click()
        cy.on('window:alert', (str) => {
            //Mocha
            expect(str).to.equal('Hello Pankaj Shinde, Are you sure you want to confirm?')
        })

    })

    //Test-8 handle child window
    it('should handle child window', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.get('#opentab').invoke('removeAttr', 'target').click()
        cy.origin('https://www.qaclickacademy.com/', () => {
            cy.get('#navbarSupportedContent a[href*="about"]').click()
            cy.get('div.mt-50 h2').should('have.text', 'Welcome to QAClick Academy ')
            cy.url().should('include', 'qaclickacademy')
        })
    })

    //Test-9 Table Handle
    it('Table Handle', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.get('tr td:nth-child(2)').each(($el, index, $list) => {
            const course = $el.text()
            if (course.includes("Bugzilla")) {
                cy.get('tr td:nth-child(2)').eq(index).next().then(function (price) {
                    const priceText = price.text()
                    expect(priceText).to.equal('25')
                })
            }
        })
    })

    //Test-10 Mouse hover
    it('Mouse hover', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.get('.mouse-hover-content').scrollIntoView().invoke('show')
        cy.contains('Top').click({ force: true })
        cy.url().should('include', 'top')

        cy.get('.mouse-hover-content').invoke('show')
        cy.contains('Reload').click({ force: true })
        cy.url().should('not.include', 'top')
    })

    //Test-11 handle frames
    it('handle frames', function () {
        cy.visit(Cypress.env('url') + "AutomationPractice/")
        cy.frameLoaded('#courses-iframe')

        cy.iframe().find('a[href="mentorship"]').eq(0).click()
        cy.wait(2000)
        cy.iframe().find("h1[class*='pricing-title']").should('have.length', 2)
    })

    //Test-12 Calendar Handling
    it('Calendar Handling', function () {

        const monthNumber = "6"
        const day = "15"
        const year = "2030"
        const expectedList = [monthNumber, day, year];

        cy.visit(Cypress.env('url') + "seleniumPractise/#/")
        cy.get("a[href='#/offers']").invoke('removeAttr', 'target').click()
        cy.url().should('include', 'offers')
        cy.get('.react-date-picker__inputGroup').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__navigation__label').click()
        cy.get('.react-calendar__tile').contains(year).click()
        cy.get(".react-calendar__year-view__months__month").eq(Number(monthNumber) - 1).click();
        cy.get('.react-calendar__tile').contains(day).click()

        //Assertion
        cy.get(".react-date-picker__inputGroup__input").each(($el, index) => {
            cy.wrap($el).invoke('val').should('eq', expectedList[index]);
        })
    })


})