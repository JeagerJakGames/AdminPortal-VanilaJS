class Toast{
    constructor(obj){
        this.Message = obj.Message;
    }

    Show(){
        const divToast = document.createElement('div');
        const text = document.createElement('h1');
        text.innerHTML = this.Message;
        divToast.append(text);
        const body = document.querySelector('body');
        body.append(divToast);
        setTimeout(() => {
            body.remove(divToast);
        },5000);
    }
}