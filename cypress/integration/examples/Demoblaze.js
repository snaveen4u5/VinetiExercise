///<reference types = "Cypress"/>
import LoginPage from '../pageObjects/LoginPage'
import CartPage from '../pageObjects/CartPage'

describe('Suite - Demoblaze product validation', function() {

    before(function() {
        cy.fixture('example').then(function(data)
        {
            this.data=data
        })
    })

    after(function() {     
        //Clean up the cart by deleting the items added
        cy.get('tr td:nth-child(4)').each(($el, index, $list) => {
        cy.get('.success > :nth-child(4) > a').eq(index).click();
        })
        
        //Logout from the application
        cy.get('#logout2').click();
        })

    it('Testcase - Demoblaze product validation', function() {
        var loginPage = new LoginPage()
        var cartPage = new CartPage()

        cy.visit(Cypress.env('url'));
        
        //Create an account by clicking on Sign-up button
        loginPage.clickSignUp().click().wait(1000);
        loginPage.signUpUserName().type(this.data.username);
        loginPage.signUpPassword().type(this.data.password);
        loginPage.signUpRegisterButton().click().then(function(){
        
        //Handling the alert window
        cy.on('window:alert',(signUpMessage)=> {
            if(signUpMessage == this.data.signUpSuccessMessage)
            {
                expect(signUpMessage).to.equal(this.data.signUpSuccessMessage)
            }
            else
            {
                expect(signUpMessage).not.to.equal(this.data.signUpSuccessMessage)
            }
           })
        });

        //Login to the portal using new account credentials
        loginPage.signUpCancelButton().click();
        loginPage.clickLogin().click().wait(1000);
        loginPage.loginUserName().type(this.data.username);
        loginPage.loginPassword().type(this.data.password);
        loginPage.loginButton().click().wait(1000); 
        
        //User login validation
        cy.contains(this.data.userValidation).then(function(element) {
            var signInUser = element.text();
            expect(signInUser).to.equal(this.data.userValidation+' '+this.data.username)
        })
        
        //Added a custom command, addProduct, in commands.js under support folder
        this.data.deviceModel.forEach(function(element){
            cy.addProduct(element)
        });
        
       //Adding the desired device to the cart
        cartPage.addToCart().click().then(function(){
        
        //Validating the alert window upon successfully adding the device to the cart
        cy.on('window:alert',(str)=> {
        expect(str).to.equal('Product added.')
        })
        });
        
        //Navigate to cart page and verify if the product added is successful
        cartPage.clickOnCart().click();
        cartPage.deviceValidation().each(($el, index, $list) => {
            var productAdded = $el.text()
            expect(productAdded).contains(this.data.deviceModel)                
        })
})
})