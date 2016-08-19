/*
 After you have changed the settings at "Your code goes here",
 run this with one of these options:
 "grunt" alone creates a new, completed images directory
 "grunt clean" removes the images directory
 "grunt responsive_images" re-processes images without removing the old ones
 */

module.exports = function(grunt) {
	
	require('load-grunt-tasks')(grunt);
	
	require('time-grunt')(grunt);
	
	var taskConfig = {
		
		responsive_images: {
			dev: {
				options: {
					engine: 'im',
					sizes: [{
						/*
						 Change these:
						*/
						 width: 1600,
						 suffix: '_large_2x',
						 quality: 30

					}]
				},
				
				/*
				 You don't need to change this part if you don't change
				 the directory structure.
				 */
				files: [{
					expand: true,
					src: ['*.{gif,jpg,png}'],
					cwd: 'images_src/',
					dest: 'images/'
				}]
			}
		},
		
		/* Clear out the images directory if it exists */
		clean: {
			dev: {
				src: ['images'],
			},
		},
		
		/* Generate the images directory if it is missing */
		mkdir: {
			dev: {
				options: {
					create: ['images']
				},
			},
		},
		
		/* Copy the "fixed" images that don't go through processing into the images/directory */
		copy: {
			dev: {
				files: [{
					expand: true,
					src: 'images_src/fixed/*.{gif,jpg,png}',
					dest: 'images/'
				}]
			},
		}
	};
	
	grunt.initConfig(taskConfig);

	grunt.registerTask('default', ['clean', 'mkdir', 'copy', 'responsive_images']);
};
