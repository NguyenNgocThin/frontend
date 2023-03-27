import React from 'react';

// material-ui
import { useTheme } from '@material-ui/styles';

/**
 * if you want to use image instead of <svg> uncomment following.
 *
 * import logoDark from './../../assets/images/logo-dark.svg';
 * import logo from './../../assets/images/logo.svg';
 *
 */

//-----------------------|| LOGO SVG ||-----------------------//

const Logo = () => {
    const theme = useTheme();

    return (
        /**
         * if you want to use image instead of svg uncomment following, and comment out <svg> element.
         */
        <img src="https://cskh.evnhcmc.vn/public/images/EVNHCMC2021.svg" alt="Berry" width="170" />
    );
};

export default Logo;