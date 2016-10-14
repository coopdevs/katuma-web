import React, { Component } from 'react';
import Helmet from 'react-helmet';

import Header from '../Header';
import Icon from '../../components/Icon/';
import { GLYPHS } from '../../components/Icon/glyphs';
import styles from './styles/index.scss';

export default class Home extends Component {
  render() {
    return (
      <div className={styles.home}>
        <Helmet title="Bienvenido" />

        <Header />

        <div className={styles.welcome}>
          <div className="wrap container-fluid">
            <div className={`row ${styles.header}`}>
              <h1>Ahórrate los intermediarios, compra directamente a los productores.</h1>
            </div>
          </div>

          <div className={styles.services}>
            <div className="wrap container-fluid">
              <div className={`row ${styles.services__inner}`}>
                <div className={`col-xs-12 col-sm-4 ${styles.services__item}`}>
                  <div className={styles.services__icon}><Icon glyph={GLYPHS.cogs} /></div>
                  <p><strong>Gestiona fácilmente</strong> grupos de consumo.</p>
                </div>
                <div className={`col-xs-12 col-sm-4 ${styles.services__item}`}>
                  <div className={styles.services__icon}><Icon glyph={GLYPHS.users} /></div>
                  <p><strong>Crea vínculos de calidad</strong> con los productores.</p>
                </div>
                <div className={`col-xs-12 col-sm-4 ${styles.services__item}`}>
                  <div className={styles.services__icon}><Icon glyph={GLYPHS.lineChart} /></div>
                  <p><strong>Un mercado alternativo</strong> para productores.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.phrase}>
          <div className={`wrap container-fluid ${styles.phrase__container}`}>
            <div className={`${styles.phrase__inner}`}>
              <p>
                <strong>KATUMA</strong> es una <strong>herramienta</strong> para administradores, miembros y productores de
                <strong> grupos de consumo colaborativo</strong>.
              </p>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <div className="wrap container-fluid">
            <ul>
              <li>
                <a className={styles.footer_link} href="https://github.com/coopdevs/katuma" target="_blank">
                  <Icon glyph={GLYPHS.github} />
                  <span>Nuestro código</span>
                </a>
              </li>
              <li>
                <a className={styles.footer_link} href="https://twitter.com/katuma_org" target="_blank">
                  <Icon glyph={GLYPHS.twitter} />
                  <span>@katuma_org</span>
                </a>
              </li>
              <li>
                <a className={styles.footer_link} href="mailto:info@katuma.org">
                  <Icon glyph={GLYPHS.envelope} />
                  <span>Contacta</span>
                </a>
              </li>
            </ul>
            <p className={styles.footer__love}>
              Make with <Icon glyph={GLYPHS.heart} /> by <a href="http://coopdevs.org/" target="_blank">Coopdevs</a>
            </p>
          </div>
        </div>

      </div>
    );
  }
}
