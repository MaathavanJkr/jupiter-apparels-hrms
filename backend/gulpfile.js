const gulp = require('gulp');
const ts = require('gulp-typescript');
const copy = require('gulp-copy');
const tsProject = ts.createProject('tsconfig.json');

gulp.task('scripts', () => {
  return tsProject.src()
    .pipe(tsProject())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-sql', () => {
  return gulp.src('src/database/*.sql')
    .pipe(copy('dist/database', { prefix: 2 }));
});

gulp.task('build', gulp.series('scripts', 'copy-sql'));