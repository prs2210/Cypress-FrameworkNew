class HomePage
{
    get getEditBox()
    {
        return cy.get(':nth-child(1) > .form-control')
    }

    get twoWayDataBinding()
    {
        return cy.get(':nth-child(4) > .ng-pristine')
    }

    get getGender()
    {
        return cy.get('#exampleFormControlSelect1')
    }

    get getEntrepreneurRadioButton()
    {
        return cy.get('#inlineRadio3')
    }

    get getShopTab()
    {
        return cy.get(':nth-child(2) > .nav-link')
    }

    get getEmailBox()
    {
        return cy.get("[name='email']")
    }
    get getPassWord()
    {
        return cy.get('#exampleInputPassword1')
    }
   get getCheckMeOut()
    {
        return cy.get('#exampleCheck1')
    }
    get getRadio1()
    {
        return cy.get('#inlineRadio1')
    }
   get getCalender()
    {
        return cy.get("[name='bday']")
    }
    get getSuccessButton()
    {
        return cy.get('.btn-success')
    }
    get getSuccessAlert()
    {
        return cy.get('.alert')
    }
}

module.exports = new HomePage();