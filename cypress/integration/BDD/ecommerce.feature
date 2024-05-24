Feature: E to E

    Application Regression

    @Regression
    Scenario: Ecommerce products delivery
    Given I open Ecommerce page
    When I add items in the cart
    Then Validate the total prices
    And select the country submit and verify Thankyou

    @Smoke
    Scenario: Filling the form to shop
    Given I open Ecommerce page
    When I fill the form details
    | name | gender |
    | John | Female |
    Then Validate the forms bahavior
    
    And select the Shop page