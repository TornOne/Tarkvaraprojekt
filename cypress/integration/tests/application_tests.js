describe('Basic info', function() {
	it('Finds and retrieves basic info', function() {
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('#first_name').type('Pille')
		cy.get('span:contains("Otsi")').click()
		cy.get('td:contains("PAGAN")').click()
		cy.get('#national_id').should('have.value', '47102042742')
	})
})

describe('Info modification', function() {
	it('Changes information', function() {
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('#first_name').type('Pille')
		cy.get('span:contains("Otsi")').click()
		cy.get('td:contains("PAGAN")').click()
		cy.get('span:contains("MUUDA ISIKUANDMEID")').click()
		cy.wait(3000)
		cy.get('#phone').type('{selectall}').type('12345')
		cy.get('span:contains("SALVESTA")').click()
		cy.get('p:contains(" Logi välja ")').click()
		
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('#first_name').type('Pille')
		cy.get('span:contains("Otsi")').click()
		cy.get('td:contains("PAGAN")').click()
		cy.get('#phone').should('have.value', '12345')
		cy.get('span:contains("MUUDA ISIKUANDMEID")').click()
		cy.get('#phone').type('{selectall}').type('3725074194')
		cy.get('span:contains("SALVESTA")').click()
	})
})

describe('Adding account', function() {
	it('Adds a new account', function() {
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('button[aria-label="Open drawer"]').click()
		cy.get('span:contains("Kasutajad")').click()
		cy.get('span:contains("Lisa uus kasutaja")').click()
		cy.get('#name').type('kasutaja')
		cy.get('#password').type('parool')
		cy.get('#password_again').type('parool')
		cy.get('span:contains("Salvesta")').click()
		cy.get('p:contains(" Logi välja ")').click()
		
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('kasutaja')
		cy.get('#password').type('parool')
		cy.get('span:contains("Sisene")').click()
		cy.get('#first_name')
		cy.get('p:contains(" Logi välja ")').click()
		
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('button[aria-label="Open drawer"]').click()
		cy.get('span:contains("Kasutajad")').click()
	})
})

describe('Adding incidents and sessions', function() {
	it('Adds a new incident and a session', function() {
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('#first_name').type('Pille')
		cy.get('span:contains("Otsi")').click()
		cy.get('td:contains("PAGAN")').click()
		cy.get('span:contains("Uus juhtum")').click()
		cy.get('span:contains("Salvesta")').click()
		cy.get('p:contains(" Logi välja ")').click()
		
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('#first_name').type('Pille')
		cy.get('span:contains("Otsi")').click()
		cy.get('td:contains("PAGAN")').click()
		cy.get('td:contains("asdf")').click()
		cy.get('span:contains("Uus Sessioon")').click()
		cy.get('span:contains("Salvesta")').click()
		cy.get('p:contains(" Logi välja ")').click()
		
		cy.visit('http://127.0.0.1')
		cy.get('#email').type('asdf')
		cy.get('#password').type('asdf')
		cy.get('span:contains("Sisene")').click()
		cy.get('#first_name').type('Pille')
		cy.get('span:contains("Otsi")').click()
		cy.get('td:contains("PAGAN")').click()
		cy.get('td:contains("asdf")').click()
		cy.get('td:contains("asdf")').click()
	})
})