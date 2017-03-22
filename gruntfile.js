module.exports = function (grunt) {
    grunt.initConfig({
        watch: {
            css: {
                files: ['./sass/*.scss'],
                tasks: ['sass'],
            },
        },
        sass: {
            dist: {
                files: {
                    './css/main.css': './sass/main.scss'
                }
            }
        },
        browserSync: {
            bsFiles: {
                src:[
                    "./css/main.css"
                ]
            },
            options: {
                watchtask: true,
                server: {
                    baseDir: "./"
                }
            }
        }
    })

    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.registerTask('default', ['browserSync', 'watch']);

};