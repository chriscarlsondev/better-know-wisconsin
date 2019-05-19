'use strict';

const QUIZQUESTIONS = [{
        id: 1,
        question: "What city is the state capital of Wisconsin?",
        optionA: "Madison",
        optionB: "Green Bay",
        optionC: "La Crosse",
        optionD: "Hurley",
        answer: "A"
    },
    {
        id: 2,
        question: "What is the name of the current home to the Milwaukee Brewers baseball team?",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "B"
    },
    {
        id: 3,
        question: "What is the state dance?",
        optionA: "Square Dance",
        optionB: "Polka",
        optionC: "Clogging",
        optionD: "Folk Dance",
        answer: "B"
    },
    {
        id: 4,
        question: "What is the state bird?",
        optionA: "Northern Cardinal",
        optionB: "Western Meadowlark",
        optionC: "American Robin",
        optionD: "Eastern Goldfinch",
        answer: "C"
    },
    {
        id: 5,
        question: "",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "D"
    },
    {
        id: 6,
        question: "",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "A"
    },
    {
        id: 7,
        question: "",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "C"
    },
    {
        id: 8,
        question: "",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "C"
    },
    {
        id: 9,
        question: "",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "B"
    },
    {
        id: 10,
        question: "",
        optionA: "Chase Field",
        optionB: "Miller Park",
        optionC: "Target Field",
        optionD: "Wrigley Field",
        answer: "B"
    }
];



function generateItemElement(item) {
    return `
    <li data-item-id="${item.id}">
      <span class="shopping-item js-shopping-item ${item.checked ? "shopping-item__checked" : ''}">${item.name}</span>
      <div class="shopping-item-controls">
        <button class="shopping-item-toggle js-item-toggle">
            <span class="button-label">check</span>
        </button>
        <button class="shopping-item-delete js-item-delete">
            <span class="button-label">delete</span>
        </button>
      </div>
    </li>`;
}


function generateShoppingItemsString(shoppingList) {
    console.log("Generating shopping list element");

    const items = shoppingList.map((item) => generateItemElement(item));

    return items.join("");
}


function renderShoppingList() {
    // render the shopping list in the DOM
    console.log('`renderShoppingList` ran');
    const shoppingListItemsString = generateShoppingItemsString(STORE);

    // insert that HTML into the DOM
    $('.js-shopping-list').html(shoppingListItemsString);
}


function addItemToShoppingList(itemName) {
    console.log(`Adding "${itemName}" to shopping list`);
    STORE.push({
        id: cuid(),
        name: itemName,
        checked: false
    });
}

function handleNewItemSubmit() {
    $('#js-shopping-list-form').submit(function (event) {
        event.preventDefault();
        console.log('`handleNewItemSubmit` ran');
        const newItemName = $('.js-shopping-list-entry').val();
        $('.js-shopping-list-entry').val('');
        addItemToShoppingList(newItemName);
        renderShoppingList();
    });
}

function toggleCheckedForListItem(itemId) {
    console.log("Toggling checked property for item with id " + itemId);
    const item = STORE.find(item => item.id === itemId);
    item.checked = !item.checked;
}


function getItemIdFromElement(item) {
    return $(item)
        .closest('li')
        .data('item-id');
}

function handleItemCheckClicked() {
    $('.js-shopping-list').on('click', `.js-item-toggle`, event => {
        console.log('`handleItemCheckClicked` ran');
        const id = getItemIdFromElement(event.currentTarget);
        toggleCheckedForListItem(id);
        renderShoppingList();
    });
}


// name says it all. responsible for deleting a list item.
function deleteListItem(itemId) {
    console.log(`Deleting item with id  ${itemId} from shopping list`)

    // as with `addItemToShoppingLIst`, this function also has the side effect of
    // mutating the global STORE value.
    //
    // First we find the index of the item with the specified id using the native
    // Array.prototype.findIndex() method. Then we call `.splice` at the index of 
    // the list item we want to remove, with a removeCount of 1.
    const itemIndex = STORE.findIndex(item => item.id === itemId);
    STORE.splice(itemIndex, 1);
}


function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-shopping-list').on('click', '.js-item-delete', event => {
        // get the index of the item in STORE
        const itemIndex = getItemIdFromElement(event.currentTarget);
        // delete the item
        deleteListItem(itemIndex);
        // render the updated shopping list
        renderShoppingList();
    });
}

function renderQuizStartPage() {

}

function renderQuizResultPage() {

}

function renderQuizQuestion() {

}

function checkQuizAnswer() {

}

// this function will be our callback when the page loads. it's responsible for
// initially rendering the quiz, and activating our individual functions
// that handle quiz answer
function handleQuiz() {
    renderQuizStartPage();
    renderQuizQuestion();
    checkQuizAnswer();
    renderQuizResultPage();
    alert(QUIZQUESTIONS[0].answer);
}

// when the page loads, call `handleQuiz`
$(handleQuiz);