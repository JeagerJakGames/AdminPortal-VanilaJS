const TryLogon = () => {
    const loginAttempt = new LogIn({
        UserName: txtUserName.value,
        Password: txtPassword.value
    });
    loginAttempt.Evaluate();

    if(loginAttempt.IsValid){
        let toast = new Toast({
            Message: `Welcome ${txtUserName.value}`,
            timeout: (10 * 1000)
        });
        toast.Show();
        return true;
    }
    else{
        let toast = new Toast({
            Message: `Incorrect username or password.`,
            timeout: (10 * 1000)
        });
        toast.Show();
        return false;
    }
}

const submitclick = () => {
    try{
        TryLogon();
    }
    catch(e){
        log(e)
        var t = new Toast({
            Message:e.message,
            timeout: (10 * 1000)
        });
        t.Show();
    }
}


const ActivateToast = () => {
    log('toast');
    var tst = new Toast({
        Message: 'New Toast',
        timeout: (10 * 1000)
    });
    tst.Show();

}

let db = new DataBase();
db.init();
let loginUserNames = new Gridify({
    data: db.Users,
    tableParentObject: document.querySelector('#tableDiv'),
});
loginUserNames.init();


///HOW TO USE THE GRID

//1. CREATE GRID OBJECT, MUST HAVE a data parameter that is an array of objects.

const tableObj = {
    //Required
    data: [
        {
            Name: "Trenton Weir",
            UserName: "tweir12",
            Password: "AReallySecurePassword"
        },
        {
            Name:"John Doe",
            UserName: "TheDooo",
            Password: "Super Chill"
        },
        {
            Name:"Megan Yokai",
            UserName: "SuperNatural123",
            Password: "ScaryGhostLady123"
        }
    ],
    //Not required but recommended. 
    //This is just the element that you want your table to be inside. 
    tableParentObject: document.querySelector('#tableDiv'),
}

//create the instance of the object, and ust the object you created
//above for the constructor obj
const usersGrid = new Gridify(tableObj);
//Call init
usersGrid.init();

// These can be added to buttons or other means to edit tables
//Adds data to grid
//Requires an Object similar to what you used for the table
const AddNew = () => usersGrid.addData({Name:"New", UserName: 'New', Password:"New"});

//Removes data from grid. 
//Requires the object you want to remove and the key to identify with
//alternativly you can just enter a value and it will remove all objects 
//that have it 
const DeleteTrent = () => usersGrid.removeData({
    Name: "Trenton Weir",
    UserName: "tweir12",
    Password: "AReallySecurePassword"
}, 'UserName');