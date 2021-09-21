const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const less = require("gulp-less");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const csso = require("postcss-csso");
const rename = require("gulp-rename");
const del = require("del");
const sync = require("browser-sync").create();

const styles = () => {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
}

exports.styles = styles;

//Copy

const copy = (done) => {
  gulp.src("source/**/*.*"
    , {
      base: "source"
    })
    .pipe(gulp.dest("."))
  done();
}

exports.copy = copy;

//Clean

const clean = () => {
  return del("build")
}
exports.clean = clean;

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source' //сюда смотрит сервер
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

const reload = done => {
  sync.reload();
  done();
}

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles, reload));
  gulp.watch("source/js/main.js").on("change", sync.reload);
  gulp.watch("source/*.html").on("change", sync.reload);
}

const pages = gulp.series(
  styles,
  copy
)
exports.pages = pages;

exports.default = gulp.series(styles, server, watcher);
