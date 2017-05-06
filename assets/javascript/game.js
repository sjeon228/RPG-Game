var player = {};
var enemy = {};

var ryu = {name: "Ryu", health: 120, attack: 8};
var blanka = {name: "Blanka", health: 100, attack: 50};
var ken = {name: "Ken", health: 150, attack: 8};
var dhalsim = {name: "Dhalsim", health: 180, attack: 8};
var clickCount = 0;
var cloneCount = 0;
var playerID;
var enemyID;
var killCount;
var idArray = [];
var initial = document.body.innerHTML;





   

var bootup = function() {$(document).ready(function() {
	var initial = document.body.innerHTML;
	

	//$(".ryu.hpText").text(ryu.health);
	//$(".blanka.hpText").text(blanka.health);
	//$(".ken.hpText").text(ken.health);
	//$(".dhalsim.hpText").text(dhalsim.health);

	$(".character").click(function(){
		var playerID = $(this).attr("id");
		$(this).removeClass("character");
		$(this).addClass("clone");
		$(".character").appendTo(".enemies");
		$(".character > .border").css({"background": "red"});


		idArray.push(playerID);

		
		if(cloneCount == 0) {
				$(".clone").clone().appendTo(".fight");
			}

			cloneCount++;

		
		$(".character").click(function(){

			enemyID = $(this).attr("id");
			$(this).appendTo(".fight");
			


			if (idArray[0] == "ryu"){
				player = {name: "Ryu", health: 120, attack: 8};
			}
			if (idArray[0] == "blanka"){
				player = {name: "Blanka", health: 100, attack: 50};
			}
			if (idArray[0] == "ken"){
				player = {name: "Ken", health: 150, attack: 8};
			}
			if (idArray[0] == "dhalsim"){
				player = {name: "Dhalsim", health: 180, attack: 8};
			}
			

			if (enemyID == "ryu") {
				enemy = {name: "Ryu", health: 120, attack: 8};
			}
			if (enemyID == "blanka") {
				enemy = {name: "Blanka", health: 100, attack: 50};
			}
			if (enemyID == "ken") {
				enemy = {name: "Ken", health: 150, attack: 8};
			}
			if (enemyID == "dhalsim") {
				enemy = {name: "Dhalsim", health: 180, attack: 8};
			}

			idArray.push(enemyID);

			$(".attack").on("click",function(){
				
				clickCount++;

				var attack = player.attack * clickCount;

				$(".attackText").text("You attacked " + enemy.name + " for " + attack + " damage");
				$(".counterText").text(enemy.name + " attacked you back for " + enemy.attack + " damage");

				player.health = player.health - enemy.attack;
				enemy.health = enemy.health - attack;

				$("."+ idArray[0]+".player.hpText").text(player.health);
				$("."+ idArray[1]+".player.hpText").text(enemy.health);

			
			

		if (player.health <= 0){
					$(".attack").off("click");

					$(".attackText").text("You have been defeated...Game Over!!!");

					var resetBtn = $("<button>");

					resetBtn.addClass("btn btn-default reset").text("Reset");

					$(".counterText").html(resetBtn);

					var playAgain = function() {

						$(resetBtn).on("click",function() {


							document.body.innerHTML = initial;

							bootup();

							
						ryu.health = 120;
						blanka.health = 100;
						ken.health = 150;
						dhalsim.health = 180;
						clickCount = 0;
						attack = 0;
						cloneCount = 0;
						idArray = [];

						$(".ryu.hpText").text(ryu.health);
						$(".blanka.hpText").text(blanka.health);
						$(".ken.hpText").text(ken.health);
						$(".dhalsim.hpText").text(dhalsim.health);

					})
					};
					playAgain();
				}

				if (enemy.health <= 0){
					$(".attack").off("click");

					$(".attackText").text("You have defeated " + enemy.name + ". You can choose to fight another enemy");

					$(".bPanel").empty();

					$(".counterText").empty();

					
				}

				});

			})

		
		});

	});};

bootup();


	