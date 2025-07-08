document.querySelectorAll('.itemDiv').forEach(div => {
    let toggled = false;
    const name= div.querySelector('.itemName')
    const text = div.querySelector('.description');
    const button = div.querySelector('.itemButton');

    const regText = div.getAttribute('regular-text');
    const enhText = div.getAttribute('enhanced-text');
    const regName = div.getAttribute('regular-name');
    const enhName = div.getAttribute('enhanced-name');

    button.addEventListener('click', () => {
        toggled = !toggled;

        if (toggled) {
            div.style.backgroundColor = 'darkred';
            name.textContent = enhName;
            text.textContent = enhText;
            button.textContent = 'Show Regular';
        } else {
            div.style.backgroundColor = 'black';
            name.textContent = regName;
            text.textContent = regText;
            button.textContent = 'Show Enhanced';
        }
    });
});
