(function() {
	'use strict';

	var muted = false;

	module.exports = function(pubSub) {
		var numberSound = new Howl({
			src: ['../../sounds/number.mp3', '../../sounds/number.ogg', '../../sounds/number.wav'],
			sprite: {
				'number_1_0':  [ 300, 1000 ],
				'number_1_1':  [ 1400, 900 ],
				'number_2_0':  [ 2500, 1000 ],
				'number_2_1':  [ 3600, 1000 ],
				'number_3_0':  [ 4700, 1100 ],
				'number_3_1':  [ 5900, 1200 ],
				'number_4_0':  [ 7300, 1000 ],
				'number_4_1':  [ 8400, 1300 ],
				'number_5_0':  [ 9800, 1200 ],
				'number_5_1':  [ 11100, 1200 ],
				'number_6_0':  [ 12400, 1100 ],
				'number_6_1':  [ 13700, 1300 ],
				'number_7_0':  [ 15100, 1200 ],
				'number_7_1':  [ 16400, 1500 ],
				'number_8_0':  [ 18000, 800 ],
				'number_8_1':  [ 19000, 900 ],
				'number_9_0':  [ 20000, 1200 ],
				'number_9_1':  [ 21300, 1300 ],
				'number_10_0': [ 22700, 1100 ],
				'number_10_1': [ 23900, 1200 ],
				'number_11_0': [ 25300, 1100 ],
				'number_11_1': [ 26500, 1400 ],
				'number_12_0': [ 28000, 1100 ],
				'number_12_1': [ 29300, 1400 ],
				'number_13_0': [ 30800, 1400 ],
				'number_13_1': [ 32200, 1600 ],
				'number_14_0': [ 33900, 1300 ],
				'number_14_1': [ 35200, 1500 ],
				'number_15_0': [ 36800, 1400 ],
				'number_15_1': [ 38200, 1500 ],
				'number_16_0': [ 39800, 1600 ],
				'number_16_1': [ 41400, 1700 ],
				'number_17_0': [ 43200, 1500 ],
				'number_17_1': [ 44800, 1800 ],
				'number_18_0': [ 46700, 1400 ],
				'number_18_1': [ 48200, 1600 ],
				'number_19_0': [ 50000, 1200 ],
				'number_19_1': [ 51300, 1900 ],
				'number_20_0': [ 53200, 1200 ],
				'number_20_1': [ 54500, 1200 ],
				'number_21_0': [ 55800, 1500 ],
				'number_21_1': [ 57400, 1900 ],
				'number_22_0': [ 59300, 1400 ],
				'number_22_1': [ 60700, 1600 ],
				'number_23_0': [ 62400, 1300 ],
				'number_23_1': [ 63800, 1600 ],
				'number_24_0': [ 65500, 1400 ],
				'number_24_1': [ 66900, 1500 ],
				'number_25_0': [ 68500, 1500 ],
				'number_25_1': [ 70000, 1700 ],
				'number_26_0': [ 71800, 1500 ],
				'number_26_1': [ 73400, 1600 ],
				'number_27_0': [ 75100, 1500 ],
				'number_27_1': [ 76600, 1500 ],
				'number_28_0': [ 78200, 1100 ],
				'number_28_1': [ 79400, 1200 ],
				'number_29_0': [ 80700, 1400 ],
				'number_29_1': [ 82200, 1600 ],
				'number_30_0': [ 83900, 1200 ],
				'number_30_1': [ 85200, 1400 ],
				'number_31_0': [ 86700, 1400 ],
				'number_31_1': [ 88100, 1700 ],
				'number_32_0': [ 89800, 1600 ],
				'number_32_1': [ 91400, 1900 ],
				'number_33_0': [ 93300, 1600 ],
				'number_33_1': [ 94900, 1600 ],
				'number_34_0': [ 96600, 1400 ],
				'number_34_1': [ 98100, 1800 ],
				'number_35_0': [ 100000, 1500 ],
				'number_35_1': [ 101500, 1700 ],
				'number_36_0': [ 103400, 1700 ],
				'number_36_1': [ 105200, 1900 ],
				'number_37_0': [ 107200, 1500 ],
				'number_37_1': [ 108700, 1700 ],
				'number_38_0': [ 110500, 1300 ],
				'number_38_1': [ 111900, 1500 ],
				'number_39_0': [ 113500, 1400 ],
				'number_39_1': [ 115000, 1700 ],
				'number_40_0': [ 116800, 1200 ],
				'number_40_1': [ 118000, 1300 ],
				'number_41_0': [ 119400, 1500 ],
				'number_41_1': [ 121000, 1600 ],
				'number_42_0': [ 122700, 1500 ],
				'number_42_1': [ 124300, 1600 ],
				'number_43_0': [ 126000, 1500 ],
				'number_43_1': [ 127600, 1700 ],
				'number_44_0': [ 129400, 1400 ],
				'number_44_1': [ 130900, 1700 ],
				'number_45_0': [ 132700, 1500 ],
				'number_45_1': [ 134300, 1800 ],
				'number_46_0': [ 136300, 1500 ],
				'number_46_1': [ 137900, 1800 ],
				'number_47_0': [ 139800, 1600 ],
				'number_47_1': [ 141500, 1600 ],
				'number_48_0': [ 143300, 1300 ],
				'number_48_1': [ 144700, 1600 ],
				'number_49_0': [ 146400, 1500 ],
				'number_49_1': [ 148000, 1700 ],
				'number_50_0': [ 149800, 1100 ],
				'number_50_1': [ 151000, 2400 ],
				'number_51_0': [ 152500, 1500 ],
				'number_51_1': [ 154000, 1600 ],
				'number_52_0': [ 155700, 1700 ],
				'number_52_1': [ 157400, 1700 ],
				'number_53_0': [ 159300, 1600 ],
				'number_53_1': [ 160900, 2000 ],
				'number_54_0': [ 163000, 1400 ],
				'number_54_1': [ 164500, 2000 ],
				'number_55_0': [ 166600, 1500 ],
				'number_55_1': [ 168200, 1800 ],
				'number_56_0': [ 170100, 1400 ],
				'number_56_1': [ 171600, 2000 ],
				'number_57_0': [ 173600, 1600 ],
				'number_57_1': [ 175200, 1600 ],
				'number_58_0': [ 176900, 1400 ],
				'number_58_1': [ 178400, 1400 ],
				'number_59_0': [ 180000, 1600 ],
				'number_59_1': [ 181700, 1700 ],
				'number_60_0': [ 183500, 1200 ],
				'number_60_1': [ 184800, 1500 ],
				'number_61_0': [ 186500, 1400 ],
				'number_61_1': [ 188000, 1600 ],
				'number_62_0': [ 189700, 1600 ],
				'number_62_1': [ 191400, 1800 ],
				'number_63_0': [ 193300, 1400 ],
				'number_63_1': [ 194800, 1900 ],
				'number_64_0': [ 196800, 1400 ],
				'number_64_1': [ 198300, 1800 ],
				'number_65_0': [ 200200, 1600 ],
				'number_65_1': [ 202000, 2000 ],
				'number_66_0': [ 204100, 1400 ],
				'number_66_1': [ 205700, 1900 ],
				'number_67_0': [ 207700, 1500 ],
				'number_67_1': [ 209200, 1700 ],
				'number_68_0': [ 210900, 1400 ],
				'number_68_1': [ 212400, 1700 ],
				'number_69_0': [ 214200, 1500 ],
				'number_69_1': [ 215800, 1900 ],
				'number_70_0': [ 217800, 1000 ],
				'number_70_1': [ 219900, 400 ],
				'number_71_0': [ 220400, 1500 ],
				'number_71_1': [ 222000, 1800 ],
				'number_72_0': [ 223900, 1500 ],
				'number_72_1': [ 225500, 1900 ],
				'number_73_0': [ 227400, 1600 ], // 73 only appears once in the sound file
				'number_73_1': [ 227400, 1600 ], // So is duplicated here
				'number_74_0': [ 229200, 1600 ],
				'number_74_1': [ 230800, 1800 ],
				'number_75_0': [ 232700, 1600 ],
				'number_75_1': [ 234400, 2000 ]
			}
		});

		var introSound = new Howl({
			src: ['../../sounds/intro.mp3', '../../sounds/intro.ogg', '../../sounds/intro.wav'],
			sprite: {
				'intro_lets_play_bingo_0':      [0, 4200],
				'intro_lets_play_bingo_1':      [4300, 3600],
				'intro_lets_play_bingo_2':      [8100, 2000],
				'intro_lets_play_bingo_3':      [10200, 1900],
				'intro_lets_do_this_0':         [12300, 1400],
				'intro_lets_do_this_1':         [14100, 1400],
				'intro_here_we_go_0':           [15900, 1500],
				'intro_here_we_go_1':           [17500, 2300],
				'intro_lets_start_the_balls_0': [19900, 1900],
				'intro_lets_start_the_balls_1': [22100, 2300]
			}
		});

		var winnerSound = new Howl({
			src: ['../../sounds/winner.mp3', '../../sounds/winner.ogg', '../../sounds/winner.wav'],
			sprite: {
				'winner_bingo_0':               [0, 1300],
				'winner_bingo_1':               [1400, 1300],
				'winner_bingo_2':               [2800, 2900],
				'winner_bingo_3':               [5800, 3700],
				'winner_thats_bingo_0':         [9800, 1600],
				'winner_thats_bingo_1':         [11500, 2100],
				'winner_we_have_a_winner_0':    [13700, 1400],
				'winner_we_have_a_winner_1':    [15200, 2600],
				'winner_congratulations_0':     [17900, 1800],
				'winner_congratulations_1':     [19800, 2200]
			}
		});

		function random(n) {
			return Math.floor(Math.random() * n);
		}

		function randomFromArray(array) {
			return array[random(array.length)];
		}

		function playNumberSound(n) {
			numberSound.play('number_' + n + '_' + random(2));
		}

		function playIntroSound() {
			var sounds = [
				'intro_lets_play_bingo_0',
				'intro_lets_play_bingo_1',
				'intro_lets_play_bingo_2',
				'intro_lets_play_bingo_3',
				'intro_lets_do_this_0',
				'intro_lets_do_this_1',
				'intro_here_we_go_0',
				'intro_here_we_go_1',
				'intro_lets_start_the_balls_0',
				'intro_lets_start_the_balls_1'
			];

			introSound.play(randomFromArray(sounds));
		}

		function playWinnerSound() {
			var sounds = [
				'winner_bingo_0',
				'winner_bingo_1',
				'winner_bingo_2',
				'winner_bingo_3',
				'winner_thats_bingo_0',
				'winner_thats_bingo_1',
				'winner_we_have_a_winner_0',
				'winner_we_have_a_winner_1',
				'winner_congratulations_0',
				'winner_congratulations_1'
			];

			winnerSound.play(randomFromArray(sounds));
		}

		function playWelcomeSound() {
			var sounds = [
				'winner_bingo_1',
				'winner_bingo_2'
			];

			winnerSound.play(randomFromArray(sounds));
		}

		var userAgent = window.navigator.userAgent.toLowerCase();

		pubSub.on('playSound', function(soundToPlay) {
			if (!muted) {
				if (soundToPlay === 'intro') { // When a new round is started
					playIntroSound();
				} else if (soundToPlay === 'winner') { // When someone gets bingo
					playWinnerSound();
				} else if (soundToPlay === 'welcome') { // When the game first loads
					playWelcomeSound();
				} else {
					// Don't even attempt to play numbers in IE
					if (userAgent.indexOf('msie') === -1 && userAgent.indexOf('trident') === -1) {
						playNumberSound(soundToPlay); // Individual numbers
					}
				}
			}
		});

	};
})();