const musicForm = document.getElementById('musicForm');
const button = document.querySelector('.button');
let playButton = document.querySelector('.playmusic');
let musicMass=[]
let player=false
const musicList=document.querySelector('.musicList')
musicForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    const name = document.querySelector('.name').value
    const musicFile = document.getElementById('music1').files[0];
    const formData = new FormData();
    formData.append('name', name); 
    formData.append('music1', musicFile);
    console.log(formData);
    try {
        const response = await fetch('/auth/musiccreate', {
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
});
let audio= '';
 let song= '';

function bildListSongs(){
    var html = "";
    for (var i = 0; i < musicMass.length; i++) {
        
        html +=`<button class="playButton"  id=${musicMass[i].idpath}>play</button> <h1> ${musicMass[i].songs} </h1>`;
    }
    

    musicList.innerHTML = html
    var playButtons = document.getElementsByClassName("playButton");
    for (var j = 0; j < playButtons.length; j++) {
        playButtons[j].addEventListener("click", function(event) {
            

          
            var buttonId = event.target.id;
            play(buttonId)
        });
    }
}

 function getsongs(){
    fetch('/auth/getsongs').then(res=>res.json()).then(data=>{musicMass=data
        bildListSongs()})
 }
 getsongs()

 function play(mus){ 

    console.log('aaf'+audio)
    
    if (song == ''||mus!==song){
        if (audio!== ''){ audio.pause();} 
        if(mus!==song&&song !== ''){
            player=true
            console.log(player)
        }
        console.log(player)
        song=mus
       
       fetch('/auth/music', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ data: mus })
                })
                .then(response => {
           
            return response.json();
        })
            .then((data) => {
                const audioData = data.data.data;
                console.log(audio)
                let blob = new Blob([new Uint8Array(audioData)], {
                    type: data.contentType,
                });
               
                console.log(audioData);
             
                const audioUrl = URL.createObjectURL(blob);

                audio=''
                if(player==true){
                    
                    player=false
                    console.log(player)
                }
                audio = new Audio(audioUrl)
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
    }

