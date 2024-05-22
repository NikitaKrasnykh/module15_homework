const button = document.querySelector('.button');

button.addEventListener('click', () => {
    alert(`
    Your visible screen width is ${document.documentElement.clientWidth}px. 
    Your visible screen height is ${document.documentElement.clientHeight}px.
    Your total screen height is ${Math.max(document.body.scrollHeight, document.documentElement.scrollHeight, 
                                document.body.offsetHeight, document.documentElement.offsetHeight,
                                document.body.clientHeight, document.documentElement.clientHeight)}px.
    Your inner screen width is ${window.innerWidth}px.
    Your inner screen height is ${window.innerHeight}px.`);
});