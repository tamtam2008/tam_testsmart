import setting from "../../../../setting.json"


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
    cy.get('span[class="notification-dismiss"]').first().click()

    cy.visit('https://smartpharmacy.digihcs.com/new-store-import')
    // cy.contains('Quản lý').click({force: true})
    // cy.contains('Nhập kho').click({force: true})
    cy.wait(5000)
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

    //thông tin thuốc nhập
    cy.get('input[name="searchTool.selectStock"]').type('k', {force: true})
    cy.get('.Select-menu').first().click()
    cy.get('#modalInput').type('beez')
    cy.get('input[name="stockImportDetail.inputExpiration"]').type('2019-12-24')
    cy.get('input[name="stockImportDetail.inputPartNumber"]').type('12KK--')
    cy.get('input[name="quantity"]').type('9')
    cy.get('input[name="buy"]').clear().type('15000')
    cy.get('select[name="stockImportDetail.percentFix"]').select('(%)')
    cy.get('input[name="stockImportDetail.percentValue"]').type('2')
    cy.get('input[name="stockImportDetail.percentVAT"]').type('5')
    cy.get('button[name="stockImportDetail.add"]').click({force: true})
    // cy.wait(4000)
    // cy.get('button[name="importFormMenu.verify"]').click()
    // cy.get('button[name="storeImportForm.verify"]').click()
    // cy.get('.notification-message').first().invoke('text').should('match', /NK/g);
    // cy.get('span[class="notification-dismiss"]').first().click({force: true})

    //Sửa thông tin thuốc lưu
    cy.get('button[name="optionButton.update"]').click({force: true})
    cy.get('input[name="searchTool.selectStock"]').type('100062', {force: true})
    cy.wait(setting.wait)
    cy.get('.Select-menu').first().click({force: true})
    cy.wait(setting.wait)
    cy.get('button[name="storeImportForm.showHistoryGrid"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[name="storeImportForm.showHistoryGrid"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('#modalInput').clear().type('Kháng sinh')
    cy.get('input[name="stockImportDetail.inputExpiration"]').type('2020-01-24')
    cy.get('input[name="stockImportDetail.inputPartNumber"]').clear().type('10')
    cy.get('input[name="quantity"]').clear().type('8')
    cy.get('input[name="buy"]').clear().type('11000')
    cy.get('select[name="stockImportDetail.percentFix"]').select('($)')
    cy.get('input[name="stockImportDetail.percentValue"]').clear().type('1000')
    cy.get('input[name="stockImportDetail.percentVAT"]').type('5')
    cy.get('button[name="stockImportDetail.add"]').click({force: true})


    //thêm thuốc khác
    cy.wait(setting.wait)
    cy.get('input[name="searchTool.selectStock"]').type('100021', {force: true})
    cy.get('.Select-menu').first().click()
    cy.wait(setting.wait)
    cy.get('#modalInput').type('nobita')
    cy.get('input[name="stockImportDetail.inputExpiration"]').type('2019-12-24')
    cy.get('input[name="stockImportDetail.inputPartNumber"]').type('T14/')
    cy.get('input[name="quantity"]').type('20')
    cy.get('input[name="buy"]').clear().type('20000')
    cy.get('select[name="stockImportDetail.percentFix"]').select('(%)')
    cy.get('input[name="stockImportDetail.percentValue"]').clear().type('2')
    cy.get('input[name="stockImportDetail.percentVAT"]').type('5')
    cy.get('button[name="stockImportDetail.add"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /Thêm/g);
    cy.wait(setting.wait)
    cy.get('span[class="notification-dismiss"]').first().click()

    //Xóa thuốc đã lưu
    cy.get('button[name="optionButton.remove"]').first().click()
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /xoá/g);
    cy.get('span[class="notification-dismiss"]').first().click()
  // NK-000111 xoá 20 Hop  100021-E24/12/2019-PT14/

    //Sửa ngày nhập và note
    cy.get('button[name="storeImportForm.edit"]').first().click()
    cy.get('button[name="documentDialog.closeDialog"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="storeImportForm.edit"]').first().click()
    cy.get('input[name="storeImportForm.inputUpdateBill"]').type('K8-T1')
    cy.get('button[name="documentDialog.save"]').click()

    //
    cy.get('button[class="btn btn-warning"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="warningGrid.close"]').click({force: true})
    //cy.wait(2000)
    cy.wait(setting.wait)
    cy.get('button[name="importFormMenu.verify"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="storeImportForm.back"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="importFormMenu.verify"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="storeImportForm.verify"]').click()
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /Tính/g);
    cy.get('span[class="notification-dismiss"]').first().click()
  })

})
