
import { Link } from 'react-router-dom';

import logo from '../../../assets/imagotipo.png';


const Logo = () => {
  return (
    <Link to={'/'}>
      <img
        src={logo}
        alt="ITX Mobile Shop Logo"
        style={{ height: "50px", width: "auto" }}
      />
    </Link>
  )
}

export default Logo
