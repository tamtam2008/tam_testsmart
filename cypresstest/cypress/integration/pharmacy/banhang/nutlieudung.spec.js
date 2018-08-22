import setting from "../../../../setting.json"
describe('First step', function(){
  it('Restore data', function(){
    cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
    cy.wait(5000)
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

    //cy.contains('Bán hàng').click({force: true})
    cy.wait(5000)
    cy.get('li[name=btn-create-cart]').click({force: true})
    cy.get('.notification-message').first().invoke('text').should('match', /Tạo/g);
    cy.get('span[class="notification-dismiss"]').first().click({force: true})
    cy.get('input[name=select-stock]').type('100018', {force: true})
    cy.wait(2000)
    cy.get('.Select-menu').first().click()
    cy.wait(3000)
    cy.get('input[name=input-quantity-0]').type('2')
    cy.get('button[name=btn-add-stock]').click()
    // cy.get('.notification-message').first().invoke('text').should('match', /Tạo/g);
    // cy.get('span[class="notification-dismiss"]').first().click({force: true})

    //create information KH - save
    cy.wait(1000)
    cy.get('img[name=btn-create-customer]').click({force: true})
    cy.get('input[name=input-customer-name]').type('A Nam')
    cy.get('input[name=input-customer-mobile]').type('0797979')
    cy.get('select[name=select-customer-gender]').select('Nam')
    cy.get('textarea[name=input-customer-address]').type('xxxxxxxxxxxx')
    cy.get('button[name=btn-confirm-save-customer]').click()
    cy.contains('Tạo khách hàng thành công')

    //Thêm người kê đơn- save
    cy.wait(1000)
    cy.get('img[name=btn-create-prescriber]').click({force: true})
    cy.get('input[name=input-prescriber-name]').type('Mr B')
    cy.get('input[name=input-prescriber-mobile]').type('099999')
    cy.get('select[name=select-prescriber-gender]').select('Khác')
    cy.get('textarea[name=input-prescriber-address]').type('tí sửu dần')
    cy.get('button[name=btn-confirm-save-prescriber]').click()
    cy.contains('Tạo người kê đơn thành công')

    //Save prescriptions
    cy.get('button[name=btn-save-prescription]').click()
    cy.get('input[name=input-prescription-name]').type('cảm')
    cy.get('textarea[name=input-prescription-note]').type('txt')
    cy.get('button[name=btn-confirm-save-prescription]').click()

    //tạo đơn trống
    cy.wait(2000)
    cy.get('li[name=btn-create-cart]').click({force: true})
    cy.wait(3000)
    // cy.get('.notification-message').first().invoke('text').should('match', /Tạo/g);
    // cy.get('span[class="notification-dismiss"]').first().click({force: true})

    //nút đơn thuốc đã lưu
    cy.get('button[name="btn-prescription-saved"]').click({force: true})
    cy.contains('Áp dụng').first().click({force: true})
    cy.get('input[name="input-quantity-prescription"]').type('2')
    cy.get('button[name="btn-confirm-apply-prescription"]').click({force: true})
    //cy.contains('')


    // Select medicine
    cy.get('input[name=select-stock]').type('1000', {force: true})
    cy.wait(2000)
    cy.get('.Select-menu').first().click()
    cy.wait(2000)
    cy.get('input[name=input-quantity-0]').type('14')
    cy.get('button[name=btn-add-stock]').click()
    // cy.contains('Đặt thành công thuốc 100000')
    // cy.contains('Không đủ thuốc trong kho')
    cy.wait(1000)
    //edit medicine
    //lưu
    cy.get('input[name=input-edit-order-quantity-0-0]').click({force: true}).type('6')
    cy.wait(3000)
    cy.get('button[name=btn-save-order-quantity-0]').click()
    cy.contains('Thay đổi số lượng thành công')

    //lấy thuốc
    cy.wait(1000)
    cy.get('button[name="btn-get-stock-order-0"]').click({force: true})
    cy.contains('Không đủ thuốc trong kho')
    cy.get('span[class="notification-dismiss"]').first().click()

    //liều dùng
    cy.get('button[name="btn-show-dosage-order-0"]').click()
    cy.wait(3000)
    cy.get('input[name="input-dosage-order-0-morning"]').type('1')
    cy.get('input[name="input-dosage-order-0-noon"]').type('2')
    cy.get('input[name="input-dosage-order-0-afternoon"]').type('3')
    cy.get('button[name="btn-save-dosage-order-0"]').click()
    cy.contains('Thay đổi liều dùng thành công')
    cy.get('span[class="notification-dismiss"]').first().click({force: true})

    //Save prescriptions
    cy.get('button[name=btn-save-prescription]').click()
    cy.get('input[name=input-prescription-name]').type('cảm')
    cy.get('textarea[name=input-prescription-note]').type('txt')
    cy.get('button[name=btn-confirm-save-prescription]').click()
    cy.contains('Lưu đơn thuốc thành công')
    cy.get('span[class="notification-dismiss"]').first().click({force: true})


    //test áp dụng đơn lưu cho đơn có thuốc
    // cy.get('button[name="btn-apply-prescription-1"]').click()
    // cy.get('input[name="input-quantity-prescription"]').type('2')
    // cy.get('button[name="btn-confirm-apply-prescription"]').click()
    // cy.wait(1000)
    // cy.contains('Dùng đơn thuốc thành công')
    // cy.get('span[class="notification-dismiss"]').first().click({force: true})


    //nút lịch sử bán hàng
    cy.get('button[name="btn-history-cart"]').click()

    cy.get('button[name="btn-close-cart-history"]').click()

    //nút ghi chú
    cy.get('button[name="btn-note"]').click()
    cy.get('textarea[name="input-cart-note"]').type('cảm')
    cy.get('button[name="btn-cancel-save-cart-note"]').click()
    cy.get('button[name="btn-note"]').click({force: true})
    cy.get('textarea[name="input-cart-note"]').clear().type('đau đầu')
    cy.get('button[name="btn-confirm-save-cart-note"]').click()
    cy.contains('Thay đổi ghi chú thành công')
    cy.get('span[class="notification-dismiss"]').first().click({force: true})

    //xóa thuốc đã chọn trong đơn
    cy.get('button[name="btn-delete-stock-order-0"]').click({force: true})
    cy.wait(1000)
    cy.get('.notification-message').first().invoke('text').should('match', /Xóa thành công khỏi đơn hàng thuốc/g);
    cy.get('span[class="notification-dismiss"]').first().click({force: true})

   })
 })
