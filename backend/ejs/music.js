const musicForm = document.getElementById('musicForm');
const button=document.querySelector('.button')
let playButton=document.querySelector('.playmusic')

musicForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const musicFile = document.getElementById('music1').files[0];
    const formData = new FormData();
    
    formData.append('music1', musicFile);
    console.log(formData)
    try {
        const response = await fetch('/auth/musiccreate', {
            method: 'POST',
            body:formData
        })
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



 playButton.addEventListener('click', function() {
    let audio
if(!audio){fetch('/auth/getmusic')
  .catch(error => {
    console.error('Ошибка при загрузке файла:', error);
  });
    // return fetch('/auth/getmusic').then(data => {
    //     console.log(data)
    // //     const audio = new Audio(`data:audio/mp3;base64,${data}`);
    // //     audio.play();
    // //     console.log(data)})
    //  } )}
 }
        
   
    
        // if (audio.paused) {
        //     audio.play();
        //     playButton.textContent = 'Пауза';
        // } else {
        //     audio.pause();
        //     playButton.textContent = 'Воспроизвести мелодию';
        // }
    });