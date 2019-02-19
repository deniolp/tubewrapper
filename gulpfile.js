/* eslint-disable no-undef */
let gulp = require(`gulp`);
let server = require(`browser-sync`).create();

gulp.task(`serve`, function () {
  server.init({
    server: ``,
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch(`*.css`).on(`change`, server.reload);
  gulp.watch(`*.html`).on(`change`, server.reload);
  gulp.watch(`*.js`).on(`change`, server.reload);
});
