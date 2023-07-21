let spinner = null;



const mainFunk = (users) => {
    const tableObj = {
        //Required
        data: users,
        //Not required but recommended. 
        //This is just the element that you want your table to be inside. 
        tableParentObject: document.querySelector('#tableDiv'),
    }

    const usersGrid = new Gridify(tableObj);

    usersGrid.init();


    const addEventPerRow = () => {
        const tbl = document.querySelector('table');
        const rows = tbl.querySelectorAll('tr');
        rows.forEach((row, index) => {
            row.addEventListener('click', () => console.log(`CLICKED ROW: ${index}`))
        })
    }

    addEventPerRow();

}

const isAdminTurnOnEdit = async (users) => {
    let admin = null;
    const isAdmin = async () => {
        const cu = new CookieUtils();
        console.log(cu.getCookie('user'));
        const thisUser = JSON.parse(cu.getCookie('user'));
        await fetch('http://localhost:5000/api/Admin', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(thisUser.Id)
        })
            .then(data => {
                if (data.ok) return data.json();
                return null;
            })
            .then(data => admin = data)
            .catch(err => console.error(err));
        delete (cu);
        return admin;
    }

    if (await isAdmin()) {
        const table = document.querySelector('table');
        for (row of table.rows) {
            if (row.rowIndex != 0) {
                const td = document.createElement('td');
                const button = document.createElement('button');
                button.type = 'button';
                button.innerHTML = `Update USER: ${row.id}`
                button.addEventListener('click', async () => {
                    let id = button.parentElement.parentElement.id
                    let editUser = null;
                    await fetch(`http://localhost:5000/api/User/${id}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        // body: JSON.stringify(id)
                    })
                        .then(data => {
                            if (data.ok) return data.json();
                            return null;
                        })
                        .then(data => editUser = data)
                        .catch(err => console.error(err));
                    if(editUser){
                        let cu = new CookieUtils();
                        cu.setCookie('editUser',JSON.stringify(editUser), 1);
                        window.location.assign('./editUser.html');
                    }
                });
                row.append(td);
                td.appendChild(button);
            }
            else {
                row.append(document.createElement('td'))
            }
        }

    }

}


const BeforMain = async () => {
    //Put all data gathering here. 
    const usersdata = new UserData();
    const users = await usersdata.GetAllUsers();
    mainFunk(users);
    isAdminTurnOnEdit(users);
}





turnSpinnerOn()
    .then(div => spinner = div)
    .then(async () => {
        await BeforMain();
        setTimeout(() => {
            spinner.remove();
        }, 500)

    });




