


class LogIn{
    constructor(obj){
        this.UserName = obj.UserName ?? null;
        this.Password = obj.Password ?? null;
        this.IsValid = false;
    }
    Evaluate = () => {
        // if ether is empty or null return false;
        if(this.UserName == null || this.UserName.trim() == '') return false;
        if(this.Password == null || this.Password.trim() == '') return false;
        //get database info
        let data = new DataBase();
        data.init();
        //return true if this combo exists
        var user = data.Users.filter(u => u.UserName == this.UserName);
        if(user.length < 1) return false;
        this.IsValid = user[0].Password == this.Password;
    

        return this.IsValid;
    }
    SetUserName = name => this.UserName = name;
    SetPassword = password => this.Password = password;
    SetUserAndPassword = (name, password) => {
        this.SetUserName(name);
        this.SetPassword(password);
    }

}