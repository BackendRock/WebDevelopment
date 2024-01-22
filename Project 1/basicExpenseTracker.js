function onsignup(e) {
    e.preventDefault();

    // 1st away to access the user input value
    /*
    const Expense = document.getElementById('Expense').value;
    const Description = document.getElementById('Description').value;
    const Category = document.getElementById('Category').value; */

    // 2nd away to access the user input value
    const Expense =e.target.Expense.value;
    const Description =e.target.Description.value;
    const Category =e.target.Category.value;
    e.target.reset();

    const obj = {
        Expense,
        Description,
        Category
    }
    localStorage.setItem(obj.Expense, JSON.stringify(obj));
    onScreenShow(obj);
}
window.addEventListener('DOMContentLoaded', () => {
    Object.keys(localStorage).forEach((item) => {
        onScreenShow(JSON.parse(localStorage[item]));
    })
})

function onScreenShow(obj) {
    const ul = document.getElementById('listOnScreen');
    const li = document.createElement('li');
    li.innerHTML = `${obj.Expense} - ${obj.Description} - ${obj.Category}`

    //Delite Button
    const Delite = document.createElement('input');
    Delite.type = 'button';
    Delite.value = 'Delete';
    Delite.onclick = () => {
        localStorage.removeItem(obj.Expense);
        ul.removeChild(li);
    }

    //Edit Button
    const Edit = document.createElement('input');
    Edit.type = 'button';
    Edit.value = 'Edit';
    Edit.onclick = () => {
        localStorage.removeItem(obj.Expense);
        ul.removeChild(li);
        document.getElementById('Expense').value =obj.Expense;
        document.getElementById('Description').value = obj.Description;
        document.getElementById('Category').value = obj.Category;
    }
    li.appendChild(Delite);
    li.appendChild(Edit);
    ul.appendChild(li);

}