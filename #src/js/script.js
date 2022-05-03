class DrumKit {
    constructor(){
        this.pads = document.querySelectorAll('.pad');
        this.playBtn = document.querySelector('.play');
        this.currentKick = './sounds/allSounds/kick-classic.wav';
        this.currentSnare = './sounds/allSounds/snare-acoustic01.wav';
        this.currentHihat = './sounds/allSounds/hihat-acoustic01.wav';
        this.kickAudio = document.querySelector('.kick-sound');
        this.snareAudio = document.querySelector('.snare-sound');
        this.hihatAudio = document.querySelector('.hihat-sound');
        this.index = 0;
        this.bpm = 150;
        this.isPlaying = null;
        this.selects = document.querySelectorAll('select');
    }
    // Responsible for styling active pad
    activePad(){
        this.classList.toggle('active');
    }
    repeat(){
        let step = this.index % 8;
        const activeBars = document.querySelectorAll(`.b${step}`);
        // Loop over the pads
        activeBars.forEach(bar => {
            bar.style.animation =`playTrack 0.3s alternate ease-in-out 2`;
            // Check if pads are active
            if(bar.classList.contains('active')){
                // check each sound
                if(bar.classList.contains('kick-pad')){
                    this.kickAudio.currentTime = 0;
                    this.kickAudio.play();
                }
                if(bar.classList.contains('snare-pad')){
                    this.snareAudio.currentTime = 0;
                    this.snareAudio.play();
                }
                if(bar.classList.contains('hihat-pad')){
                    this.hihatAudio.currentTime = 0;
                    this.hihatAudio.play();
                }
            }
        });
        this.index++;
    }
    start(){
        const interval = (60/this.bpm) * 1000;
        // Check if it's isPlaying
        if(!this.isPlaying) {
            this.isPlaying = setInterval(() => {
                this.repeat();
            }, interval);
        } else {
            // Clear the interval
            clearInterval(this.isPlaying);
            this.isPlaying = null;
        }
    }
    UpdateBtn(){
    // Switch the text in play button
        if(!this.isPlaying){
            this.playBtn.innerHTML = 'Stop';
            this.playBtn.classList.add('active');
        } else {
            this.playBtn.innerHTML = 'Start';
            this.playBtn.classList.remove('active');
        }
    }
    changeSound(e){
        const selectionName = e.target.name;
        const selectionValue = e.target.value;
        switch(selectionName) {
            case 'kick-select':
                this.kickAudio.src = selectionValue;
                break;
            case 'snare-select':
                this.snareAudio.src = selectionValue;
                break;
            case 'hihat-select':
                this.hihatAudio.src = selectionValue;
                break;
        }
    }
}

const drumKit = new DrumKit();

//Event Listeners

drumKit.pads.forEach(pad => {
    pad.addEventListener('click', drumKit.activePad);
    pad.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

drumKit.playBtn.addEventListener('click', function(){
    drumKit.UpdateBtn();
    drumKit.start();
});

drumKit.selects.forEach(select => {
    select.addEventListener('change', function(e){
        drumKit.changeSound(e);
    });
});



