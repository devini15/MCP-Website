document.querySelectorAll('.itemDiv').forEach(div => {
    let toggled = false;
    const nameElements = Array.from(div.querySelectorAll('.itemName, .pickpocketerText'));
    const name = nameElements[0] || null;
    const text = div.querySelector('.description');
    const button = div.querySelector('.itemButton');
    const image = div.querySelector('.itemImage'); //If you want to modify the image, ALWAYS make sure it's not null first!
    const details = div.querySelector('.itemDetails');

    const regText = div.getAttribute('regular-text').replace(/\\n/g, '<br/>');
    const enhText = div.getAttribute('enhanced-text').replace(/\\n/g, '<br/>');
    const regName = div.getAttribute('regular-name');
    const enhName = div.getAttribute('enhanced-name');
    const regImg = div.getAttribute('regular-texture');
    const enhImg = div.getAttribute('enhanced-texture');
    let regDetail = div.getAttribute('regular-details');
    let enhDetail = div.getAttribute('enhanced-details');

    const getNameParts = (value) => {
        if (value.includes('|')) return value.split('|').map(part => part.trim());
        return [value];
    };

    const updateNameContent = (value) => {
        const parts = getNameParts(value);

        if (div.classList.contains('dualNameItem')) {
            const nameSpans = Array.from(div.querySelectorAll('.itemName'));
            nameSpans.forEach((span, index) => {
                span.innerHTML = parts[index] || '';
            });
            return;
        }

        if (name !== null) {
            name.innerHTML = parts[0] || '';
        }
    };

    if(details !== null) {
        regDetail = regDetail.replace(/\\n/g, '<br/>');
        enhDetail = enhDetail.replace(/\\n/g, '<br/>');
    }

    button.addEventListener('click', () => {
        //Make the item name and description transparent, CSS makes this fade out gently
        text.style.opacity = "0";
        nameElements.forEach(el => {
            el.style.opacity = "0";
        });
        if(details !== null) details.style.opacity = "0";
        if(image !== null) image.style.opacity = "0";

        setTimeout(() => { //timeout will wait for the animation before swapping out the text
            toggled = !toggled;
            //Set item name and text based on if we are looking at the enhanced item.
            if (toggled) {
                div.style.border = '3px solid purple';
                updateNameContent(enhName);
                text.innerHTML = enhText;
                button.textContent = 'Show Regular';
                if(details !== null) details.innerHTML = enhDetail;
                if(image !== null) image.setAttribute('src', enhImg);
            } else {
                div.style.border = '3px solid white';
                updateNameContent(regName);
                text.innerHTML = regText;
                button.textContent = 'Show Enhanced';
                if(details !== null) details.innerHTML = regDetail;
                if(image !== null) image.setAttribute('src', regImg);
            }
            //Fade the text back in now that it's been updated.
            text.style.opacity = "1";
            nameElements.forEach(el => {
                el.style.opacity = "1";
            });
            if(details !== null) details.style.opacity = "1";
            if(image !== null) image.style.opacity = "1";
        }, 500);
    });
});

//For items with no enhanced version
document.querySelectorAll('.itemDivNoEnhanced, .itemDiv').forEach(div => {
    if (!div.classList.contains('itemDivNoEnhanced')) return;

    div.classList.add('itemDiv');

    const nameElements = Array.from(div.querySelectorAll('.itemName, .pickpocketerText'));
    const name = nameElements[0] || null;
    const text = div.querySelector('.description');
    const button = div.querySelector('.itemButton');
    const image = div.querySelector('.itemImage'); //If you want to modify the image, ALWAYS make sure it's not null first!
    const details = div.querySelector('.itemDetails');

    const regText = div.getAttribute('regular-text').replace(/\\n/g, '<br/>');
    const regName = div.getAttribute('regular-name');
    const regImg = div.getAttribute('regular-texture');
    let regDetail = div.getAttribute('regular-details');

    const getNameParts = (value) => {
        if (value.includes('|')) return value.split('|').map(part => part.trim());
        return [value];
    };

    const updateNameContent = (value) => {
        const parts = getNameParts(value);

        if (div.classList.contains('dualNameItem')) {
            const nameSpans = Array.from(div.querySelectorAll('.itemName'));
            nameSpans.forEach((span, index) => {
                span.innerHTML = parts[index] || '';
            });
            return;
        }

        if (name !== null) {
            name.innerHTML = parts[0] || '';
        }
    };

    if(details !== null) {
        regDetail = regDetail.replace(/\\n/g, '<br/>');
    }

    div.style.border = '3px solid white';
    updateNameContent(regName);
    text.innerHTML = regText;
    if(button !== null) button.textContent = 'Show Enhanced';
    if(details !== null) details.innerHTML = regDetail;
    if(image !== null) image.setAttribute('src', regImg);

});