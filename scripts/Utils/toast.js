class Toast{
    //a simple pop up letting you know 
    // if you were successful or failed.
    constructor(obj){
        this.Message = obj.Message;
        this.timeout = obj.timeout ?? 5000;
    }
    // Call this to display it. 
    Show(){
        const divToast = document.createElement('div');
        divToast.classList += 'toast';

        const text = document.createElement('p');
        text.classList += 'toast-text';
        text.innerHTML = this.Message;

        const xbutton = document.createElement('button');
        xbutton.innerHTML = 'X';
        xbutton.onclick = () => {
            divToast.remove();
            delete this;
        }
        
        divToast.appendChild(xbutton);
        divToast.append(text);



        const body = document.querySelector('body');
        body.append(divToast);
        setTimeout(() => {
            divToast.remove();
        },this.timeout);
        // remove from memory
        delete this;
    }

}