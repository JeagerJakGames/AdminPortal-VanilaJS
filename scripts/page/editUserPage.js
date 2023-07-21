
    const SetTime = () => {
        var date = new Date(Date.now())
        const isAfternoon = date.getHours() >= 12
        const hour = (isAfternoon ? (date.getHours() - 12) : date.getHours());
        const minute = date.getMinutes();

        const currentTime = `${hour} : ${minute} ${isAfternoon ? "PM" : "AM"}`
        console.log(currentTime);
        document.querySelector('#clock').innerHTML = currentTime;
    }

    let clockFunk = setInterval(() => {
        SetTime();
    }, 10 * 1000);
    
    




const main = async () => {
    SetTime();
}

main();