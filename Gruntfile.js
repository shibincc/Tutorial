module.exports = function(grunt){
  var basePath = "";
  var styles = [
      basePath + "style/page.css",
      basePath + "style/previewer.css"
  ];

  var libFiles = [
    basePath + "js/lib/src/tutorial_previewer.js"
  ];
  
  var buildFiles = [
    basePath + "launch.htm",
    basePath + "style/previewer.css",
    basePath + "style/previewer.css",

    basePath + "js/lib/tutorial_lib.js",
    basePath + "js/lib/previewer.tpl.htm",

    basePath + "ext/**",
    basePath + "demo/**"
  ];  


  grunt.initConfig({    
    concat: {
        options: {},
        lib: {
          src: libFiles,
          dest: basePath + 'js/lib/tutorial_lib.js' 
        },
        style: {
          src: styles,
          dest: basePath + 'style/tutorial_style.css' 
        },    
    },
    copy: {
      /*test: {
        files: [
          {expand: true, src: ['**'], dest: 'web', filter: 'isFile'},
        ]
      }*/
    },
    compress: {
      bulid: {
        options: {
          archive: basePath + 'build/tutorial_zip.zip'
        },
        files: [
          {src: buildFiles, dest: '/Tutorial', filter: 'isFile'}, // includes files in path
        ]
      }
    },
    watch: {
        js: {
            files: ['src/*.js'],
            tasks: ['concat:testfiles']
        }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-compress');

 
 /* grunt.registerTask('devbuild', ['concat:css','concat:build1','concat:build2','compress:fokker']);*/
  grunt.registerTask('lib', ['concat:lib']);
  grunt.registerTask('style', ['concat:style']);
  grunt.registerTask('style', ['concat:style']);
  
  grunt.registerTask('default', ['concat:style','concat:lib']);

  grunt.registerTask('build', ['concat:style','concat:lib','compress:bulid']);
 
};