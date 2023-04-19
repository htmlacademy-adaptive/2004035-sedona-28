import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import postimport from 'postcss-import';
import posturl from 'postcss-url';
import postsass from 'postcss-sass';
import notify from 'gulp-notify';

// Styles

export const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    // .pipe(plumber({
    //   errorHandler: notify.onError(function(err) {
    //     return {
    //       title: 'Task styles',
    //       message: "Error: <%= error.message %>",
    //       sound: true
    //     }
    //   })
    // }))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    // .pipe(postcss([
    //   postimport(),
    //   posturl()
    // ], {
    //   syntax: postsass
    // }))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
}


export default gulp.series(
  styles, server, watcher
);
