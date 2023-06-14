
const createUser = (fname, lname, username, id, email) => {
    return {
        FirstName:fname,
        LastName:lname,
        UserName:username,
        Id:id,
        Email:email
    }
}

const PasswordResult = (msg, accessgranted) => ({
    Message: msg,
    AccessGranted: accessgranted
});
class UserData {
    constructor() {
        this.Users =
            [
                createUser('Trenton', 'Weir', 'tweir12', 1, 'tweir12@ivytech.edu'),
                createUser('Trenton', 'Weir', 'tweir13', 2, 'tweir12@ivytech.edu'),
                createUser('Trenton', 'Weir', 'tweir15', 3, 'tweir12@ivytech.edu'),
                createUser('Trenton', 'Weir', 'tweir16', 4, 'tweir12@ivytech.edu'),
            ]

    }
     GetAllUsers() {
        return this.Users;
    }
    GetUserById(id){
        var res = null;
        this.Users.forEach(x => {
            if(x.Id == id){
                res = x;
            }
        });
        return res;
    }
    GetUserByUserName(username){
        var res = null;
        this.Users.forEach(x => {
            if(x.UserName == username){
                res = x;
            }
        });
        return res;
    }
}
class PasswordManager{
    constructor(obj){
        this.UserName = obj.UserName;
        this.Id = obj.Id;
    }
    Passwords = {
        tweir12:'SecurePassword!',
    }
    UserNames = {
        Trent: 'tweir12'
    }
    CheckPassword(password){
        if(this.UserName != 'tweir12'){
            return PasswordResult("User Does Not Exist.", false);
        }
        if(this.UserName == this.UserNames.tweir12){
            if(password == this.Passwords.tweir12){
                return PasswordResult(`Hello, ${this.UserName}`, true);
            }
        }
    }

}