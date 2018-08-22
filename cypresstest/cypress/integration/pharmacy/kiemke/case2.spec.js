import setting from "../../../../setting.json"
describe('First step', function(){
  it('Restore data', function(){
    cy.request('https://drug.s2corp.vn/api/restoreDB/DB_API')
    cy.wait(setting.waitdata)
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
    cy.wait(setting.waitdata)
    cy.visit('https://smartpharmacy.digihcs.com/stockControl/null')
    cy.wait(setting.waitdata)
    //kho/ cửa hàng với người kiểm , biên bản tạo tùy chọn
    cy.get('input[name="select-store"]').type('store', {force: true})
    cy.wait(setting.wait)
    cy.get('.Select-menu').first().click()
    cy.wait(setting.wait)

    cy.get('button[name="btn-create-stock-control"]').click()
    cy.wait(setting.wait)
    cy.contains('Tạo thành công biên bản kiểm kê')
    cy.get('span[class="notification-dismiss"]').first().click({force: true})
    //thêm nhanh thuốc (nút hủy)
    cy.get('button[name="btn-create-stock"]').click()
    cy.wait(setting.wait)
    cy.get('button[name="btn-cancel-create-stock-model"]').click()
    cy.wait(setting.wait)
    //thêm nhanh thuốc (nút thêm)
    cy.get('button[name="btn-create-stock"]').click()
    cy.wait(setting.wait)
    cy.get('input[name="select-stock-model"]').type('1000', {force: true})
    cy.wait(setting.wait)
    cy.get('.Select-menu').last().click()
    cy.wait(setting.wait)
    cy.get('input[name="input-expiration"]').type('2018-12-12')
    cy.wait(setting.wait)
    cy.get('input[name="input-part-number"]').type('Y56')
    cy.wait(setting.wait)
    cy.get('input[name="input-stock-model-quantity-0"]').type('10')
    cy.wait(setting.wait)
    cy.get('button[name="btn-confirm-create-stock-model"]').click()
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /Đã kiểm/g);
    cy.get('span[class="notification-dismiss"]').first().click({force: true})
    cy.wait(setting.wait)
    //nhập kho nhanh thuốc thứ 2
    cy.get('button[name="btn-create-stock"]').click()
    cy.wait(setting.wait)
    cy.get('input[name="select-stock-model"]').type('k', {force: true})
    cy.wait(setting.wait)
    cy.get('.Select-menu').last().click()
    cy.wait(setting.wait)
    cy.get('input[name="input-expiration"]').type('2018-12-12')
    cy.wait(setting.wait)
    cy.get('input[name="input-part-number"]').type('G89')
    cy.wait(setting.wait)
    cy.get('input[name="input-stock-model-quantity-0"]').type('20')
    cy.wait(setting.wait)
    cy.get('button[name="btn-confirm-create-stock-model"]').click()
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /Đã kiểm/g);
    cy.get('span[class="notification-dismiss"]').first().click({force: true})
    cy.wait(setting.wait)
    cy.get('div[col-id="stockModel.name"]').last().click({force: true, log: true})
    cy.wait(setting.waitdata)
    //nút hủy trong SL tồn & TT
    cy.get('button[name="btn-cancel-control-stock"]').click()
    cy.wait(setting.waitdata)
    //nút XN
    cy.wait(setting.wait)
    cy.get('div[col-id="stockModel.name"]').last().click({force: true, log: true})
    cy.wait(setting.waitdata)

    // nhập số lượng thực tế với đơn vị Hộp
    //nhập SL thực tế lần 1
    for(let i = 0; i<1;i++){
        let name = "input-quantity-"+i
        let number = (i+1)*6
        cy.get('input[name="'+ name +'"]').type(number.toString())
    }
    cy.wait(setting.waitdata)
    cy.get('button[name="btn-confirm-control-stock"]').click()
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /Đã kiểm/g);
    cy.get('span[class="notification-dismiss"]').first().click({force: true})
    cy.wait(setting.wait)
    // nhập SL thực tế lần 2 ('sheet: đã kiểm')
    cy.get('li[name="btn-choose-inventoried"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[class="btn"]').last().click({force: true})
    cy.wait(setting.wait)
    for(let i = 0; i<1;i++){
        let name = "input-quantity-"+i
        let number = (i+1)*10
        cy.get('input[name="'+ name +'"]').type(number.toString())
    }
    cy.wait(setting.waitdata)
    cy.get('button[name="btn-confirm-control-stock"]').click()
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /Đã kiểm/g);
    cy.get('span[class="notification-dismiss"]').first().click({force: true})
    cy.wait(setting.wait)

    // sheet: Sai lệch
    cy.get('li[name="btn-choose-deviated"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[class="btn"]').last().click({force: true})
    cy.wait(setting.wait)
    for(let i = 0; i<1;i++){
        let name = "input-quantity-"+i
        let number = (i+1)*9
        cy.get('input[name="'+ name +'"]').type(number.toString())
    }
    cy.wait(setting.waitdata)
    cy.get('button[name="btn-confirm-control-stock"]').click()
    cy.wait(setting.wait)
    cy.get('.notification-message').first().invoke('text').should('match', /Đã kiểm/g);
    cy.get('span[class="notification-dismiss"]').first().click({force: true})
    cy.wait(setting.wait)
    //nhập kho nhanh
    cy.get('li[name="btn-choose-fast-create"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[class="btn"]').last().click({force: true})
    cy.wait(setting.wait)
    for(let i = 0; i<1;i++){
        let name = "input-quantity-"+i
        let number = (i+1)*0
        cy.get('input[name="'+ name +'"]').type(number.toString())
    }
    cy.wait(setting.wait)
    cy.get('button[name="btn-confirm-control-stock"]').click()
    cy.wait(setting.wait)

    //sheet: Kiểm đúng. (số thực tế = số trong phần mềm)
    cy.get('li[name="btn-choose-check-right"]').click({force: true})
    cy.wait(setting.wait)
    cy.get('button[class="btn"]').last().click({force: true})
    cy.wait(setting.wait)
    for(let i = 0; i<1;i++){
        let name = "input-quantity-"+i
        let number = (i+1)*2
        cy.get('input[name="'+ name +'"]').type(number.toString())
    }
    cy.wait(setting.wait)
    cy.get('button[name="btn-confirm-control-stock"]').click()
    cy.wait(setting.wait)
    //Chưa kiểm
    cy.get('li[name="btn-choose-not-inventory"]').click({force: true})
    cy.wait(setting.wait)
    //gõ để tìm kiếm tên thuốc
    cy.get('input[name="select-stock"]').type('1000', {force: true})
    cy.wait(setting.wait)
    cy.get('.Select-menu').first().click()
    cy.wait(setting.wait)
    cy.get('button[name="btn-cancel-control-stock"]').click()
    cy.wait(setting.wait)

    cy.get('button[name="btn-stock-control-verify"]').click()
    cy.contains('Duyệt biên bản kiểm kê thành công')
    cy.get('span[class="notification-dismiss"]').first().click({force: true})


  })
})
