
    const SetTime = () => {
        var date = new Date(Date.now())
        const isAfternoon = date.getHours() >= 12
        const hour = (isAfternoon ? (date.getHours() - 12) : date.getHours());
        const minute = date.getMinutes();

        const currentTime = `${hour} : ${minute} ${isAfternoon ? "PM" : "AM"}`
        console.log(currentTime);
        document.querySelector('#clock').innerHTML = currentTime;
    }

    let clockFunk = setInterval(() => {
        SetTime();
    }, 10 * 1000);
    
let euser;
let cuser; 




const main = async () => {
    SetTime();
    euser = JSON.parse(await getEditUser());
    cuser = JSON.parse(await getCurrentUser());
    console.log(cuser);
    let isAdmin = await checkIfAdmin(await cuser.id);
    if(cuser.id == euser.id || isAdmin){
        await setUpContent(euser);
    }
    if(isAdmin){
        getEl('btnAddToAdmin').disabled = false;
        getEl('btnRemoveAdmin').disabled = false;
        getEl('btnRemoveUser').disabled = false;
        getEl('btnNewUser').disabled = false;
    }
    
}

const getEditUser =  async () => {
    const cu = new CookieUtils();
    return cu.getCookie('editUser');
}

const getCurrentUser = async () => {
    const cu = new CookieUtils();
    return cu.getCookie('user');
}

const checkIfAdmin = async (id) => {
    let isAdmin = false;
    console.log(id);
    await fetch(`http://localhost:5000/api/Admin/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
        .then(data => {
            if (data.ok) return data.json();
            return null;
        })
        .then(data => {
            isAdmin = (data != null && data != undefined);
            })
        .catch(err => console.error(err));
    return isAdmin;
}

const getEl = (id) => document.querySelector(`#${id}`);

const setUpContent = async (user) => {
    for(let key of Object.keys(user)){
        let element = getEl(key);
        if(element){
            element.value = user[key];
        }
    }
}

const submitUpdate = async () => {
    let newUser = null;
    for(let key of Object.keys(euser)){
        let element = getEl(key);
        if(element){
            euser[key] = element.value;
        }
    }
    await fetch(`http://localhost:5000/api/User/user`, {
    method: 'POST', // Use PUT or PATCH here, depending on your API
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(euser) // Send the updated user data as JSON
  })
  .then(response => response.json())
  .then(data =>{
    console.log(data)
    newUser = data;
  })
  .catch(error => console.error('Error updating user:', error));
  return newUser;
}

const MakeAdmin = async () => {
    if(await checkIfAdmin(cuser.id)){
        await fetch(`http://localhost:5000/api/Admin/${euser.id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            // body: JSON.stringify({userId:euser.id})
        })
        .then(data => data.json())
        .then(data => console.log(data));
    }
}
const RemoveAdmin = async () => {
    
    if (await checkIfAdmin(cuser.id)) {
        console.warn('removeUser')
        await fetch(`http://localhost:5000/api/Admin/${euser.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error deleting user:', error));
      }
      
}

const AddUser = async () => {
    console.warn("Add USER");
    euser.id = 0;
    let u =  await submitUpdate();
    alert(`New User ID: ${u.id}`)
    
}

const RemoveUser = async () => {
    if (await checkIfAdmin(cuser.id)) {
        await fetch(`http://localhost:5000/api/User/${euser.id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          },
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error deleting user:', error));
      }
}

const ClearPage = async () => {
    let btnThis = getEl('btnNewUser');
    btnThis.removeEventListener('click', ClearPage);
    btnThis.innerHTML = 'Save New User';
    btnThis.addEventListener('click', async () => await AddUser());
    document.querySelectorAll('button').forEach(b => {
        if(b.id != btnThis.id){
            b.style.display = 'none';
        }
    })
    for(let key of Object.keys(euser)){
        let element = getEl(key);
        if(element){
            element.value = '';
        }
    }
}

main();

document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    await submitUpdate();
});

getEl('btnAddToAdmin').addEventListener('click', async (e) => {
    console.warn("CLICK");
    await MakeAdmin();
});

getEl('btnRemoveAdmin').addEventListener('click', async (e) => {
    console.warn("REMOVE");
    await RemoveAdmin();
});

getEl('btnRemoveUser').addEventListener('click', async (e) => {
    console.warn("REMOVE");
    await RemoveUser();
});


getEl('btnNewUser').addEventListener('click', ClearPage);

