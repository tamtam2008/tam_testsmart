import setting from "../../../../setting.json"

describe('First step', function(){
  it('Restore data', function(){
  cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
  cy.wait(setting.waitdata)
  })
  it('Visit webside smartpharmacy', function(){
    cy.visit('https://smartpharmacy.digihcs.com/')
    cy.wait(setting.waitdata)
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

    cy.wait(setting.waitdata)
    cy.get('input[name="storeImportForm.selectStore"]').type('Shop', {force: true})
    cy.wait(setting.waitdata)
    cy.get('.Select-menu').first().click()

    //tạo phiếu nhập với nhà cung cấp vừa tạo
    cy.wait(setting.wait)
    cy.get('button[name="createStockModel.create"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="addNewDialog.closeDialog"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="createStockModel.create"]').click()
    cy.wait(setting.wait)
    cy.get('input[name="storeImportForm.billCode"]').type('T162-XT')
    cy.wait(setting.wait)
    cy.get('a[name="storeImportForm.showProviderDialog"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name="providerDialog.inputCode"]').type('UFF-12')
    cy.wait(setting.wait)
    cy.get('input[name="providerDialog.inputName"]').type('Vinamilk')
    cy.wait(setting.wait)
    cy.get('input[name="providerDialog.mobile"]').type('012886')
    cy.wait(setting.wait)
    cy.get('input[name="providerDialog.tax"]').type('Fax-89')
    cy.wait(setting.wait)
    cy.get('input[name="providerDialog.contact"]').type('Thị A - 05821 ')
    cy.wait(setting.wait)
    cy.get('input[name="providerDialog.address"]').type('Phường x')
    cy.wait(setting.wait)
    cy.get('button[name="addNewDialog.save"]').click()
    cy.wait(setting.wait)
    // cy.contains('Thêm Nhà cung cấp thành công')
    // // cy.get('span[class="notification-dismiss"]').first().click()
    // cy.get('.notification-message').first().invoke('text').should('match', /Tạo/g);
    // cy.get('span[class="notification-dismiss"]').first().click({force: true})

    //tạo mới thuốc
    cy.wait(setting.wait)
    cy.contains('Tạo mới').click({force: true})
    cy.wait(setting.wait)
    cy.contains('Tên thuốc (viết tắt)').parent().find('div').find('input').type('XTV')
    cy.wait(setting.wait)
    cy.contains('SỐ ĐĂNG KÍ').parent().find('div').find('input').type('VN-111')
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
    cy.contains('Nhà SX').parent().find('div').find('input').type('TPHCM')
    cy.wait(setting.wait)
    cy.get('input[name="createSM.producerCountry1"]').type('Argentina', {force: true})
    //cy.get('select').select('Argentina')
    cy.wait(setting.wait)
    cy.contains('Lưu').click({force: true})
    cy.wait(setting.waitdata)
    // cy.contains('Thêm kiểu hàng thành công')

    //thông tin thuốc nhập.
    cy.get('#modalInput').type('beez')
    cy.wait(setting.wait)
    cy.get('input[name="stockImportDetail.inputExpiration"]').type('2019-12-24')
    cy.wait(setting.wait)
    cy.get('input[name="stockImportDetail.inputPartNumber"]').type('12KK--')
    cy.wait(setting.wait)
    cy.get('input[name="quantity"]').type('20')
    cy.wait(setting.wait)
    cy.get('select[name="stockImportDetail.percentFix"]').select('(%)')
    cy.wait(setting.wait)
    cy.get('input[name="stockImportDetail.percentValue"]').type('2')
    cy.wait(setting.wait)
    cy.get('input[name="stockImportDetail.percentVAT"]').type('5')
    cy.wait(setting.wait)
    cy.get('button[name="stockImportDetail.add"]').click({force: true})
    cy.wait(setting.waitdata)
    cy.get('button[name="importFormMenu.verify"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="storeImportForm.verify"]').click()
    // cy.get('.notification-message').first().invoke('text').should('match', /NK/g);
    // cy.get('span[class="notification-dismiss"]').first().click({force: true})

    //Bán hàng
    cy.wait(setting.waitdata)
    cy.visit('https://smartpharmacy.digihcs.com/retail')
    cy.get('li[name=btn-create-cart]').click({force: true})
    cy.wait(setting.waitdata)
    // cy.get('.notification-message').first().invoke('text').should('match', /Tạo/g);
    // cy.get('span[class="notification-dismiss"]').first().click({force: true})

    // Select medicine
    cy.get('input[name=select-stock]').type('XTV', {force: true})
    cy.wait(setting.wait)
    cy.get('.Select-menu').first().click()
    //tạo giá lần đầu
    cy.wait(setting.wait)
    cy.get('input[name="input-stock-model-price-0"]').type('150000')
    //cy.get('button[name="btn-cancel-create-stock-model-price"]').click()
    // const stub = cy.stub()
    // cy.on('window:confirm', stub)
    // cy.get('button[name=btn-cancel-create-stock-model-price]').click({force:true}).then(() => {
    //   expect(stub.getCall(0)).to.be.calledWith('Bạn sẽ bán thuốc này với giá 0')
    // })
    // cy.wait(3000)

    // cy.get('input[name=select-stock]').type('XTV', {force: true})
    // cy.wait(1000)
    // cy.get('.Select-menu').first().click()
    cy.wait(setting.wait)
    cy.get('button[name="btn-confirm-create-stock-model-price"]').click()
    // cy.contains('Cập nhật giá thuốc thành công')
    cy.wait(setting.wait)
    cy.get('input[name="input-quantity-0"]').type('21')
    cy.wait(setting.wait)
    cy.get('button[name="btn-add-stock"]').click()
    // cy.wait(1000)
    // cy.get('.notification-message').first().invoke('text').should('match', /Đặt thành công thuốc/g);
    // // cy.get('span[class="notification-dismiss"]').first().click({force: true})
    // cy.contains('Không đủ thuốc trong kho')
  })

})
