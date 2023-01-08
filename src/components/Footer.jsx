import React from 'react';
import maroof from '../assets/images/maroof.png';

import '../style/footer.css';

function Footer() {
  return (
    <footer>
        <a href='#' className='maroofLink'>
            <img src={maroof}  alt="maroofImg" />
        </a>
        <p>© 2020 ALGYM All Rights Reserved.Developed by</p>
        <a href='#' className='inovaLink'>INOVA LLC</a>
    </footer>
  )
}

export default Footer