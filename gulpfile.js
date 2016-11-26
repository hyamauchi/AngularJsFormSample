var gulp       = require('gulp');
var webserver  = require('gulp-webserver');

var paths = {
  srcDir : 'html'
}

gulp.task('webserver', function() {
  gulp.src(paths.srcDir)
    .pipe(webserver({
      livereload: true,
      fallback: 'index.html',
      open: true
    }));
});

gulp.task('default', ['webserver']);
