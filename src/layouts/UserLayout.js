import React from 'react';
import Link from 'umi/link';
import GlobalFooter from '@/components/GlobalFooter';
import SelectLang from '@/components/SelectLang';
import styles from './UserLayout.less';
import logo from '../assets/logo.svg';
import { COPYRIGHT, LOGIN_LINKS, PROJECT_NAME, PROJECT_INTRO } from '../common/globalDefault';

class UserLayout extends React.PureComponent {
  // @TODO title
  // getPageTitle() {
  //   const { routerData, location } = this.props;
  //   const { pathname } = location;
  //   let title = 'Ant Design Pro';
  //   if (routerData[pathname] && routerData[pathname].name) {
  //     title = `${routerData[pathname].name} - Ant Design Pro`;
  //   }
  //   return title;
  // }

  render() {
    const { children } = this.props;
    return (
      // @TODO <DocumentTitle title={this.getPageTitle()}>
      <div className={styles.container}>
        <div className={styles.lang}>
          {/*<SelectLang/>*/}
        </div>
        <div className={styles.content}>
          <div className={styles.top}>
            <div className={styles.header}>
              <Link to="/">
                <img alt="logo" className={styles.logo} src={logo}/>
                <span className={styles.title}>{PROJECT_NAME}</span>
              </Link>
            </div>
            <div className={styles.desc}>{PROJECT_INTRO}</div>
          </div>
          {children}
        </div>
        <GlobalFooter links={LOGIN_LINKS} copyright={COPYRIGHT}/>
      </div>
    );
  }
}

export default UserLayout;
