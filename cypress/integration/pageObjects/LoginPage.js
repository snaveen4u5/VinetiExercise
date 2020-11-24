class LoginPage
{
    clickSignUp()
    {
        return cy.get('#signin2');
    }

    signUpUserName()
    {
        return cy.get('#sign-username');
    }

    signUpPassword()
    {
        return cy.get('#sign-password');
    }

    signUpRegisterButton()
    {
        return cy.get("button[onclick='register()']");
    }

    signUpCancelButton()
    {
        return cy.get('#signInModal > .modal-dialog > .modal-content > .modal-footer > .btn-secondary');
    }

    clickLogin()
    {
        return cy.get('#login2');
    }

    loginUserName()
    {
        return cy.get('#loginusername');
    }

    loginPassword()
    {
        return cy.get('#loginpassword');
    }

    loginButton()
    {
        return cy.get("button[onclick='logIn()']");
    }
}
export default LoginPage;