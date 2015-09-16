module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        typescript: {
            src: {
                src: ['src/**/*.ts'],
                dest: 'js',
                options: {
                    module: 'commonjs',
                    target: 'es5',
                    sourceMap: true,
                    declaration: false,
                    experimentalDecorators: true,
                    watch: true
                }
            },
            test: {
                src: ['test/**/*.ts'],
                dest: 'js-test',
                options: {
                    module: 'commonjs', //or
                    target: 'es5', //or es3
                    sourceMap: true,
                    declaration: false,
                    experimentalDecorators: true
                }
            }
        },
        'node_mocha': {
            test: {
                src: ['js-test/test/**/*.js'],
                options: {
                    mochaOptions: {
                        globals: ['expect'],
                        timeout: 3000,
                        ignoreLeaks: false,
                        ui: 'bdd',
                        reporter: 'landing'
                    }
                }
            },
            coverage: {
                src: ['js-test/test/**/*.js'],
                options: {
                    mochaOptions: {
                        globals: ['expect'],
                        timeout: 3000,
                        ignoreLeaks: false,
                        ui: 'bdd',
                        reporter: 'spec'
                    },
                    reportFormats: ['html'], // other grunt-mocha-istanbul can be added here
                    runCoverage: true // Run the unit test and generate coverage test
                }
            }
        },
        'http-server': {
            'coverage': {
                root: 'coverage'
            }
        },
        shell: {
            debug: {
                command: 'node-debug js/rest/rest-crud.js'
            }
        },
        nodemon: {
            dev: {
                script: 'js/rest/rest-crud.js'
            }
        },
        tsd: {
            refresh: {
                options: {
                    command: 'reinstall',
                    latest: true,
                    config: 'tsd.json'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-node-mocha');
    grunt.loadNpmTasks('grunt-http-server');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-nodemon');
    grunt.loadNpmTasks('grunt-tsd');

    grunt.registerTask('build', ['tsd', 'typescript:src']);
    grunt.registerTask('test', ['typescript:test', 'node_mocha:test']);
    grunt.registerTask('coverage', ['typescript:test', 'node_mocha:coverage', 'http-server:coverage']);
    grunt.registerTask('run', ['nodemon']);
    // Must have installed node-inspector globally 'sudo npm install -g node-inspector'
    grunt.registerTask('debug', ['shell:debug']);

};