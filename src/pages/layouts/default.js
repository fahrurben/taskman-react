import React from 'react';
import PropTypes from 'prop-types';
import { useHistory, useLocation } from 'react-router-dom';
import { AUTH_TOKEN_KEY } from '../../constant';

export default function DefaultLayout({ children }) {
  const history = useHistory();
  const location = useLocation();

  const logoutClicked = () => {
    localStorage.removeItem(AUTH_TOKEN_KEY);
    history.push('/');
  };

  return (
    <div className="flex flex-row flex-nowrap">
      <nav className="flex-initial bg-gray-600 min-h-screen w-16">
        <ul>
          <li className="flex flex-col justify-center w-full h-16">
            <a href="#" className="lni lni-bold w-full text-center text-3xl text-gray-400 hover:text-white"></a>
          </li>
          <li className="flex flex-col justify-center w-full h-16">
            <a href="#"
               className="lni lni-layers w-full h-16 text-center text-3xl text-gray-400 hover:text-white"></a>
          </li>
        </ul>
      </nav>

      <mainwrapper className="flex-auto bg-gray-200">
        <header className="h-14 shadow  bg-white">
          <div className="float-right flex flex-row items-center h-full border-l border-gray-300 p-4">
            <i className="lni lni-user inline-block h-6 w-6 rounded-full ring-2 ring-white"></i>
            <a href="#" className="display-block">John Doe <i className="lni lni-chevron-down"></i></a>
          </div>
        </header>

        <main className="px-14 py-8">
          {children}
        </main>
      </mainwrapper>
    </div>
  );
}
DefaultLayout.propTypes = {
  children: PropTypes.element.isRequired,
};
