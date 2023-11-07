const musicForm = document.getElementById('musicForm');
const button = document.querySelector('.button');
let playButton = document.querySelector('.playmusic');

musicForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const musicFile = document.getElementById('music1').files[0];
    const formData = new FormData();

    formData.append('music1', musicFile);
    console.log(formData);
    try {
        const response = await fetch('/auth/musiccreate', {
            method: 'POST',
            body: formData,
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
});
 let audio = null;
playButton.addEventListener('click', function () {
   
    if (audio == null) {
        fetch('/auth/getmusic')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const audioData = data.data.data;
                let blob = new Blob([new Uint8Array(audioData)], {
                    type: data.contentType,
                });

                console.log(audioData);
                // // Создаем объект URL для Blob
                const audioUrl = URL.createObjectURL(blob);

                // Создаем новый аудиоэлемент
                return (audio = new Audio(audioUrl));
                audio.play();
            })
        } else {
            if (audio.paused) {
                audio.play();
                playButton.textContent = 'Пауза';
            } else {
                audio.pause();
                playButton.textContent = 'Воспроизвести мелодию';
            }
        }
})


    

