$( document ).ready(function() {
	  	   /*audiojs.events.ready(function() {
		       var as = audiojs.createAll();
		     });*/

        /*Variables */
		    songs = [];
        images = [];

        titles = $('#playlist li').map(function(){
               return $.trim($(this).text());
            }).get();;


        $('#playlist li a').each(function(li, a){
          songs.push($(a).attr('href'));
        });

        $('#images li img').each(function(li, img){
          images.push($(img).attr('src'));
        });

        
		    songTitle = $('#songTitle');
        movieTitle = $('#movie-title');
        movieImg = $('#movie-image');
		    fillBar = $('#fill');
        modalOverlay = $('#modal-overlay');
        modalBox = $('#modal-box');


        currentSong = 0;
		    song = new Audio();
        song.src = songs[currentSong];
        fillBar = $('#fill');

        movieTitle.html(titles[currentSong]);
        
        $('#play').click(function(){
          
          playimg = $('#play img').attr('src');
          
          if(song.paused){
            song.play();
            $('#play img').attr("src","images/Pause.png");
            
          }else{
            song.pause();
            $('#play img').attr("src","images/Play.png");
            
          }


        });

        /*Next*/

        $('#next').click(function(){     
          if(currentSong>=songs.length-1){
            currentSong = 0;
          }else{
            currentSong++;                        
          }

          modalOverlay.addClass('modal-hide');
          modalBox.addClass('modal-hide');  

          songTitle.html('Soundtrack' + ' ' + (currentSong + 1));
          movieTitle.html(titles[currentSong]);
          movieImg.attr("src", images[currentSong]);
          $('#play img').attr("src","images/Pause.png");
          song.src = songs[currentSong];   
          song.play();    
          
        });

        /*Prev*/
        $('#prev').click(function(){     
          if(currentSong>0){       
            currentSong--;
          }else{      
            currentSong = songs.length-1;

          }
          songTitle.html('Soundtrack' + ' ' + (currentSong + 1));
          movieTitle.html(titles[currentSong]);
          movieImg.attr("src", images[currentSong]);
          $('#play img').attr("src","images/Pause.png");
          modalOverlay.addClass('modal-hide');
          modalBox.addClass('modal-hide');
          song.src = songs[currentSong];   
          song.play();    
          
        });

        song.addEventListener('timeupdate', function(){

          /*Divides the currentime of the song by its duration*/
          position = song.currentTime / song.duration;

          /*Position of fillBar is multiplied by 100 to get percentage*/
          fillBar.css("width", position * 100 +'%');
          convertTime(Math.round(song.currentTime), Math.round(song.duration));

        });

        function convertTime(seconds, duration){

          durMin = Math.floor(duration / 60);
          durSec = duration % 60;

          min = Math.floor(seconds / 60);
          sec = seconds % 60;

          min = (min < 10) ? "0" + min : min;
          sec = (sec < 10 ) ? "0" + sec : sec;
          currentTime.textContent = min + ":" + sec + " / " + durMin + ":" + durSec;
        }


        

        $('#reveal').click(function(){
          modalOverlay.removeClass('modal-hide');
          modalBox.removeClass('modal-hide');
          song.pause();
          $('#play img').attr("src","images/Play.png");


        });


        $('#modal-close').add(modalOverlay).add(modalBox).click(function(){

          modalOverlay.addClass('modal-hide');
          modalBox.addClass('modal-hide');modalOverlay.addClass('modal-hide');
          modalBox.addClass('modal-hide');
          
        });

        /*Player Table*/


        incScoreOne = $('#inc-score-one');
        incScoreTwo = $('#inc-score-two');
        incScoreThree = $('#inc-score-three');

        decScoreOne = $('#dec-score-one');
        decScoreTwo = $('#dec-score-two');
        decScoreThree = $('#dec-score-three');


        function incScore(){
         incScoreOne.add(incScoreTwo).add(incScoreThree).on('click',function(){

            score = $('#' + this.id).closest('.gamer').find('.score');
            icon = $('#' + this.id).closest('.gamer').find('.gamer-icon');
            container = $('#' + this.id).closest('.gamer').find('.gamer-score');
            coin = $('#' + this.id).closest('.gamer').find('.gamer-coin');

            parScore = parseInt(score.text());
            parScore++;
            
            score.html(parScore);
            icon.addClass('gamer-bounce');
            container.addClass('gamer-bounce');
            coin.addClass('coin-reveal');

            container.add(icon).one('webkitAnimationEnd oanimationend msAnimationEnd animationend',   
            function(e){
              container.removeClass('gamer-bounce');
              icon.removeClass('gamer-bounce');
              coin.removeClass('coin-reveal');
            });

            effect = new Audio();
            effect.src = "sound-effects/coin.mp3";
            effect.play();

          });
        }

        function decScore(){
         decScoreOne.add(decScoreTwo).add(decScoreThree).on('click',function(){

            score = $('#' + this.id).closest('.gamer').find('.score');
            parScore = parseInt(score.text());
            parScore--;
            
            score.html(parScore);

            effect = new Audio();
            effect.src = "sound-effects/story.mp3";
            effect.play();

          });
        }

        incScore();
        decScore();


        /*Cover Modal*/

        $('#cover-play').click(function(e){
          e.preventDefault();
          $('#cover-overlay').addClass('modal-hide');
        });


        $('#cover-exit').click(function(e){
          e.preventDefault();
          customWindow = window.open('', '_blank', '');
          customwindow.close();
        });


      
});
