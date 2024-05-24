class ShopPage
{
get getProductTitle()
    {
        return cy.get('h4.card-title')
    }
get getAddButton()
    {
        return cy.get('button.btn.btn-info')
    }
get getCheckoutbt()
    {
        return cy.get(':nth-child(3) .nav-link')
    }
get getProductatCart()
    {
        return cy.get('h4.media-heading a')
    }
get getCheckoutSub()
    {
        return cy.get('button.btn-success')
    }
get getCountryBox()
    {
        return cy.get('#country')
    }
get getCountrySuggetions()
    {
        return cy.get('div[class="suggestions"] li')
    }
get getcheckbox()
    {
        return cy.get("label[for='checkbox2']")
    }
get getPurcase()
    {
        return cy.get('input.btn-success')
    }
get getSuccessMessage()
    {
        return cy.get('div.alert-dismissible')
    }
get getProdPrice()
    {
        return cy.get('tr td:nth-child(4) strong')
    }
get getTotalPrice()
    {
        return cy.get('h3 strong')
    }

}

module.exports = new ShopPage;