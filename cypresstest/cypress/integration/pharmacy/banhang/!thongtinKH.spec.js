import setting from "../../../../setting.json"

describe('First step', function(){
  // it('Restore data', function(){
  //   cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
  //   cy.wait(5000)
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
    cy.visit('https://smartpharmacy.digihcs.com/retail')


    //cy.contains('Bán hàng').click({force: true})
    cy.wait(setting.waitdata)
    cy.get('li[name=btn-create-cart]').click({force: true})
    cy.wait(setting.waitdata)
    // Select medicine
    cy.get('input[name=select-stock]').type('100019', {force: true})
    cy.wait(setting.waitdata)
    cy.get('.Select-menu').first().click()
    cy.wait(setting.waitdata)
    cy.get('input[name=input-quantity-0]').type('9')
    cy.wait(setting.wait)
    cy.get('button[name=btn-add-stock]').click({force: true})
    // cy.contains('Đặt thành công thuốc 100000')
    // cy.contains('Không đủ thuốc trong kho')
    cy.wait(setting.waitdata)
    //edit medicine ( thuốc không có trong kho)
    //cy.get('button[name="btn-edit-stock-sell-0"]').click()
    cy.get('input[name=input-edit-order-quantity-0-0]').type('5', {force: true})
    cy.wait(setting.waitdata)
    cy.get('button[name=btn-save-order-quantity-0]').click({force: true})
    cy.wait(setting.wait)
    cy.contains('Thay đổi số lượng thành công')
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

    //create information KH - save
    cy.wait(setting.wait)
    cy.get('img[name=btn-create-customer]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-customer-name]').type('C Nga')
    cy.wait(setting.wait)
    cy.get('button[name=btn-confirm-save-customer]').click()
    cy.wait(setting.wait)
    cy.contains('Tạo khách hàng thành công')

    //Thêm người kê đơn- save
    cy.wait(setting.wait)
    cy.get('img[name=btn-create-prescriber]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-prescriber-name]').type('Bác sĩ')
    cy.wait(setting.wait)
    cy.get('button[name=btn-confirm-save-prescriber]').click()
    cy.wait(setting.wait)
    cy.contains('Tạo người kê đơn thành công')

    //chuẩn đoán
    cy.wait(setting.wait)
    cy.get('textarea[name=input-diagnosis]').type('cảm')
    cy.wait(setting.wait)
    cy.get('button[name=btn-save-diagnosis]').click()
    cy.wait(setting.wait)
    cy.contains('Thay đổi chẩn đoán thành công')

    //Pay - no return
    cy.wait(setting.wait)
    cy.get('button[name=btn-payment-cart]').click()
    cy.wait(setting.wait)
    cy.contains('Thanh toán đơn hàng thành công')

    //tạo đơn mới
    cy.wait(setting.waitdata)
    cy.get('li[name=btn-create-cart]').click({force: true})
    cy.wait(setting.waitdata)
    // Select medicine
    cy.get('input[name=select-stock]').type('100021', {force: true})
    cy.wait(setting.waitdata)
    cy.get('.Select-menu').first().click()
    cy.wait(setting.waitdata)
    cy.get('input[name=input-quantity-0]').type('2')
    cy.wait(setting.wait)
    cy.get('button[name=btn-add-stock]').click({force: true})
    //áp dụng với lịch sử khách cũ
    cy.wait(setting.waitdata)
    cy.get('input[name="select-customer"]').type('C Nga', {force: true})
    cy.wait(setting.waitdata)
    cy.get('.Select-menu').last().click()
    cy.wait(setting.wait)
    cy.get('img[name="btn-info-customer"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('li[name="list-customer-history"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[class="btn"]').first().click({force: true})
    // cy.wait(setting.wait)
    // cy.get('Bán lại hàng thành công')
    cy.wait(setting.wait)
    cy.get('button[name=btn-close-customer-history]').click()

    //thông tin KH
    cy.wait(setting.wait)
    cy.get('img[name="btn-info-customer"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('li[name="list-customer-info"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[name=btn-close-customer-info]').click()

    //điểm tích lũy
    cy.wait(setting.wait)
    cy.get('img[name="btn-info-customer"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('li[name="list-customer-point"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[name="btn-cancel-save-customer-point"]').click()
    cy.wait(setting.wait)
    cy.get('img[name="btn-info-customer"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('li[name="list-customer-point"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name="input-customer-point"]').click().type('12000')
    cy.wait(setting.wait)
    cy.get('button[name="btn-confirm-save-customer-point"]').click()

    // Select medicine
    cy.get('input[name=select-stock]').type('100019', {force: true})
    cy.wait(setting.waitdata)
    cy.get('.Select-menu').first().click()
    cy.wait(setting.waitdata)
    cy.get('input[name=input-quantity-0]').type('3')
    cy.wait(setting.wait)
    cy.get('button[name=btn-add-stock]').click({force: true})
    //thanh toán
    cy.wait(setting.wait)
    cy.get('button[name=btn-payment-cart]').click()
    cy.wait(setting.wait)
    cy.contains('Thanh toán đơn hàng thành công')
  })
})
