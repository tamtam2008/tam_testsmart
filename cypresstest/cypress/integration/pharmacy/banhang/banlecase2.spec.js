import setting from "../../../../setting.json"

describe('First step', function(){
  // it('Restore data', function(){
  //   cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
  // })
  it('Visit webside smartpharmacy', function(){
    cy.visit(setting.webLink)
  })
  it('Finds an elements', function(){
    cy.get('input[type=text]')
    .type('admin').should('have.value', 'admin')

    cy.get('input[type=password]')
    .type('12345678').should('have.value', '12345678')

    cy.get('input[type=checkbox]').check()

    cy.get('.bt-dang-nhap').click()
    cy.get('.notification-message').contains('Đăng nhập thành công!');
    cy.visit(setting.webLink + setting.retail)

    cy.wait(setting.waitdata)
    //cy.contains('Bán hàng').click({force: true})
    cy.get('li[name=btn-create-cart]').click({force: true})
    //cy.get('.notification-message').contains('Tạo thành công đơn hàng XB-Shop-000014')

    // Select medicine (1)
    cy.wait(setting.waitdata)
    cy.get('input[name=select-stock]').type('100021', {force: true})
    cy.wait(3000)
    cy.get('.Select-menu').first().click()
    cy.wait(setting.wait)
    cy.get('input[name=input-quantity-0]').type('14')
    cy.wait(setting.wait)
    cy.get('button[name=btn-add-stock]').click()
    // cy.contains('Đặt thành công thuốc 100000')
    // cy.contains('Không đủ thuốc trong kho')
    cy.wait(setting.waitdata)
    //edit medicine
    cy.get('input[name=input-edit-order-quantity-0-0]').click().type('5')
    cy.wait(setting.waitdata)
    cy.get('button[name=btn-save-order-quantity-0]').click({force: true})
    cy.contains('Thay đổi số lượng thành công')

    // Select medicine (2)
    cy.wait(setting.wait)
    cy.get('input[name=select-stock]').type('100000', {force: true})
    cy.wait(setting.waitdata)
    cy.get('.Select-menu').first().click()
    cy.wait(setting.wait)
    cy.get('input[name=input-quantity-0]').type('1')
    cy.wait(setting.wait)
    cy.get('button[name=btn-add-stock]').click()

    cy.wait(setting.waitdata)
    //edit medicine
    cy.get('input[name=input-edit-order-quantity-0-0]').type('2')
    cy.wait(setting.waitdata)
    cy.get('button[name=btn-save-order-quantity-0]').click({force: true})
    cy.wait(setting.wait)
    cy.contains('Thay đổi số lượng thành công')
    cy.get('span[class="notification-dismiss"]').first().click({force: true})

    // liều dùng
    cy.get('button[name="btn-show-dosage-order-0"]').click()
    cy.wait(setting.waitdata)
    cy.get('input[name="input-dosage-order-0-morning"]').type('1')
    cy.get('input[name="input-dosage-order-0-noon"]').type('2')
    cy.get('input[name="input-dosage-order-0-afternoon"]').type('3')
    cy.wait(setting.wait)
    cy.get('button[name="btn-save-dosage-order-0"]').click()
    cy.wait(setting.wait)
    cy.contains('Thay đổi liều dùng thành công')
    cy.get('span[class="notification-dismiss"]').first().click({force: true})

    // delete medicine, delete message form  window
    // const stub = cy.stub()
    // cy.on(')window:confirm', stub)
    // cy.get('button[name=btn-delete-stock-order-0]').click({force:true}).then(() => {
    //   expect(stub.getCall(0)).to.be.calledWith('Bạn muốn xóa khỏi đơn hàng 1 Hop  100000?')
    // })
    //Xóa thành công khỏi đơn hàng thuốc 100000
    //cy.get('.notification-message').first().invoke('text').should('match', /Xóa/g);

    //create information KH - cancel
    cy.wait(setting.wait)
    cy.get('img[name=btn-create-customer]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-customer-name]').type('tí')
    cy.wait(setting.wait)
    cy.get('input[name=input-customer-mobile]').type('0797979')
    cy.wait(setting.wait)
    cy.get('select[name=select-customer-gender]').select('Nữ')
    cy.wait(setting.wait)
    cy.get('textarea[name=input-customer-address]').type('xxxxxxxxxxx')
    cy.wait(setting.wait)
    cy.get('button[name=btn-cancel-save-customer]').click()

    //thêm người kê đơn - Hủy
    cy.wait(setting.wait)
    cy.get('img[name=btn-create-prescriber]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-prescriber-name]').type('Ms B')
    cy.wait(setting.wait)
    cy.get('input[name=input-prescriber-mobile]').type('088888')
    cy.wait(setting.wait)
    cy.get('select[name=select-prescriber-gender]').select('Nữ')
    cy.wait(setting.wait)
    cy.get('textarea[name=input-prescriber-address]').type('dần mẹo')
    cy.wait(setting.wait)
    cy.get('button[name=btn-cancel-save-prescriber]').click()


    //Discount %
    cy.wait(setting.wait)
    cy.get('button[name=btn-discount-percent]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-discount-percent]').type('15.3')
    cy.wait(setting.wait)
    cy.get('button[name=btn-save-discount]').click({force: true})
    cy.wait(setting.wait)
    cy.get('i[name=btn-math-round-down]').dblclick({force: true})
    cy.wait(setting.wait)
    cy.get('i[name=btn-math-round-up]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-customer-pay]').type('1000000')

    //Save prescriptions
    cy.wait(setting.wait)
    cy.get('button[name=btn-save-prescription]').click()
    cy.wait(setting.wait)
    cy.get('input[name=input-prescription-name]').type('cúm')
    cy.wait(setting.wait)
    cy.get('input[name="input-prescription-price"]').type('172500')
    cy.wait(setting.wait)
    cy.get('textarea[name=input-prescription-note]').type('vat')
    cy.wait(setting.wait)
    cy.get('button[name=btn-cancel-save-prescription]').click()

    //Pay
    cy.wait(setting.wait)
    cy.get('button[name=btn-payment-cart]').click()
    cy.wait(setting.wait)
    cy.get('button[name=btn-return-payment-cart]').click()
    cy.wait(setting.wait)
    cy.contains('Thanh toán đơn hàng thành công')

  })
})
