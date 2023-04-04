import { menuArray } from './data.js'

let items = document.getElementById('items')

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
                <button class="add-btn" id="add-btn">+</button>
            </div>
        `
    })

    items.innerHTML = itemsHTML
    
}

render()