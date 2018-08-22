import setting from "../../../../setting.json"
describe('First step', function(){
  it('Restore data', function(){
    cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
    cy.wait(10000)
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
    cy.get('span[class="notification-dismiss"]').first().click()

    cy.visit('https://smartpharmacy.digihcs.com/new-store-import')
    // cy.contains('Quản lý').click({force: true})
    // cy.contains('Nhập kho').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name="storeImportForm.selectStore"]').type('Shop', {force: true})
    //cy.wait(2000)
    cy.get('.Select-menu').first().click()

    //Tạo phiếu nhập
    cy.get('button[name="createStockModel.create"]').click({force: true})
    cy.get('input[name="storeImportForm.selectProvider"]').type('NCC', {force: true})
    cy.get('.Select-menu').first().click()
    cy.get('button[name="addNewDialog.save"]').click()
    cy.get('.notification-message').first().invoke('text').should('match', /Tạo thành công/g);
    cy.get('span[class="notification-dismiss"]').first().click()

    //Tạo mới thuốc
    cy.wait(setting.wait)
    cy.contains('Tạo mới').click({force: true})
    cy.wait(setting.wait)
    cy.contains('Tên thuốc (viết tắt)').parent().find('div').find('input').type('ACT##')
    cy.wait(setting.wait)
    cy.contains('SỐ ĐĂNG KÍ').parent().find('div').find('input').type('VN-15')
    cy.wait(setting.wait)
    cy.contains('Tên biệt dược').parent().find('div').find('input').type('TTpd_-')
    cy.wait(setting.wait)
    cy.get('input[name=selectEditorActiveElement').type('AMPICILLIN').click()
    cy.wait(setting.wait)
    cy.get('input[name=selectEditorStockCategory').type('vitamin').click()
    cy.wait(setting.wait)
    cy.contains('Chọn quy cách').click({force: true})
    cy.wait(setting.wait)
    cy.contains('Hộp').click({force: true})
    cy.wait(setting.wait)
    cy.contains('Giá Hộp').parent().find('div').find('input').type('99000')
    cy.wait(setting.wait)
    cy.contains('Nhà SX').parent().find('div').find('input').type('TPHCM')
    cy.get('input[name="createSM.producerCountry1"]').type('Argentina', {force: true})
    cy.wait(setting.wait)
    //nút lưu
    cy.contains('Lưu').click({force: true})
    cy.wait(setting.wait)
    cy.get('.notification-message').contains('Thêm kiểu hàng thành công')

    //thông tin thuốc nhập
    cy.get('#modalInput').type('beez')
    cy.get('input[name="stockImportDetail.inputExpiration"]').type('2019-12-24')
    cy.get('input[name="stockImportDetail.inputPartNumber"]').type('12KK--')
    cy.get('input[name="quantity"]').type('9')
    cy.get('input[name="buy"]').clear()
    cy.get('select[name="stockImportDetail.percentFix"]').select('(%)')
    cy.get('input[name="stockImportDetail.percentValue"]').type('2')
    //cy.get('input[name="stockImportDetail.percentValue"]').type('2')
    cy.get('input[name="stockImportDetail.percentVAT"]').type('5')
    cy.get('button[name="stockImportDetail.add"]').click({force: true})
  })

})
