function crossThrough(event) {
    if (event.target.className === 'done') {
        event.target.className = 'notDone';
    } else {
        event.target.className = 'done';
    }
}

function deleteItem(event) {
    let itemToDelete = event.target.parentElement;
    container.removeChild(itemToDelete);
    if (document.getElementsByClassName('items').length === 0) {
        container.style.display = 'none';
    }
}

function main() {
    let form = document.getElementById('addItem');
    let container = document.getElementById('container');

    form.addEventListener('submit', function(event) {
        let submittedItem = event.target[0].value;
        
        if (submittedItem.trim() !== '') {
            let newItem = document.createElement('div');
            newItem.width = '100%';
            newItem.className = 'items';

            let text = document.createElement('div');
            text.innerText = submittedItem.trim();
            text.style.width = '265px';
            text.addEventListener('click', crossThrough);

            let bin = document.createElement('img');
            bin.src = './assets/images/bin.png'
            bin.alt = 'delete item';
            bin.style.width = '15px';
            bin.style.height = '15px';
            bin.addEventListener('click', deleteItem);

            newItem.appendChild(text);
            newItem.appendChild(bin);
            container.appendChild(newItem);
            container.style.display = 'block';
        }

        event.target[0].value = '';

        event.preventDefault();
    })
}

window.addEventListener("DOMContentLoaded", main);