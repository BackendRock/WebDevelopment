
function onsignup(event) {
    event.preventDefault();
    console.log("Working");

    const name = event.target.name.value;
    const email = event.target.email.value;
    const phone = event.target.phone.value;
    const bus = event.target.bus.value;

    myObj = {
        name,
        email,
        phone,
        bus
    }

    if (name && email && phone && bus) {
        axios.post('https://crudcrud.com/api/b50c35de68d14e9cb2ff4b261d2e3649/BusBooking', myObj)
            .then((resolve) => {
                onScreenFunction(myObj);
                console.log("Working");
                //window.location.reload();
            })
            .catch((err) => {
                console.error(err);
            });
    } else {
        alert('Enter all the information, please.');
    }
}


document.addEventListener('DOMContentLoaded', () => {

    axios.get('https://crudcrud.com/api/b50c35de68d14e9cb2ff4b261d2e3649/BusBooking')
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


function onScreenFunction(myObj) {
    const ul = document.getElementById('listOnScreen');

    const li = document.createElement('li');
    li.innerHTML = `${myObj.name} - ${myObj.email} - ${myObj.phone} - ${myObj.bus} `;
    li.style.listStyleType = "none";

    const delBtn = document.createElement('input');
    delBtn.value = 'Delete';
    delBtn.type = 'button';
    delBtn.onclick = () => {
        const url = `https://crudcrud.com/api/b50c35de68d14e9cb2ff4b261d2e3649/BusBooking/${myObj._id}`;
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

        document.getElementById('name').value = myObj.name;
        document.getElementById('email').value = myObj.email;
        document.getElementById('phone').value = myObj.phone;
        document.getElementById('bus').value = myObj.bus;

        axios.delete(`https://crudcrud.com/api/b50c35de68d14e9cb2ff4b261d2e3649/BusBooking/${myObj._id}`)
            .then(() => {
                ul.removeChild(li);
            })
            .error((err) => {
                console.error(err);
            })
    };

    li.appendChild(editBtn);
    li.appendChild(delBtn);
    ul.prepend(li);
}


async function datashow(event) {
    event.preventDefault()

    const setData = document.getElementById('datashowno').value;
    const ul = document.getElementById('listOnScreen');
    //window.location.reload()
    try {
        const response = await axios.get('https://crudcrud.com/api/b50c35de68d14e9cb2ff4b261d2e3649/BusBooking');
        ul.innerHTML = " ";
        if (setData == "All") {
            response.data.forEach((element) => {
                onScreenFunction(element)
            })
        } else {
            const filteredData = response.data.filter(element => element.bus === setData);

            if (filteredData.length > 0) {
                // Assuming you have an onScreenFunction that handles the display
                filteredData.forEach(element => {
                    onScreenFunction(element);
                });
            } else {
                console.log('No matching data found.');
            }
        }
    } catch (err) {
        console.error(err);
    }

}
document.addEventListener('DOMContentLoaded', datashow)

