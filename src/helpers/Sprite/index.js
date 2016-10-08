import server from 'svg-sprite-loader/lib/server-side-sprite';
import BrowserSprite from 'svg-sprite-loader/lib/web/sprite';

/**
 * On server side we can not attach svg to
 * document.body (target).
 * We check if we're on client and then we assign
 * server side generated SVG string to BrowserSprite.content
 *
 * Great article about svg sprites:
 * https://medium.com/@deeepakampolu/til-using-svg-icon-sprites-with-webpack-2fd4db7ead76#.z928k1emk
 *
 * TODO: Maybe investigate svg external reference aproach
 * https://css-tricks.com/svg-use-with-external-reference-take-2/
 */
function Sprite() {
  this.server = server;
}

/**
 * Proxy method for BrowserSprite class
 *
 * @param {Maybe<HTMLElement>} target
 */
Sprite.prototype.render = function render(target) {
  const sprite = new BrowserSprite();

  sprite.content = this.server.symbols;
  sprite.render(target);
};

export default new Sprite();
