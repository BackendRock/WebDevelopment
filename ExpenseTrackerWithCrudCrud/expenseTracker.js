function onsignup(event) {
    event.preventDefault();

    const expense = event.target.Expense.value;
    const description = event.target.Description.value;
    const category = event.target.Category.value;

    myObj = {
        expense,
        description,
        category
    }

    // localStorage.setItem(myObj.description, JSON.stringify(myObj));
    if (expense && description && category) {
        axios.post('https://crudcrud.com/api/0c677cdf9f86486ca6261496e571b51c/ExpenseTracker', myObj)
            .then((resolve) => {
                onScreenFunction(myObj);
                console.log(resolve);
            })
            .catch((err) => {
                console.error(err);
            })
            window.location.reload()
        // onScreenFunction(myObj);
    } else {
        alert('Enter All the things please');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    axios.get('https://crudcrud.com/api/0c677cdf9f86486ca6261496e571b51c/ExpenseTracker')
        .then((response) => {
            console.log(response);
            response.data.forEach((element) => {
                onScreenFunction(element)
            })
        })
        .catch((err) => {
            console.error(err)
        })
})
// Object.keys(localStorage).forEach((item) => {
//     onScreenFunction(JSON.parse(localStorage[item]));
// })

// Object.keys(localStorage).forEach((item) => {
//     onScreenFunction(JSON.parse(localStorage[item]));
// })
// })

function onScreenFunction(myObj) {
    const ul = document.getElementById('listOnScreen');

    const li = document.createElement('li');
    li.innerHTML = `${myObj.expense} - ${myObj.description} - ${myObj.category}`;

    const delBtn = document.createElement('input');
    delBtn.value = 'Delete';
    delBtn.type = 'button';
    delBtn.onclick = () => {
        const url = `https://crudcrud.com/api/0c677cdf9f86486ca6261496e571b51c/ExpenseTracker/${myObj._id}`;
        axios.delete(url)
            .then(() => {
                ul.removeChild(li);
            })
            .catch((err) => {
                console.error(err);
            });
    };


    const editBtn = document.createElement('input');
    editBtn.value = 'Edit';
    editBtn.type = 'button';
    editBtn.onclick = () => {

        document.getElementById('Expense').value = myObj.expense;
        document.getElementById('Description').value = myObj.description;
        document.getElementById('Category').value = myObj.category;

        axios.delete(`https://crudcrud.com/api/0c677cdf9f86486ca6261496e571b51c/ExpenseTracker/${myObj._id}`)
            .then(() => {
                ul.removeChild(li);
            })
            .error((err) => {
                console.error(err);
            })
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    ul.appendChild(li);
}

