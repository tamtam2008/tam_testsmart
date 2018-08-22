  import setting from "../../../../setting.json"
  describe('First step', function(){
  it('Restore data', function(){
    cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
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
    cy.wait(setting.wait)
    cy.contains('Danh mục').click({force: true})
    cy.contains('Tên thuốc').click({force: true})


    //Case3: Quy cách : Hộp/ Vỉ/ Viên

    cy.get('button[name="handerEditor.createNew"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name="createSM.code1"]').type('penicillin')
    cy.wait(setting.wait)
    cy.get('input[name="createSM.registerNumber1"]').type('VN-99')
    cy.wait(setting.wait)
    cy.get('input[name="createSM.specificName1"]').type('Pharcy')
    cy.wait(setting.wait)
    cy.get('input[name=selectEditorActiveElement').type('AMPICILLIN').click()
    cy.wait(setting.wait)
    cy.get('input[name=selectEditorStockCategory').type('vitamin').click()
    cy.wait(setting.wait)
    cy.contains('Chọn quy cách').click({force: true})
    cy.wait(setting.wait)
    cy.contains('Hộp/ Vỉ/ Viên').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name="createSM.factor.0.1"').type('5')
    cy.wait(setting.wait)
    cy.get('input[name="createSM.factor.1.1"').last().type('10')
    // cy.get('div[name="infos"]').click().wait(1000).select('Hộp/Viên')
    // cy.contains('Giá Hộp').parent().find('div').find('input').type('99000')
    cy.wait(setting.wait)
    cy.contains('Nhà SX').parent().find('div').find('input').type('TPHCM')
    cy.wait(setting.wait)
    cy.get('input[name="createSM.producerCountry1"]').type('Argentina', {force: true})
    // Nâng cao
    cy.wait(setting.wait)
    cy.get('button[name="createSM.advance"]').click()
    cy.wait(setting.wait)
    cy.contains('Nâng cao').click({force: true})
    cy.wait(setting.wait)
    // nút chọn nhiều giá
    cy.get('input[name="createSM.manyPrice"]').click({force: true})
    cy.wait(setting.wait)

    for(let i = 0; i<3;i++){
      for(let j =0; j<4; j++){
        let name = "Cleave.price."+i+"."+j
        let number = (i+j)*10000
        cy.get('input[name="'+ name +'"]').type(number.toString())

      }
    }
    //giá vốn trong nâng cao
    cy.get('input[name="Cleave.privateCostByStore"]').each((input, index)=>{
      cy.wrap(input).type(((index + 1) * 100000).toString())
    })

    cy.get('input[name="createSM.isPrescriptionDrug"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('input[name="createSM.isSpecialControl"]').click({force: true})
    cy.wait(setting.wait)
    // Cảnh báo
    cy.contains('Cảnh báo').click({force: true})
    cy.get('input[name="lowStockAlarm"]').each((input, index)=>{
      cy.wrap(input).type(((index + 1) * 5).toString())
    })

    cy.get('input[name="highStockAlarm"]').each((input, index)=>{
      cy.wrap(input).type(((index + 1) * 10).toString())
    })

    cy.get('input[name="expirationDateAlarm"]').each((input, index)=>{
      cy.wrap(input).type(((index + 1) * 90).toString())
    })
    cy.wait(setting.wait)
    //nút lưu và tạo mới
    cy.get('button[name="createSM.saveAndcreateSM"]').click()
    // cy.get('button[name="createSM.createSM"]').click()
    cy.wait(setting.wait)
    cy.contains('Thêm kiểu hàng thành công')

  })
})
