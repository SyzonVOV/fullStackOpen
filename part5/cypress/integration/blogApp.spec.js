describe.only('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkai',
      password: 'salainen',
    };
    cy.request('POST', 'http://localhost:3001/api/users/', user);
  });

  it('Login form is shown', function () {
    cy.contains('login').click();
    cy.get('#loginFormComp').should('contain', 'Login');
  });

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('salainen');
      cy.get('#login-button').click();

      cy.contains('Matti Luukkainen logged-in');
      cy.contains('logout').click();
    });

    it('fails with wrong credentials', function () {
      cy.contains('login').click();
      cy.get('#username').type('mluukkai');
      cy.get('#password').type('wrong');
      cy.get('#login-button').click();
      cy.get('.modal-message')
        .should('contain', 'Wrong credentials')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
      cy.get('html').should('not.contain', 'Matti Luukkainen logged-in');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'mluukkai', password: 'salainen' });
      cy.createBlog({
        title: 'some title likes: 1',
        author: 'some author',
        url: 'some url',
        likes: 1,
      });
    });

    describe('When there are a lot of blogs', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'some title likes: 5',
          author: 'some author',
          url: 'some url',
          likes: 5,
        });
        cy.createBlog({
          title: 'some title likes: 16',
          author: 'some author',
          url: 'some url',
          likes: 16,
        });
        cy.createBlog({
          title: 'some title likes: 2',
          author: 'some author',
          url: 'some url',
          likes: 2,
        });
      });

      it('succeeds with sorting', function () {
        cy.get('.bullet-li').should('have.length', 4);
        cy.contains('sort').click();
        cy.get('.view').click({ multiple: true });
        cy.get('.likes').then(likes => {
          expect(likes[0]).to.contain(16);
        });
      });
    });

    it('A blog can be created', function () {
      cy.contains('new blog').click();
      cy.get('#title').type('new tittle');
      cy.get('#url').type('http://localhost:3000');
      cy.get('#author').type('author of new title');
      cy.contains('create').click();
      cy.contains(/^(a new blog)/);
    });

    it('A blog can be liked', function () {
      cy.contains('view').click();
      cy.contains('like').click();
      cy.get('.bullet-li').contains(/\w*:\s\d*\s/);
    });

    it('A blog can be deleted', function () {
      cy.contains('view').click();
      cy.contains('delete').click();
      cy.contains('the blog was deleted');
    });

    afterEach(() => {
      cy.get('#logout').click();
    });
  });
});
