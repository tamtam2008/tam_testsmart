describe('First step', function(){
  it('Restore data', function(){
    cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
  })
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
    cy.get('li[name=btn-create-cart]').click({force: true})
    //cy.get('.notification-message').contains('Tạo thành công đơn hàng XB-Shop-000014')
    // Select medicine
    cy.get('input[name=select-stock]').type('h', {force: true})
    cy.wait(1000)
    cy.get('.Select-menu').first().click()

    cy.get('input[name=input-quantity-0]').type('14')
    cy.get('button[name=btn-add-stock]').click()
    // cy.contains('Đặt thành công thuốc 100000')
    // cy.contains('Không đủ thuốc trong kho')
    cy.wait(2000)
    //edit medicine
    cy.get('input[name=input-edit-order-quantity-0-0]').type('10')
    cy.wait(2000)
    cy.get('button[name=btn-save-order-quantity-0]').click({force: true})
    cy.contains('Thay đổi số lượng thành công')

    //create information KH - save
    cy.wait(1000)
    cy.get('img[name=btn-create-customer]').click({force: true})
    cy.get('input[name=input-customer-name]').type('Nguyễn Thanh Nhàn')
    cy.get('input[name=input-customer-mobile]').type('0797979')
    cy.get('select[name=select-customer-gender]').select('Nam')
    cy.get('textarea[name=input-customer-address]').type('xxxxxxxxxxxx')
    cy.get('button[name=btn-confirm-save-customer]').click()
    cy.contains('Tạo khách hàng thành công')

    //Thêm người kê đơn- save
    cy.wait(1000)
    cy.get('img[name=btn-create-prescriber]').click({force: true})
    cy.get('input[name=input-prescriber-name]').type('Bs Nguyễn Khương')
    cy.get('input[name=input-prescriber-mobile]').type('099999')
    cy.get('select[name=select-prescriber-gender]').select('Khác')
    cy.get('textarea[name=input-prescriber-address]').type('aBC-PHP')
    cy.get('button[name=btn-confirm-save-prescriber]').click()
    cy.contains('Tạo người kê đơn thành công')

    //
    cy.get('textarea[name=input-diagnosis]').type('pikachu')
    cy.get('button[name=btn-save-diagnosis]').click()
    cy.contains('Thay đổi chẩn đoán thành công')

    //Discount VND
    cy.get('button[name=btn-discount-vnd]').click({force: true})
    cy.get('input[name=input-discount-vnd]').type('15000')
    cy.get('button[name=btn-save-discount]').click({force: true})
    cy.get('i[name=btn-math-round-up]').click({force: true})
    cy.get('input[name=input-customer-pay]').type('1000000')

    //Save prescriptions
    cy.get('button[name=btn-save-prescription]').click()
    cy.wait(1000)
    cy.get('input[name=input-prescription-name]').type('cảm')
    cy.get('textarea[name=input-prescription-note]').type('txt')
    cy.get('button[name=btn-confirm-save-prescription]').click()

    //cancel
    cy.get('button[name=btn-cancel-cart]').click()
    cy.get('textarea[name=input-reason-cancel-cart]').type('xxxx')
    cy.get('button[name=btn-confirm-delete-cart]').click()



  })
})
