import setting from "../../../../setting.json"
import tenthuoc from '../../data/ten_thuoc.json';

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
    //nhập kho
    cy.wait(setting.wait)
    cy.visit('https://smartpharmacy.digihcs.com/new-store-import')
    cy.wait(setting.waitdata)
    cy.get('input[name="storeImportForm.selectStore"]').type('Shop', {force: true})
    cy.wait(setting.wait)
    cy.get('.Select-menu').first().click()

    //Tạo phiếu nhập
    cy.get('button[name="createStockModel.create"]').click({force: true})
    cy.get('input[name="storeImportForm.selectProvider"]').type('NCC', {force: true})
    cy.get('.Select-menu').first().click()
    cy.get('button[name="addNewDialog.save"]').click()
    cy.get('.notification-message').first().invoke('text').should('match', /Tạo thành công/g);
    cy.get('span[class="notification-dismiss"]').first().click()

    for(let j=0; j <= 40; j++){
      cy.get('input[name="searchTool.selectStock"]').type(tenthuoc.data[j].code, {force: true})
      cy.wait(setting.wait * 2)
      cy.get('.Select-menu').first().click()
      // cy.wait(setting.wait * 2)
      cy.get('input[name="quantity"]').type('3')
      // cy.wait(setting.wait * 2)
      cy.get('button[name="stockImportDetail.add"]').click({force: true})
      cy.wait(setting.wait * 2)
    }
    cy.wait(setting.wait)
    cy.get('button[name="importFormMenu.verify"]').click()
    cy.wait(setting.wait)*2
    cy.get('button[name="storeImportForm.verify"]').click()
    cy.wait(setting.wait)
    // cy.get('.notification-message').first().invoke('text').should('match', /Tính/g);
    // cy.get('span[class="notification-dismiss"]').first().click()
    //bán hàng
    cy.visit('https://smartpharmacy.digihcs.com/retail')


    //cy.contains('Bán hàng').click({force: true})
    cy.wait(setting.waitdata)
    cy.get('li[name=btn-create-cart]').click({force: true})
    cy.wait(setting.waitdata)
    // Select medicine
    for(let i = 0; i <= 40; i++) {
      cy.get('input[name=select-stock]').type(tenthuoc.data[i].code, {force: true})
      cy.wait(setting.wait*2)
      cy.get('.Select-menu').first().click({force:true})
      cy.wait(setting.wait*2)
      cy.get('input[name=input-quantity-0]').type('2')
      cy.wait(setting.wait)
      cy.get('button[name=btn-add-stock]').click({force: true})
    }
    // cy.contains('Đặt thành công thuốc 100000')
    // cy.contains('Không đủ thuốc trong kho')
    cy.wait(setting.waitdata)
    //edit medicine ( thuốc không có trong kho)
    //cy.get('button[name="btn-edit-stock-sell-0"]').click()
    cy.get('input[name=input-edit-order-quantity-0-0]').type('5', {force: true})
    cy.wait(setting.wait)
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
    cy.get('input[name=input-customer-name]').type('Nguyễn Kim')
    cy.wait(setting.wait)
    cy.get('input[name=input-customer-mobile]').type('0797979')
    cy.wait(setting.wait)
    cy.get('select[name=select-customer-gender]').select('Nam')
    cy.wait(setting.wait)
    cy.get('textarea[name=input-customer-address]').type('xxxxxxxxxxxx')
    cy.wait(setting.wait)
    cy.get('button[name=btn-confirm-save-customer]').click()
    cy.wait(setting.wait)
    cy.contains('Tạo khách hàng thành công')

    //Thêm người kê đơn- save
    cy.wait(setting.wait)
    cy.get('img[name=btn-create-prescriber]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-prescriber-name]').type('Mr A')
    cy.wait(setting.wait)
    cy.get('input[name=input-prescriber-mobile]').type('099999')
    cy.wait(setting.wait)
    cy.get('select[name=select-prescriber-gender]').select('Khác')
    cy.wait(setting.wait)
    cy.get('textarea[name=input-prescriber-address]').type('tí sửu dần')
    cy.wait(setting.wait)
    cy.get('button[name=btn-confirm-save-prescriber]').click()
    cy.wait(setting.wait)
    cy.contains('Tạo người kê đơn thành công')

    //
    cy.wait(setting.wait)
    cy.get('textarea[name=input-diagnosis]').type('pikachu')
    cy.wait(setting.wait)
    cy.get('button[name=btn-save-diagnosis]').click()
    cy.wait(setting.wait)
    cy.contains('Thay đổi chẩn đoán thành công')

    //Discount VND
    cy.wait(setting.wait)
    cy.get('button[name=btn-discount-vnd]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-discount-vnd]').type('15000')
    cy.wait(setting.wait)
    cy.get('button[name=btn-save-discount]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=input-customer-pay]').type('100000000')

    //Save prescriptions
    cy.wait(setting.wait)
    cy.get('button[name=btn-save-prescription]').click()
    cy.wait(setting.wait)
    cy.get('input[name=input-prescription-name]').type('cảm')
    cy.wait(setting.wait)
    cy.get('input[name="input-prescription-price"]').type('172500')
    cy.wait(setting.wait)
    cy.get('textarea[name=input-prescription-note]').type('txt')
    cy.wait(setting.wait)
    cy.get('button[name=btn-confirm-save-prescription]').click()

    //Pay - no return
    cy.wait(setting.wait)
    cy.get('button[name=btn-payment-cart]').click()
    cy.wait(setting.wait)
    cy.get('button[name=btn-return-payment-cart]').click()
    cy.wait(setting.wait)
    cy.contains('Thanh toán đơn hàng thành công')
  })
})
