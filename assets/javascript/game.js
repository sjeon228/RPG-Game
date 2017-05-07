var player = {};
var enemy = {};

var ryu = {name: "Ryu", health: 120, attack: 8, counter: 10, sound: "assets/audio/hadouken.wav"};
var guile = {name: "Guile", health: 100, attack: 15, counter: 5, sound: "assets/audio/sonicboom.wav"};
var ken = {name: "Ken", health: 150, attack: 6, counter:20, sound: "assets/audio/shoruken.wav"};
var dhalsim = {name: "Dhalsim", health: 180, attack: 4, counter:25, sound: "assets/audio/dhalsim.wav"};
var clickCount = 0;
var cloneCount = 0;
var playerID;
var enemyID;
var killCount = 0;
var idArray = [];
var initial = document.body.innerHTML;





   

var bootup = function() {$(document).ready(function() {
	var initial = document.body.innerHTML;

	
//User selects character
	$(".character").click(function(){
		playerID = $(this).attr("id");
		$(this).removeClass("character");
		$(this).addClass("clone");
		$(".character").appendTo(".enemies");
		$(".character > .border").css({"background": "red"});

		idArray.push(playerID);

		if(playerID === "ryu"){
		var selectionSound = document.createElement("audio");
        		selectionSound.src= ryu.sound;
        		selectionSound.volume=1.00;
        		selectionSound.autoPlay=false;
        		selectionSound.preLoad=true; 

        selectionSound.play();
    	}
    	if(playerID === "guile"){
		var selectionSound = document.createElement("audio");
        		selectionSound.src= guile.sound;
        		selectionSound.volume=1.00;
        		selectionSound.autoPlay=false;
        		selectionSound.preLoad=true; 

        selectionSound.play();
    	}	if(playerID === "ken"){
		var selectionSound = document.createElement("audio");
        		selectionSound.src= ken.sound;
        		selectionSound.volume=1.00;
        		selectionSound.autoPlay=false;
        		selectionSound.preLoad=true; 

        selectionSound.play();
    	}	if(playerID === "dhalsim"){
		var selectionSound = document.createElement("audio");
        		selectionSound.src= dhalsim.sound;
        		selectionSound.volume=1.00;
        		selectionSound.autoPlay=false;
        		selectionSound.preLoad=true; 

        selectionSound.play();
    	}		

		if(cloneCount == 0) {
			$(".clone").clone().appendTo(".playerSpot");
			}

		cloneCount++;

		$(".character").off("click");
		
//User selects enemy
		$(".character").click(function(){

			var vsImage = "assets/images/vs.png";

			$(".vsSpot").append("<img src=" + vsImage + " width='200px'>");

			enemyID = $(this).attr("id");
			$(this).appendTo(".enemySpot");
			idArray.push(enemyID);
			
			if (killCount == 0){ 

				if (idArray[0] == "ryu"){
					player = {name: "Ryu", health: 120, attack: 8, counter: 10, sound: "assets/audio/hadouken.wav"};
				}
				if (idArray[0] == "guile"){
					player = {name: "Guile", health: 100, attack: 15, counter: 5, sound: "assets/audio/sonicboom.wav"};
				}
				if (idArray[0] == "ken"){
					player = {name: "Ken", health: 150, attack: 6, counter:20, sound: "assets/audio/shoruken.wav"};
				}
				if (idArray[0] == "dhalsim"){
					player = {name: "Dhalsim", health: 180, attack: 4, counter: 25, sound: "assets/audio/dhalsim.wav"};
				}
			}

			if (idArray[1] == "ryu") {
				enemy = {name: "Ryu", health: 120, attack: 8, counter: 10, sound: "assets/audio/hadouken.wav"};
			}
			if (idArray[1] == "guile") {
				enemy = {name: "Guile", health: 100, attack: 15, counter: 5, sound: "assets/audio/sonicboom.wav"};
			}
			if (idArray[1] == "ken") {
				enemy = {name: "Ken", health: 150, attack: 6, counter:20, sound: "assets/audio/shoruken.wav"};
			}
			if (idArray[1] == "dhalsim") {
				enemy = {name: "Dhalsim", health: 180, attack: 4, counter:25, sound: "assets/audio/dhalsim.wav"};
			}
			
			var fightSound = document.createElement("audio");
        		fightSound.src= player.sound;
        		fightSound.volume=1.00;
        		fightSound.autoPlay=false;
        		fightSound.preLoad=true; 

        	var counterSound = document.createElement("audio");
        		counterSound.src= enemy.sound;
        		counterSound.volume=1.00;
        		counterSound.autoPlay=false;
        		counterSound.preLoad=true; 

        		counterSound.play();
			$(".attack").on("click",function(){

				
				clickCount++;

				var attack = player.attack * clickCount;

				$(".attackText").text("You attacked " + enemy.name + " for " + attack + " damage");
				$(".counterText").text(enemy.name + " attacked you back for " + enemy.counter + " damage");

				player.health = player.health - enemy.counter;
				enemy.health = enemy.health - attack;

				$("."+ idArray[0]+".player.hpText").text(player.health);
				$("."+ idArray[1]+".player.hpText").text(enemy.health);

				if (player.health <= 0){

					$(".attack").off("click");

					if (enemy.health >= 0) {
					var loseSound = document.createElement("Audio");
        				loseSound.src= "assets/audio/lose.wav";
        				loseSound.volume=1.00;
        				loseSound.autoPlay=false;
        				loseSound.preLoad=true; 

        				loseSound.play();


        				setTimeout(function(){
						counterSound.play();
						}, 1000);

        			}

					$("."+ idArray[0]+".player.hpText").text(0);

					$(".attackText").text("You have been defeated...Game Over!!!");

					var resetBtn = $("<button>");

					resetBtn.addClass("btn btn-default reset").text("Reset");

					$(".counterText").html(resetBtn);

					var playAgain = function() {

						$(resetBtn).on("click",function() {


							document.body.innerHTML = initial;

							bootup();

							
						//ryu.health = 120;
						//blanka.health = 100;
						//ken.health = 150;
						//dhalsim.health = 180;
						clickCount = 0;
						attack = 0;
						cloneCount = 0;
						killCount = 0;
						idArray = [];

						$(".ryu.hpText").text(ryu.health);
						$(".guile.hpText").text(guile.health);
						$(".ken.hpText").text(ken.health);
						$(".dhalsim.hpText").text(dhalsim.health);

						})
					};
					playAgain();
				}

				if (enemy.health <= 0){
					player.health = player.health + enemy.counter;

					var winSound = document.createElement("audio");
        				winSound.src= "assets/audio/win.wav";
        				winSound.volume=1.00;
        				winSound.autoPlay=false;
        				winSound.preLoad=true; 

					winSound.play();

					setTimeout(function(){
						fightSound.play();
					}, 1000);

					$(".attack").off("click");

					

					$("."+ idArray[0]+".player.hpText").text(player.health);

					$(".attackText").text("You have defeated " + enemy.name + ". You can choose to fight another enemy");

					$("#" + idArray[1]).remove();

					idArray.pop();

					$(".counterText").empty();

					$(".vsSpot").empty();

					killCount++;

					if (killCount == 3) {
						$(".attack").off("click");

						$(".attackText").text("You have defeated all the enemies! You win!");

						var resetBtn = $("<button>");

						resetBtn.addClass("btn btn-default playAgain").text("Play Again");

						$(".counterText").html(resetBtn);

						var playAgain = function() {

							$(resetBtn).on("click",function() {


								document.body.innerHTML = initial;

								bootup();

							
								//ryu.health = 120;
								//blanka.health = 100;
								//ken.health = 150;
								//dhalsim.health = 180;
								clickCount = 0;
								attack = 0;
								cloneCount = 0;
								killCount = 0;
								idArray = [];

								$(".ryu.hpText").text(ryu.health);
								$(".blanka.hpText").text(blanka.health);
								$(".ken.hpText").text(ken.health);
								$(".dhalsim.hpText").text(dhalsim.health);

							})
						};
								playAgain();
					}
					
				}

				if (player.health <= 0 && enemy.health <= 0){
					$(".attack").off("click");

					$("."+ idArray[0]+".player.hpText").text(0);

					$(".attackText").text("You killed each other...try again!");

					var resetBtn = $("<button>");

					resetBtn.addClass("btn btn-default reset").text("Reset");

					$(".counterText").html(resetBtn);

					var playAgain = function() {

						$(resetBtn).on("click",function() {


							document.body.innerHTML = initial;

							bootup();

							
						//ryu.health = 120;
						//blanka.health = 100;
						//ken.health = 150;
						//dhalsim.health = 180;
						clickCount = 0;
						attack = 0;
						cloneCount = 0;
						killCount = 0;
						idArray = [];

						$(".ryu.hpText").text(ryu.health);
						$(".guile.hpText").text(guile.health);
						$(".ken.hpText").text(ken.health);
						$(".dhalsim.hpText").text(dhalsim.health);

						})
					};
					playAgain();
				}

				});

			});

		});
		

	});};

bootup();


	