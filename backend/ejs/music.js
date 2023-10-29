// const musicForm = document.getElementById('musicForm');
// const button=document.querySelector('.button')
// let audio
// musicForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     audio = document.getElementById('music1').files[0];
//   ;})
// musicForm.addEventListener('submit', async (event) => {
//     event.preventDefault();

//     const musicFile = document.getElementById('music1').files[0];
//     const formData = new FormData();
//     formData.append('music1', musicFile);
//     console.log(formData)
//     try {
//         const response = await fetch('/auth/musiccreate', {
//             method: 'POST',
//             body: formData
//         }).then(audio =formData)
//         if (!response.ok) {
//             const errorData = await response.json();
//             console.error(errorData);
//         } else {
//             console.log('Музыка успешно загружена на сервер.');
//         }
//     } catch (error) {
//         console.error('Ошибка при отправке запроса:', error);
//     }
// });      
// console.log(audio)

// // Получаем кнопку воспроизведения


// // Добавляем обработчик события для кнопки воспроизведения
// var playButton = document.getElementById('playButton');

// playButton.addEventListener('click', function() {
//     console.log(audio)  
//     //   if (audio.paused) {
//     //     audio.play();
//     //     playButton.textContent = 'Пауза';
//     // } else {
//     //     audio.pause();
//     //     playButton.textContent = 'Воспроизвести мелодию';
//     // }
// });