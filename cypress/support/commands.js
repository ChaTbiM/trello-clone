Cypress.Commands.add('getByCy', (selector, ...args) => {
	return cy.get(`[data-cy="${selector}"]`, ...args);
});
