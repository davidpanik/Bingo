(function() {
	'use strict';

	require('../other/requestAnimationFrame');
	var noise = require('../other/perlin');

	module.exports = function() {
		var PerlinView = Ractive.extend({
			template: '#perlinTemplate',
			data: {},
			oninit: function() {

			},
			onrender: function() {
				var width     = 800;
				var height    = 800;
				var speed     = 0.02;
				var red       = 255;
				var green     = 106;
				var blue      = 0;
				var alpha     = 255;
				var cellSize  = 300;
				var seed      = Math.random() * 1000;
				var canvas    = document.getElementById('perlin');
				canvas.width  = width;
				canvas.height = height;

				var context   = canvas.getContext('2d');
				var image     = context.createImageData(canvas.width, canvas.height);
				var data      = image.data;

				function drawFrame() {
					for (var x = 0; x < width; x++) {
						for (var y = 0; y < height; y++) {
							var value = noise.perlin3( x / cellSize, y / cellSize, seed) + 1;
							var cell = (x + y * width) * 4;

							data[cell] = value * red;
							data[cell + 1] = value * green;
							data[cell + 2] = value * blue;
							data[cell + 3] = value * alpha;
						}
					}

					context.putImageData(image, 0, 0);
					seed += speed;

					requestAnimationFrame(drawFrame);
				}

				requestAnimationFrame(drawFrame);
			}
		});

		return PerlinView;
	};
})();