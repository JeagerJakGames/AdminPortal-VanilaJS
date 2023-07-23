const Login = e => {
    const user = {
        userName: document.querySelector('#username').value,
        password: document.querySelector('#password').value
    };
    
    fetch('http://localhost:5000/api/Login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    })
    .then(response =>{
        if(response.ok){
            return response.json();
        }
    })
    .then(data => {
        if(data){
            const cookUtl = new CookieUtils();
            cookUtl.setCookie('user', JSON.stringify(data), 20);
            const url = `./dashboard.html`;
            window.location.assign(url);
        }
    })
    .catch(error => console.error('Error:', error));
    
}