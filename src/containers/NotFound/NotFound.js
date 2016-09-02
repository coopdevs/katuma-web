import React, { Component }from 'react';

import Icon from 'components/Icon/';
import { GLYPHS } from 'components/Icon/glyphs';
import Button from 'components/Button';

import layoutStyles from '../../styles/layouts/index.scss';
import styles from './styles/index.scss';


class NotFound extends Component {
  static layoutCentered = true;

  render() {
    return (
      <div className={layoutStyles.layoutCentered}>
        <div className={layoutStyles.layoutCentered__body}>
          <div className={styles.notFound}>
            <div className={styles.icon}><Icon glyph={GLYPHS.mapSigns} /></div>
            <h1>Upps!</h1>
            <p>Pagina no encontrada</p>
            <Button primary linkTo="/">Volver</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default NotFound;
