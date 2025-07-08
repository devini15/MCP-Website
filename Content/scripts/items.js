document.querySelectorAll('.itemDiv').forEach(div => {
    let toggled = false;
    const name= div.querySelector('.itemName')
    const text = div.querySelector('.description');
    const button = div.querySelector('.itemButton');

    const regText = div.getAttribute('regular-text').replace(/\\n/g, '<br/>');
    const enhText = div.getAttribute('enhanced-text').replace(/\\n/g, '<br/>');
    const regName = div.getAttribute('regular-name');
    const enhName = div.getAttribute('enhanced-name');

    button.addEventListener('click', () => {
        text.style.opacity = 0;
        name.style.opacity = 0;

        setTimeout(() => {
            toggled = !toggled;

            if (toggled) {
                div.style.border = '3px solid purple';
                name.innerHTML = enhName;
                text.innerHTML = enhText;
                button.textContent = 'Show Regular';
            } else {
                div.style.border = '3px solid white';
                name.innerHTML = regName;
                text.innerHTML = regText;
                button.textContent = 'Show Enhanced';
            }

            text.style.opacity = 1;
            name.style.opacity = 1;
        }, 300);
    });
});