module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    uglify: {
      all_src: {
		src: 'dist/combined.src.js',
		dest: 'dist/combined.src.min.js'
	  }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};