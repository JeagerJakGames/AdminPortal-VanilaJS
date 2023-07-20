


const turnSpinnerOn = async () => {
    const body = document.querySelector('body');
    const blur = document.createElement('div');
    const maindiv = document.createElement('div');
    const loader = document.createElement('div');
    
    blur.className = ['blur'];
    maindiv.className = ['spinner-main'];
    loader.className = ['spinner'];
    
    blur.append(maindiv);
    maindiv.append(loader);
    body.append(blur);

    return blur;
}

const turnSpinnerOff = async (div) => div.remove();