describe('First step', function(){
  it('Visit webside smartpharmacy', function(){
    cy.visit('https://smartpharmacy.digihcs.com/')
  })

  it('Finds an elements', function(){
    cy.get('input[type=text]')
    .type('admin').should('have.value', 'admin')

    cy.get('input[type=password]')
    .type('12345678').should('have.value', '12345678')

    cy.get('input[type=checkbox]').check()

    cy.get('.bt-dang-nhap').click()
    cy.get('.notification-message').contains('Đăng nhập thành công!');
    cy.visit('https://smartpharmacy.digihcs.com/retail')

    cy.contains('Bán hàng').click({force: true})
    cy.wait(3000)
    cy.get('li[name=btn-create-cart]').click({force: true})
    cy.wait(1000)
    //cy.contains('Thanh toán (F9)').click()

  it('can assert on the alert text content', function () {
      const stub = cy.stub()

    cy.on('window:alert', stub)
    .get('button').click()
    .then(() => {
    expect(stub.getCall(0)).to.be.calledWith('Đơn hàng rỗng không được phép thanh toán')

      })

    })


    cy.contains('Gõ để tìm kiếm thuốc')

    // Xử lí tổng t
    cy.get('input[type=text]')
  })

})
