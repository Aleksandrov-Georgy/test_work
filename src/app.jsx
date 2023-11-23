// import React from 'react';
import { Route, Routes } from 'react-router-dom';
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
    dispatch(setUsersLoading(isLoading));
  }
  if (isSuccess) {
    dispatch(setUsersLoading(isLoading));
    dispatch(setUsers(data));
  }

  return (
    <>
      <div>
        <Cap />
      </div>
      <div className={S.wrapper}>
        <Routes>
          <Route
            path="/"
            element={<Root />}
          />
        </Routes>
      </div>
    </>
  );
}

export default App;
