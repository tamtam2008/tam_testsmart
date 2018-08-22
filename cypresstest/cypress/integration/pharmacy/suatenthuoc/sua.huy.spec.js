import setting from "../../../../setting.json"

describe('First step', function(){
  // it('Restore data', function(){
  //   cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
  // })
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
    // cy.visit('https://smartpharmacy.digihcs.com/retail')
    cy.contains('Danh mục').click({force: true})
    cy.contains('Tên thuốc').click({force: true})
    cy.wait(5000)
    cy.get('button[name=btn-edit-stock-model-0]').click({force: true})
    cy.wait(setting.wait)


    cy.get('.modal-body').contains('Tên thuốc (viết tắt)').parent().find('div').find('input').clear().type('aaa')
    cy.wait(setting.wait)
    cy.get('.modal-body').contains('SỐ ĐĂNG KÍ').parent().find('div').find('input').clear().type('VN-02')
    cy.wait(setting.wait)
    cy.get('input[name="createSM.specificName1"]').clear().type('TXT-!1')
    cy.wait(setting.wait)
    cy.get('i[class="material-icons remove-chip"]').first().click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=selectEditorActiveElement').type('ALUMINA').click()
    cy.wait(setting.wait)

    cy.get('i[class="material-icons remove-chip"]').last().click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name=selectEditorStockCategory').type('Gout').click()

    cy.get('input[name="createSM.unit.0.1"]').clear().type('Viên')
    cy.get('input[name="Cleave.unit.0"]').clear().type('2500')

    cy.get('.modal-body').contains('Nhà SX').parent().find('div').find('input').clear().type('TPHCM')
    cy.get('input[name="createSM.producerCountry1"]').type('Argentina', {force: true})

    cy.contains('Hủy').click()

  })
})
