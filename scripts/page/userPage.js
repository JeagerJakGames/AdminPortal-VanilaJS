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
            row.addEventListener('click',() => console.log(`CLICKED ROW: ${index}`))
        })
    }
    
    addEventPerRow();
    
}


const BeforMain = async () => {
    //Put all data gathering here. 
    const usersdata = new UserData();
    const users = await usersdata.GetAllUsers();
    mainFunk(users);
}
turnSpinnerOn()
    .then(div => spinner = div)
    .then(async () => {
        await BeforMain();
        setTimeout(() => {
            spinner.remove();
        },500)
        
    });




