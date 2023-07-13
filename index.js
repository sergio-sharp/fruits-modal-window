let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: 'https://catherineasquithgallery.com/uploads/posts/2021-02/1612902303_141-p-yabloki-krasnie-fon-209.jpg'},
    {id: 2, title: 'Апельсины', price: 30, img: 'https://klike.net/uploads/posts/2019-11/1574072281_2.jpg'},
    {id: 3, title: 'Манго', price: 40, img: 'http://kukinaraffinata.ru/upload/iblock/dfe/dfeee648b0993a71253fc37ab3a3771e.jpg'},
            ]

const toHTML = fruit => `
<div class="col">
                <div class="card">
                    <img class="card-img-top" src='${fruit.img}' style="height: 300px" alt="${fruit.title}">
                    <div class="card-body">
                    <h5 class="card-title">${fruit.title}</h5>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
                    <a href="#" class="btn btn-danger" data-btn="remove" data-id="${fruit.id}">Удалить</a>
                    </div>
                </div>
            </div>
`

            /*
* 1. Динамически на основе массива вывести список карточек +
* 2. Показать цену в модалке (и это должна быть 1 модалка) +
* 3. Модалка для удаления с 2мя кнопками
* ---------
* 4. На основе $.modal нужно сделать другой плагин $.confirm (Promise)
* */

function render() {
    const html = fruits.map(fruit => toHTML(fruit)).join('')
    document.querySelector('#fruits').innerHTML = html
}
render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footerButtons: [
        {text: 'Закрыть', type: 'primary', handler(){
            priceModal.close()
        }}
    ]
})

document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id 
    const fruit = fruits.find(f => f.id === id)
    
    if (btnType === 'price') {
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    } else if (btnType === 'remove'){
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(()=>{
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch(()=>{})
    }
})