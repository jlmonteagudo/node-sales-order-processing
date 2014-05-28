module.exports = function(config) {
    config.set({
        basePath: '..',
        frameworks: ['ng-scenario'],
        files: [
            'js/*.js',
            'partial/**/*.js'
        ],
        exclude: [],
        port: 8080,
        logLevel: config.LOG_INFO,
        autoWatch: false,
        browsers: ['Chrome'],
        singleRun: false,
        urlRoot: '/_karma_/',
        proxies: {
            '/': 'http://localhost:9000/'
        }
    });
};


