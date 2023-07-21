

const setUpNavigation = () => {
    const navUl = document.querySelector('nav').querySelector('ul');
    const pageObj = (name, url) => ({ name: name, url: url });
    const pages = [
        pageObj('Dashboard', './dashboard.html'),
        pageObj('Admin', './admin.html'),
        pageObj('Users', './users.html')
    ];
    pages.forEach(p => {
        const li = document.createElement('li');
        const a = document.createElement('a');
        navUl.append(li);
        li.appendChild(a);
        a.href = p.url;
        a.innerHTML = p.name;

    });
}
setUpNavigation();