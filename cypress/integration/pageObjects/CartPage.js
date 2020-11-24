class CartPage
{
    addToCart()
    {
        return cy.get("a[onclick*='addToCart(1)']");
    }

    clickOnCart()
    {
        return cy.get('#cartur');
    }

    deviceValidation()
    {
        return cy.get('tr td:nth-child(2)');
    }

    cartItems()
    {
        return cy.get('tr td:nth-child(4)');
    }

    cleanUpCart()
    {
        return cy.get('.success > :nth-child(4) > a');
    }
}
export default CartPage;