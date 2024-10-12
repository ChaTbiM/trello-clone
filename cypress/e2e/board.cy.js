import boardMockData from '../../mocks/board.js';

const lists = boardMockData.lists;
const numberOfLists = lists.length;

const initialTitle = boardMockData.lists[0].cards[0].title;
const updatedTitle = ' Updated Card Title';

// Code Structure below of the test generated by chatgpt and seems enough so it was modified to fit the exact mock data information and to use the custom command
describe('Project Management Board E2e', () => {
	beforeEach(() => {
		// Visit the application before each test
		cy.visit('/');
	});

	it('should display the board with lists and cards', () => {
		// Check for board title
		cy.get('h1').contains('Project Management Board').should('be.visible');

		// Verify all lists and cards
		cy.getByCy('list.container').should('have.length', numberOfLists);

		cy.getByCy('list.container').each((list, index) => {
			const listTitle = lists[index].name;
			const listCards = lists[index].cards;

			// Verify the list title
			cy.wrap(list)
				.find('[data-cy="list.title"]')
				.should('be.visible')
				.contains(listTitle, { matchCase: false });

			// Verify cards count
			cy.wrap(list)
				.find('[data-cy="card.container"]')
				.should('have.length', listCards.length);

			// Verify card titles
			cy.wrap(list)
				.find('[data-cy="card.title"]')
				.each((card, cardIndex) => {
					cy.wrap(card)
						.should('be.visible')
						.contains(listCards[cardIndex].title, { matchCase: false });
				});
		});
	});

	it('should allow adding a new card to a list', () => {
		const newCardTitle = 'New Test Card';
		const listIndex = 0; // Add card to the first list

		// Click on "Add a Card" button in the first list
		cy.getByCy('list.container')
			.eq(listIndex)
			.within(() => {
				cy.getByCy('list.initiateCreateCardButton').click();
			});

		// Verify an editable text area appears for entering the card title
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="card.title.editable"]')
			.should('be.visible')
			.type(newCardTitle);

		// Click on the "Add Card" button
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="list.createCardButton"]')
			.click();

		// Verify that the new card appears in the list
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="card.container"]')
			.should('have.length', lists[listIndex].cards.length + 1 + 1); // +1 for the last created card and the last + 1 for the last card for continues creation

		// Verify the new card's title
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="card.title"]')
			.last()
			.should('be.visible')
			.contains(newCardTitle);
	});

	it('should not allow adding an empty card', () => {
		const listIndex = 0; //

		// Click on "Add a Card" button in the second list
		cy.getByCy('list.container')
			.eq(listIndex)
			.within(() => {
				cy.getByCy('list.initiateCreateCardButton').click();
			});

		// Leave the input field empty and click "Add Card"
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="list.createCardButton"]')
			.click();

		// Verify that no new card was added
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="card.container"]')
			.should('have.length', lists[listIndex].cards.length + 1); //  last + 1 for the last card for continues creation
	});

	it('should allow canceling card creation', () => {
		const listIndex = 0; // First list

		// Click on "Add a Card" button in the first list
		cy.getByCy('list.container')
			.eq(listIndex)
			.within(() => {
				cy.getByCy('list.initiateCreateCardButton').click();
			});

		// Verify an editable text area appears
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="card.title.editable"]')
			.should('be.visible');

		// Click the close button to cancel card creation
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="list.closeCreateCardButton"]')
			.click();

		// Verify the input field is closed and no new card was added
		cy.getByCy('list.container')
			.eq(listIndex)
			.find('[data-cy="card.title.editable"]')
			.should('not.exist');
	});
	it('should allow updating a card title', () => {
		// Assuming each card has a "data-cy" attribute for easier targeting
		cy.getByCy('card.container')
			.first()
			.within(() => {
				cy.root().trigger('mouseover');

				// Click the Edit button to initiate card title update
				cy.getByCy('card.title').should('contain', initialTitle);
				cy.getByCy('edit.card.button').click({ force: true }); // Targeting the edit button in the card
			});
		// Ensure the card title becomes editable (textarea visible)
		cy.getByCy('frontCard.title.editable').should('be.visible');
		cy.getByCy('frontCard.title.editable').clear().type(updatedTitle);

		// Ensure the new title is typed correctly
		cy.getByCy('frontCard.title.editable').should('have.value', updatedTitle);

		// Click the Save button to update the card title
		cy.getByCy('frontCard.save').click();

		// Ensure the card title has been updated and the editable state is closed
		cy.getByCy('frontCard.title.editable').should('not.exist');
		cy.getByCy('card.title').should('contain', updatedTitle);
	});

	it('should cancel the update when clicking outside the card', () => {
		cy.getByCy('card.container')
			.first()
			.within(() => {
				// Initiate the card update
				cy.getByCy('edit.card.button').click({ force: true });
			});
		// Check that the textarea is visible
		cy.getByCy('frontCard.title.editable').should('be.visible');

		// Click outside the card to cancel the update (use a custom hook for this in your code)
		cy.get('body').click('topRight');

		// Ensure the textarea is closed and the original title is still visible
		cy.getByCy('frontCard.title.editable').should('not.exist');
		cy.getByCy('card.title').should('contain', initialTitle);
	});
});
