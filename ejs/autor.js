const autorcForm = document.getElementById('autorcForm');
const title=
autorcForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title=document.querySelector('.title').value
    const name = document.querySelector('.name').value
    const autorFile = document.querySelector('.autor').files[0];
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);  
    formData.append('autor', autorFile);
    try {
        const response = await fetch('/auth/creatautor', {
            method: 'POST',
            body: formData
        });
        if (!response.ok) {
            const errorData = await response.json();
            console.error(errorData);
        } else {
            console.log('Музыка успешно загружена на сервер.');
        }
    } catch (error) {
        console.error('Ошибка при отправке запроса:', error);
    }
})