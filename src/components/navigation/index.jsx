import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Link, withRouter} from 'react-router-dom';
import config from './config';
import classNames from 'classnames/bind';

import styles from './navigation.scss';

const stylesContext = classNames.bind(styles);

class Navigation extends Component {
  state = {
    activeLink: null
  };

  static getDerivedStateFromProps(props) {
    const [activeLink] = props.location.pathname.split('/').slice(-1);
    return {
      activeLink
    };
  }

  getNavigationItemClasses (path) {
    const {activeLink} = this.state;

    return stylesContext({
      'navigation-item': true,
      'active': activeLink === path
    });
  }

  updateActiveLink(path) {
    return () => this.setState({activeLink: path});
  }

  render() {
    const {match: {url}} = this.props;

    return (
      <nav className={styles.navigation}>
        {
          config[this.props.settings].map(section => (
            <div key={section.title} className={styles['navigation-section']}>
              <h1 className={styles['navigation-section-title']}>{section.title}</h1>
              <ul>
                {section.links.map(link =>
                  <li
                    key={link.label}
                    onClick={this.updateActiveLink(link.path)}>

                    <Link to={`${url}/${link.path}`}
                          className={this.getNavigationItemClasses(link.path)}>
                      <span className={styles['active-link-indicator']} />
                      <span>{link.label}</span>
                    </Link>
                  </li>)}
              </ul>
            </div>
          ))
        }
      </nav>
    );
  }
}

Navigation.propTypes = {
  match: PropTypes.shape({
    url: PropTypes.string.isRequired,
  }).isRequired,
  settings: PropTypes.string
};

export default withRouter(Navigation);
