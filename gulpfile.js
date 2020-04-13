const gulp = require('gulp'),
  spritesmith = require('gulp.spritesmith'),
  babel = require('gulp-babel');
sass = require('gulp-sass');
// html include
gulp.task('default', function() {
  // 노드 소스
  gulp
    .src('es6/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
  // 브라우저 소스
  gulp
    .src('public/es6/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('public/dist'));
});

// Sass
gulp.task('sass', function() {
  return gulp
    .src('./src/scss/*.scss') //입력경로
    .pipe(sass().on('error', sass.logError)) //캐치문
    .pipe(gulp.dest('./dist/css')); //출력경로
});

gulp.task('sass:watch', function() {
  gulp.watch('./src/scss/*.scss', ['sass']);
});
// gulp 서버

// image sprite
gulp.task('sprite', function() {
  var spriteData = gulp.src('assets/beverages/1X/*.png').pipe(
    spritesmith({
      imgName: 'sp_all.png',
      padding: 4,
      cssName: 'sp_all.css',
    }),
  );
  spriteData.img.pipe(gulp.dest('./src/img'));
  spriteData.css.pipe(gulp.dest('./src/css'));
});
