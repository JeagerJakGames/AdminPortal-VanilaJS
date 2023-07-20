
class DataBase{
    constructor(){
        this.Users = [];
        this.Admins = [];
    }
    createUser = (Name,Password,UserName,DateTime,Role,isAdmin) => ({ Name:Name, Password:Password, Date: DateTime ?? Date.now().toLocaleString(), UserName:UserName,Role:Role,isAdmin:isAdmin});
    getUserData = () => [
        this.createUser('Trenton Weir','VerySecure?',"tweir12", null, "Admin", true),
        this.createUser('John Doe', 'SuperChill*', 'TheDoooo', null, 'Standard', false),
        this.createUser('Megan Yokai', 'ScaryChostLady123*', 'SuperNatrualLady123', null, 'Standard', false)
    ];
    init(){
        this.Users = this.getUserData();
        this.Admins = this.Users.map(u => u.isAdmin == true);
    }
}

