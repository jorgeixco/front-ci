/* eslint-disable no-undef */
describe('template spec', () => {
  const mockProducts = [
    {
      id: 1,
      name: 'Coca Cola',
      price: 100,
      image:
        'https://th.bing.com/th/id/OIP.obktQem1N_lq5KLZ3ErARwHaHa?w=600&h=600&rs=1&pid=ImgDetMain',
    },
    {
      id: 2,
      name: 'Pepsi',
      price: 100,
      image:
        'https://oasisvinosylicores.com/wp-content/uploads/2022/01/Pepsi-2-L.jpg',
    },
    {
      id: 3,
      name: 'Sprite',
      price: 100,
      image:
        'https://th.bing.com/th/id/OIP.hJS0fj42Y5F8NWO2wR8JuAHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 4,
      name: 'Fanta',
      price: 100,
      image:
        'https://th.bing.com/th/id/OIP.ZhSim07u7ZyO3tU4YMgLQAHaHa?rs=1&pid=ImgDetMain',
    },
    {
      id: 5,
      name: '7up',
      price: 100,
      image:
        'https://th.bing.com/th/id/OIP.DZnvBJ9ulyaglJ9CNv0YxQHaM7?rs=1&pid=ImgDetMain',
    },
  ];

  it('passes', () => {
    cy.intercept('GET', '/api/products', { body: mockProducts }).as(
      'getProducts'
    );

    cy.visit('/');

    cy.wait('@getProducts');

    cy.contains('h1', 'Lista de productos');

    cy.get('ul').children().should('have.length', mockProducts.length);

    mockProducts.forEach((product, index) => {
      cy.get('li')
        .eq(index)
        .within(() => {
          cy.get('h2').contains(product.name);
          cy.get('p').contains(`Precio: ${product.price}`);
        });
    });

    cy.get('li').contains('Coca Cola').click();

    // Aquí puedes verificar si el componente `ViewObject` se renderizó
    cy.get('h1').contains('Product Coca Cola');
  });
});
