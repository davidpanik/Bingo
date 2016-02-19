(function() {
	'use strict';

	module.exports = function(pubSub) {
		var numberSound = new Howl({
			urls: ['sounds/number.mp3'],
			sprite: {
				'number_1_0':                   [0, 0],
				'number_1_1':                   [0, 0],
				'number_2_0':                   [0, 0],
				'number_2_1':                   [0, 0],
				'number_3_0':                   [0, 0],
				'number_3_1':                   [0, 0],
				'number_4_0':                   [0, 0],
				'number_4_1':                   [0, 0],
				'number_5_0':                   [0, 0],
				'number_5_1':                   [0, 0],
				'number_6_0':                   [0, 0],
				'number_6_1':                   [0, 0],
				'number_7_0':                   [0, 0],
				'number_7_1':                   [0, 0],
				'number_8_0':                   [0, 0],
				'number_8_1':                   [0, 0],
				'number_9_0':                   [0, 0],
				'number_9_1':                   [0, 0],
				'number_10_0':                  [0, 0],
				'number_10_1':                  [0, 0],
				'number_11_0':                  [0, 0],
				'number_11_1':                  [0, 0],
				'number_12_0':                  [0, 0],
				'number_12_1':                  [0, 0],
				'number_13_0':                  [0, 0],
				'number_13_1':                  [0, 0],
				'number_14_0':                  [0, 0],
				'number_14_1':                  [0, 0],
				'number_15_0':                  [0, 0],
				'number_15_1':                  [0, 0],
				'number_16_0':                  [0, 0],
				'number_16_1':                  [0, 0],
				'number_17_0':                  [0, 0],
				'number_17_1':                  [0, 0],
				'number_18_0':                  [0, 0],
				'number_18_1':                  [0, 0],
				'number_19_0':                  [0, 0],
				'number_19_1':                  [0, 0],
				'number_20_0':                  [0, 0],
				'number_20_1':                  [0, 0],
				'number_21_0':                  [0, 0],
				'number_21_1':                  [0, 0],
				'number_22_0':                  [0, 0],
				'number_22_1':                  [0, 0],
				'number_23_0':                  [0, 0],
				'number_23_1':                  [0, 0],
				'number_24_0':                  [0, 0],
				'number_24_1':                  [0, 0],
				'number_25_0':                  [0, 0],
				'number_25_1':                  [0, 0],
				'number_26_0':                  [0, 0],
				'number_26_1':                  [0, 0],
				'number_27_0':                  [0, 0],
				'number_27_1':                  [0, 0],
				'number_28_0':                  [0, 0],
				'number_28_1':                  [0, 0],
				'number_29_0':                  [0, 0],
				'number_29_1':                  [0, 0],
				'number_30_0':                  [0, 0],
				'number_30_1':                  [0, 0],
				'number_31_0':                  [0, 0],
				'number_31_1':                  [0, 0],
				'number_32_0':                  [0, 0],
				'number_32_1':                  [0, 0],
				'number_33_0':                  [0, 0],
				'number_33_1':                  [0, 0],
				'number_34_0':                  [0, 0],
				'number_34_1':                  [0, 0],
				'number_35_0':                  [0, 0],
				'number_35_1':                  [0, 0],
				'number_36_0':                  [0, 0],
				'number_36_1':                  [0, 0],
				'number_37_0':                  [0, 0],
				'number_37_1':                  [0, 0],
				'number_38_0':                  [0, 0],
				'number_38_1':                  [0, 0],
				'number_39_0':                  [0, 0],
				'number_39_1':                  [0, 0],
				'number_40_0':                  [0, 0],
				'number_40_1':                  [0, 0],
				'number_41_0':                  [0, 0],
				'number_41_1':                  [0, 0],
				'number_42_0':                  [0, 0],
				'number_42_1':                  [0, 0],
				'number_43_0':                  [0, 0],
				'number_43_1':                  [0, 0],
				'number_44_0':                  [0, 0],
				'number_44_1':                  [0, 0],
				'number_45_0':                  [0, 0],
				'number_45_1':                  [0, 0],
				'number_46_0':                  [0, 0],
				'number_46_1':                  [0, 0],
				'number_47_0':                  [0, 0],
				'number_47_1':                  [0, 0],
				'number_48_0':                  [0, 0],
				'number_48_1':                  [0, 0],
				'number_49_0':                  [0, 0],
				'number_49_1':                  [0, 0],
				'number_50_0':                  [0, 0],
				'number_50_1':                  [0, 0],
				'number_51_0':                  [0, 0],
				'number_51_1':                  [0, 0],
				'number_52_0':                  [0, 0],
				'number_52_1':                  [0, 0],
				'number_53_0':                  [0, 0],
				'number_53_1':                  [0, 0],
				'number_54_0':                  [0, 0],
				'number_54_1':                  [0, 0],
				'number_55_0':                  [0, 0],
				'number_55_1':                  [0, 0],
				'number_56_0':                  [0, 0],
				'number_56_1':                  [0, 0],
				'number_57_0':                  [0, 0],
				'number_57_1':                  [0, 0],
				'number_58_0':                  [0, 0],
				'number_58_1':                  [0, 0],
				'number_59_0':                  [0, 0],
				'number_59_1':                  [0, 0],
				'number_60_0':                  [0, 0],
				'number_60_1':                  [0, 0],
				'number_61_0':                  [0, 0],
				'number_61_1':                  [0, 0],
				'number_62_0':                  [0, 0],
				'number_62_1':                  [0, 0],
				'number_63_0':                  [0, 0],
				'number_63_1':                  [0, 0],
				'number_64_0':                  [0, 0],
				'number_64_1':                  [0, 0],
				'number_65_0':                  [0, 0],
				'number_65_1':                  [0, 0],
				'number_66_0':                  [0, 0],
				'number_66_1':                  [0, 0],
				'number_67_0':                  [0, 0],
				'number_67_1':                  [0, 0],
				'number_68_0':                  [0, 0],
				'number_68_1':                  [0, 0],
				'number_69_0':                  [0, 0],
				'number_69_1':                  [0, 0],
				'number_70_0':                  [0, 0],
				'number_70_1':                  [0, 0],
				'number_71_0':                  [0, 0],
				'number_71_1':                  [0, 0],
				'number_72_0':                  [0, 0],
				'number_72_1':                  [0, 0],
				'number_73_0':                  [0, 0],
				'number_73_1':                  [0, 0],
				'number_74_0':                  [0, 0],
				'number_74_1':                  [0, 0],
				'number_75_0':                  [0, 0],
				'number_75_1':                  [0, 0]
			}
		});

		var introSound = new Howl({
			urls: ['sounds/intro.mp3'],
			sprite: {
				'intro_lets_play_bingo_0':      [0, 4200],
				'intro_lets_play_bingo_1':      [4300, 7900],
				'intro_lets_play_bingo_2':      [8100, 10100],
				'intro_lets_play_bingo_3':      [10200, 12100],
				'intro_lets_do_this_0':         [12300, 13700],
				'intro_lets_do_this_1':         [14100, 15500],
				'intro_here_we_go_0':           [15900, 17400],
				'intro_here_we_go_1':           [17500, 19800],
				'intro_lets_start_the_balls_0': [19900, 21800],
				'intro_lets_start_the_balls_1': [22100, 24400]
			}
		});

		var winnerSound = new Howl({
			urls: ['sounds/winner.mp3'],
			sprite: {
				'winner_bingo_0':               [0, 1300],
				'winner_bingo_1':               [1400, 2700],
				'winner_bingo_2':               [2800, 5700],
				'winner_bingo_3':               [5800, 9500],
				'winner_thats_bingo_0':         [9800, 11400],
				'winner_thats_bingo_1':         [11500, 13600],
				'winner_we_have_a_winner_0':    [13700, 15100],
				'winner_we_have_a_winner_1':    [15200, 17800],
				'winner_congratulations_0':     [17900, 19700],
				'winner_congratulations_1':     [19800, 22000]
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

		pubSub.on('playSound', function(soundToPlay) {
			if (soundToPlay === 'intro') {
				playIntroSound();
			} else if (soundToPlay === 'winner') {
				playWinnerSound();
			} else {
				playNumberSound(soundToPlay);
			}
		});
	};
})();