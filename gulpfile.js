const gulp = require('gulp');
const del = require('del');

var destination = 'build/';

gulp.task('clean', function(){
     return del('build/**', {force:true});
});

gulp.task('copy', function(){
    gulp.src('index.html').pipe(gulp.dest('build/'));
    gulp.src('css/clean-blog.min.css').pipe(gulp.dest('build/css/'));
    gulp.src('img/*').pipe(gulp.dest('build/img/'));
    return gulp.src('js/main.js').pipe(gulp.dest('build/js/'));
});

gulp.task('config', function(done){
    if (!process.env.CONTRACT_ADDRESS){
        throw 'Contract Address is a must!';
    }
    require('fs').writeFileSync('build/js/config.js', '//Generated by Gulp\nvar contract = "'+process.env.CONTRACT_ADDRESS+'";\nvar maxPosts = '+(process.env.MAX_POSTS ? process.env.MAX_POSTS : 5)
    +';\nvar twitter = "'+(process.env.TWITTER ? process.env.TWITTER : '')
    +'";\nvar facebook = "'+(process.env.FACEBOOK ? process.env.FACEBOOK : '')
    +'";\nvar github = "'+(process.env.GITHUB ? process.env.GITHUB : '')
    +'";\nvar blockexplorer = "'+(process.env.EXPLORER_PREFIX ? process.env.EXPLORER_PREFIX : 'https://kovan.etherscan.io')
    +'";\nvar prefix = "'+(process.env.API_PREFIX ? process.env.API_PREFIX : 'https://alpha-api.ethvigil.com/contract/')+'" + contract;');
    done();
});

gulp.task('default', gulp.series('clean', 'copy', 'config'));
