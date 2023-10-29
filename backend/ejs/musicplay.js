let playButton=document.querySelector('.playmusic')
let button = document.querySelector('.button')
let input = document.getElementById('music1');
let audio 

button.addEventListener('click',()=>{
        file  = input.files[0];
         audio = new Audio(URL.createObjectURL(file));
    }) 
 playButton.addEventListener('click', function() {
    console.log(audio)
        if (audio.paused) {
            audio.play();
            playButton.textContent = 'Пауза';
        } else {
            audio.pause();
            playButton.textContent = 'Воспроизвести мелодию';
        }
    });
