const autorcForm = document.getElementById('autorcForm');
const title=
autorcForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const title=document.querySelector('.title').value
    const name = document.querySelector('.name').value
    const autorFile = document.querySelector('.autor').files[0];
    const autorFile1 = document.querySelector('.autor1').files[0];
    const autorFile2 = document.querySelector('.autor2').files[0];
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);  
    formData.append('autor', autorFile);
    formData.append('autor1', autorFile1);
    formData.append('autor2', autorFile2);
    console.log( formData)
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