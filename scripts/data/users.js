
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


const getRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
const addRandomNumbersToList = (howMany, minRange = 1, maxRange = 9999) => {
    const resultList = [];
    for (let i = 0; i < howMany; i++) {
      const randomNumber = getRandomInt(minRange, maxRange);
      resultList.push(randomNumber);
    }
    return resultList;
  }

class UserData {
    constructor() {
        this.Users = []
    }
    async GetAllUsers() {
        let users = [];
        await fetch('http://localhost:5000/api/User')
            .then(data => data.json())
            .then(data => {
                users = data;
            });
        return users;
    }
    async GetUserById(id){
        let user = {};
        await fetch(`http://localhost:5000/api/User${id}`)
            .then(data => data.json())
            .then(data => {
                user = data;
            });
        return user;
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