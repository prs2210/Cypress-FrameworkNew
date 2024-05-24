/// <reference types="Cypress"  />

describe('API Test', () => {

    //Test1
    it('API Library', () => {

        cy.visit('https://rahulshettyacademy.com/angularAppdemo/')

        cy.intercept({
            method: 'GET',
            url: 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty'
        },
            {
                statusCode: 200,
                body: [
                    {
                        "book_name": "RestAssured with Java",
                        "isbn": "BSG",
                        "aisle": "2302"
                    }
                ]
            }).as('bookretrivals')

        cy.get('.btn-primary').click()
        cy.wait('@bookretrivals').then(({ request, response }) => {
            cy.get('tr').should('have.length', response.body.length + 1)
        })


        cy.get('p').should('have.text', 'Oops only 1 Book available')

        //length of the response array = rows of the table
    })


    //Test2
    it('API Test', () => {

        cy.visit("https://rahulshettyacademy.com/angularAppdemo/");

        cy.intercept('GET', 'https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=shetty',
            (req) => {
                req.url = "https://rahulshettyacademy.com/Library/GetBook.php?AuthorName=malhotra"

                req.continue((res) => {
                    // expect(res.statusCode).to.equal(403)
                })
            }
        ).as("dummyUrl")

        cy.get('.btn-primary').click()
        cy.wait('@dummyUrl')

    })

    //Test3
    //Test2
    it('API Test', () => {

        cy.request('POST', 'https://216.10.245.166/Library/Addbook.php',
            {
                "name": "Learn Appium Automation with Java",
                "isbn": "bcggss",
                "aisle": "22s7",
                "author": "John Foe"
            }).then(function (response) {
                expect(response.body).to.have.property("Msg", "successfully added"),
                    expect(response.status).to.eq(200)
            })

    })

})