// import React from 'react';
// import './App.css';
import S from './app.module.scss';

import Root from './pages/root';
import Cap from './components/Cap';
import { useGetUsersQuery } from './Redux/querySlice';
import { useDispatch } from 'react-redux';
import { setUsers, setUsersLoading } from './Redux/dataSlice';

function App() {
  const dispatch = useDispatch();
  const { data, isLoading, isSuccess } = useGetUsersQuery();

  if (isLoading) {
    setTimeout(() => {
      dispatch(setUsersLoading(isLoading));
    }, 10);
  }
  if (isSuccess) {
    setTimeout(() => {
      dispatch(setUsersLoading(isLoading));
      dispatch(setUsers(data));
    }, 10);
  }

  return (
    <>
      <div>
        <Cap />
      </div>
      <div className={S.wrapper}>
        <Root />
      </div>
    </>
  );
}

export default App;
