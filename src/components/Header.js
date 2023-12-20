import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import { signOut } from 'firebase/auth';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { addUser, removeUser } from '../utils/store/userSlice';

import logo from '../../public/assets/logo.png';

const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClickSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName } = user;

        dispatch(addUser({ uid: uid, email: email, displayName: displayName }));
        navigate('/browse');
      } else {
        dispatch(removeUser());
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <nav className='px-12 py-2 absolute w-screen z-10 flex items-center justify-between bg-black text-slate-50 bg-transparent'>
      <img className='px-8 py-2 w-56' src={logo} alt='Netflix' />
      <ul className='mr-2 flex justify-between'>
        <li className='mr-2 px-4 py-2 hover:bg-slate-50 hover:text-black'>
          <Link to='/'> Home </Link>
        </li>
        {!user && (
          <li className='mr-2 px-4 py-2 hover:bg-slate-50 hover:text-black'>
            <Link to='/login'> Log In </Link>
          </li>
        )}
        {user && (
          <button
            className='bg-red-600 p-2 rounded-lg hover:bg-red-500'
            onClick={onClickSignOut}
            type='button'
          >
            Sign Out
          </button>
        )}
      </ul>
    </nav>
  );
};

export default Header;
