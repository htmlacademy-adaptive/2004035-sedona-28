import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import notify from 'gulp-notify';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import del from 'del';
import terser from 'gulp-terser';
import svgmin from 'gulp-svgmin';
import groupCssMediaQueries from 'gulp-group-css-media-queries';
import svgSprite from 'gulp-svg-sprite';

// Styles

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber({
      errorHandler: notify.onError(function(err) {
        return {
          title: 'SCSS',
          message: "Error: <%= error.message %>",
          sound: true
        }
      })
    }))
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(groupCssMediaQueries())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
}

const styleServer = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML

const html = () => {
  return gulp.src('source/*.html')
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'))
}

// Script

const sctipt = () => {
  return gulp.src('source/js/*js')
    .pipe(terser())
    .pipe(gulp.dest('build/js'))
}

// Image

const optimiseImage = () => {
  return gulp.src(['source/img/**/*.{jpg,png}', '!source/img/**/*.svg'])
    .pipe(squoosh())
    .pipe(gulp.dest('build/img'))
}

// WebP

const createWebp = () => {
  return gulp.src('source/img/*.{jpg,png}')
    .pipe(squoosh({
      webp: {}
    }))
    .pipe(gulp.dest('build/img'))
}

// SVG

const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/svg'])
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'))
}

const sprite = () => {
  return gulp.src('source/img/svg/*.svg')
    .pipe(svgSprite({
      mode: {
        stack: {
          sprite: '../sprite.svg'
        }
      }
    }))
    .pipe(gulp.dest('build/img'))
}

// Clean

const clean = () => {
  return del('build')
}

// Copy

const copy = () => {
  return gulp.src('source/fonts/*.*', { base: 'source' })
    .pipe(gulp.dest('build'))
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
  gulp.watch('source/sass/**/*.scss', gulp.series(styleServer));
  gulp.watch('source/*.html').on('change', browser.reload);
}

const build = gulp.series(
  clean,
  gulp.parallel(
    html,
    styles,
    sctipt,
    optimiseImage,
    createWebp,
    svg,
    sprite,
    copy
  )
)

gulp.task('build', build)

export default gulp.series(
  styleServer, sprite, server, watcher
);
