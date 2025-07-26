document.querySelectorAll('pre > code[class]').forEach(function (codeBlock) {
    let button = document.createElement('md-text-button');
    button.innerText = 'Copy';

    let text = codeBlock.innerText.split('\n').filter((line, index) => index % 2 === 0).join('\n');

    button.addEventListener('click', function () {
        navigator.clipboard.writeText(text);
    });

    codeBlock.parentNode.parentNode.parentNode.parentNode.parentNode.insertAdjacentElement('beforebegin', button);
});
