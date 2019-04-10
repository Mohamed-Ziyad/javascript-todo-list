//get elements
const itemForm = document.getElementById('itemForm');
const itemInput = document.getElementById('itemInput');
const itemList = document.querySelector('.item-list');
const clearBtn = document.getElementById('clear-list');
const feedback = document.querySelector('.feedback');

//let itemData = []; //empty array
//if data in local storage get the list form the local srorage or return a the emty array
let itemData = JSON.parse(localStorage.getItem('list')) || [];
//itemInput.value = '';
//get all data from local storage
//load it
//loop it
//render it
//handle it
if (itemData.length > 0) {
	itemData.forEach(function(singleItem) {
		itemList.insertAdjacentHTML(
			'beforeend',
			`
        <div class="item my-3">
        <h5 class="item-name text-capitalize">${singleItem}</h5>
        <div class="item-icons">
         <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
         <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
         <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
        </div>
        </div>
        `,
		);
		handleItems(singleItem);
	});
}

//form submisstion
itemForm.addEventListener('submit', function(event) {
	event.preventDefault();

	const textValue = itemInput.value;
	//console.log(textValue);

	if (textValue === '') {
		showFeedback('please enter value', 'danger');
	} else {
		//add item
		addItem(textValue);

		//clear the form
		itemInput.value = '';

		//add to array
		itemData.push(textValue);
		//console.log(itemData);

		//local sotarage
		localStorage.setItem('list', JSON.stringify(itemData));

		//add eventlisteners to icon
		//after form submisstion I can access this else there will be an error
		handleItems(textValue);
	}
});

//show feedback
function showFeedback(text, action) {
	feedback.classList.add('showItem', `alert-${action}`);
	feedback.innerHTML = `<p>${text}</p>`;

	//hide in 3s
	setTimeout(function() {
		feedback.classList.remove('showItem', `alert-${action}`);
	}, 3000);
}

//add item
function addItem(value) {
	//creating a div adding new elements to it
	const div = document.createElement('div');
	div.classList.add('item', 'my-3');
	div.innerHTML = ` <h5 class="item-name text-capitalize">${value}</h5>
    <div class="item-icons">
     <a href="#" class="complete-item mx-2 item-icon"><i class="far fa-check-circle"></i></a>
     <a href="#" class="edit-item mx-2 item-icon"><i class="far fa-edit"></i></a>
     <a href="#" class="delete-item item-icon"><i class="far fa-times-circle"></i></a>
    </div>`;

	//adding the elements to the list
	itemList.appendChild(div);
}

//handling icons
function handleItems(textValue) {
	//selecting only i'm adding it
	const items = itemList.querySelectorAll('.item');
	//console.log(items);

	items.forEach(function(item) {
		//if the entered text exist add the listners to icons btn
		if (item.querySelector('.item-name').textContent === textValue) {
			//complete event listners
			item
				.querySelector('.complete-item') //seclecting completed icon
				.addEventListener('click', function() {
					item.querySelector('.item-name').classList.toggle('completed');
					this.classList.toggle('visibility'); //redusing the opacity
				});

			//edit event listners
			item.querySelector('.edit-item').addEventListener('click', function() {
				itemInput.value = textValue;
				itemList.removeChild(item); //remove a item
				//console.log(itemData);
				itemData = itemData.filter(function(item) {
					//removes the selected item
					//arrray is updated using filter method
					return item !== textValue;
				});
				//itemInput.value = '';
				//console.log(itemData);
			});

			//delete event listner
			item.querySelector('.delete-item').addEventListener('click', function() {
				itemInput.value = textValue;
				itemList.removeChild(item); //remove a item
				//console.log(itemData);
				itemData = itemData.filter(function(item) {
					//removes the selected item
					//arrray is updated using filter method
					return item !== textValue;
				});
				//the local storage updated
				localStorage.setItem('list', JSON.stringify(itemData));
				showFeedback('item delete', 'success');
				itemInput.value = '';
			});
		}
	});
}

clearBtn.addEventListener('click', function() {
	itemData = [];
	localStorage.removeItem('list'); //deleting all from local storage
	const items = itemList.querySelectorAll('.item');
	if (items.length > 0) {
		items.forEach(function(item) {
			itemList.removeChild(item);
		});
	}
});
