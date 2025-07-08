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
        //Make the item name and description transparent, CSS makes this fade out gently
        text.style.opacity = 0;
        name.style.opacity = 0;

        setTimeout(() => { //timeout will wait for the animation before swapping out the text
            toggled = !toggled;
            //Set item name and text based on if we are looking at the enhanced item.
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
            //Fade the text back in now that it's been updated.
            text.style.opacity = 1;
            name.style.opacity = 1;
        }, 500);
    });
});