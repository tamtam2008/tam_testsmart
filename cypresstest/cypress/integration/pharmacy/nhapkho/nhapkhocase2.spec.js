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
    cy.wait(5000)
    cy.get('input[name="storeImportForm.selectStore"]').type('Shop', {force: true})
    //cy.wait(2000)
    cy.get('.Select-menu').first().click()

    //tạo phiếu nhập với nhà cung cấp vừa tạo
    cy.get('button[name="createStockModel.create"]').click()
    cy.get('a[name="storeImportForm.showProviderDialog"]').click({force: true})
    cy.get('button[name="addNewDialog.closeDialog"]').click()

    cy.get('button[name="createStockModel.create"]').click()
    cy.get('input[name="providerDialog.inputCode"]').type('UFF-12')
    cy.get('input[name="providerDialog.inputName"]').type('Vinamilk')
    cy.get('input[name="providerDialog.mobile"]').type('012886')
    cy.get('input[name="providerDialog.tax"]').type('Fax-89')
    cy.get('input[name="providerDialog.contact"]').type('Thị A - 05821 ')
    cy.get('input[name="providerDialog.address"]').type('Phường x')
    cy.get('button[name="addNewDialog.save"]').click()
    cy.contains('Thêm Nhà cung cấp thành công')
    cy.get('span[class="notification-dismiss"]').first().click()
    cy.get('.notification-message').first().invoke('text').should('match', /Tạo/g);
    cy.get('span[class="notification-dismiss"]').first().click()

    //thông tin thuốc nhập
    cy.get('input[name="searchTool.selectStock"]').type('k', {force: true})
    cy.get('.Select-menu').first().click()
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
  
    // cy.wait(1000)

    //hủy phiếu đang tạo chưa duyệt
    cy.get('button[name="importFormMenu.cancel"]').click()
    cy.get('button[name="storeImportForm.backCancel"]').click()
    cy.get('button[name="importFormMenu.cancel"]').click()
    cy.get('button[name="storeImportForm.cancelStoreImport"]').click({force: true})
    cy.wait(2000)
    cy.get('.notification-message').contains('Huỷ thành công')
    cy.get('span[class="notification-dismiss"]').first().click()
  })

})
