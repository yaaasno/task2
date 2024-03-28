import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import browser from 'browser-sync';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import svgo from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import {deleteAsync} from 'del';
import optimizeImages from 'gulp-optimize-images';
import webp from 'gulp-webp';

const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
};

const html = () => {
  return gulp.src('source/*.html')
  .pipe(gulp.dest('build'));
};

const scripts = () => {
  return gulp.src('source/js/script.js')
  .pipe(gulp.dest('build/js'))
  .pipe(browser.stream());
};

const optimizeImagesAll = () => {
  return gulp.src('source/img/**/*')
    .pipe(optimizeImages({
      compressOptions: {
        jpeg: {
          quality: 80,
          progressive: true,
        },
        png: {
            quality: 90,
            progressive: true,
            compressionLevel: 6,
        },
        webp: {
            quality: 80,
        },
      }
    }))
    .pipe(gulp.dest('build/img'))
};

const imageWebp = () => {
  return gulp.src('source/img/**/*.{png,jpg}')
  .pipe(webp())
  .pipe(gulp.dest('source/img'))
};

const copyImages = () => {
  return gulp.src('source/img/**/*.{png,jpg,webp}')
  .pipe(gulp.dest('build/img'))
};

const svg = () =>
  gulp.src(['source/img/*.svg', '!source/img/icons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'));

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
    .pipe(svgo())
    .pipe(svgstore({
    inlineSvg: true
  }))
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('build/img'));
};


const copy = (done) => {
  gulp.src([
    'source/fonts/**/*.{woff2,woff}',
    'source/*.ico',
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
};

const clean = async () => {
  return await deleteAsync(['build']);
};

const watcher = () => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/script.js', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
}

const server = (done) => {
  browser.init({
    server: {
    baseDir: 'build'
  },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

const reload = (done) => {
  browser.reload();
  done();
}

export const build = gulp.series(
  clean,
  copy,
  imageWebp,
  optimizeImagesAll,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
  ),
);

export default gulp.series(
  clean,
  copy,
  imageWebp,
  copyImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
  ),
  gulp.series(
    server,
    watcher
));
