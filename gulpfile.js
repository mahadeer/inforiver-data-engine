const gulp = require('gulp');
const del = require('del');

/**
 * COMPONENTS BUILD
 */

function cleanDist() {
    return del(`./lib`);
}

exports.clean = gulp.series(cleanDist);
