import { menuArray } from './data.js'

let items = document.getElementById('items')
let modal = document.getElementById('modal')
const paymentForm = document.getElementById('payment-form')

let orders = []

let ordersDiv = document.getElementById('orders-section')

function render(){
    let itemsHTML = ''
    menuArray.forEach(item => {
        itemsHTML += `
            <div class="item">
                <span class="img-item">${item.emoji}</span>
                <div class="item-desc">
                    <h2>${item.name}</h2>
                    <p>${item.ingredients.join(', ')}</p>
                    <span>$${item.price}</span>
                </div>
                <button class="add-btn" id="add-btn" data-item-id="${item.id}">+</button>
            </div>
        `
    })
    items.innerHTML = itemsHTML
}

render()

document.addEventListener('click', function(e){
    if(e.target.id === '' || e.target.id === 'modal-close-btn')
        handleModalClick()
    else if(e.target.id === 'complete-btn')
        modal.style.display = 'flex'
    else if(e.target.dataset.itemId)
        handleOrderClick(e.target.dataset.itemId)
})

function handleOrderClick(itemId){

    const item = menuArray.find((x) => x.id == itemId)
    orders.push({
        name: item.name,
        price: item.price,
    })
    renderOrders()
    ordersDiv.style.display = 'block'
}

function renderOrders(){
    let ordersHtml = `<h3>Your order</h3>`
    let total = 0
    orders.forEach(item => {
        total += item.price
        ordersHtml += `
            <div class="order">
                <p>${item.name}<small id="remove">remove</small></p>
                <span>$${item.price}</span>
            </div>
        `
    })   
    
    ordersHtml += `
        <hr>
        <div class="total">
            <h4>Total price: </h4>
            <span class="total-price">$${total}</span>
        </div>
        <button id="complete-btn">Complete order</button>
    `

    ordersDiv.innerHTML = ordersHtml
}


function handleModalClick()
{
    modal.style.display = 'none'
    document.getElementById('name').value = ''
    document.getElementById('card').value = ''
    document.getElementById('cvv').value = ''
}


paymentForm.addEventListener('submit', function(e){
    e.preventDefault()
    const name = document.getElementById('name').value
    handleModalClick()
    ordersDiv.innerHTML = `<p class="success">Thanks, ${name}! Your order is on its way!</p>`
})