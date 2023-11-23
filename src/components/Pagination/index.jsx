import React from 'react';
import S from './pagination.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { setPage } from '../../Redux/dataSlice';

const Pagination = () => {
  const dispatch = useDispatch();
  const loader = useSelector((state) => state.dataPost.isLoading);

  const [active, setActive] = React.useState(1);
  const [pageLocal, setPageLocal] = React.useState(1);

  const onClickNumber = (e) => {
    setActive(e.target.value);
    setPageLocal(e.target.value);
  };

  React.useEffect(() => {
    dispatch(setPage(pageLocal));

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, [dispatch, pageLocal]);

  return (
    <>
      {!loader && (
        <div className={S.pagination}>
          <ul>
            {[...Array(10)].map((_, i) => (
              <li
                key={i}
                className={active === i + 1 ? S.active : ''}
                onClick={(e) => onClickNumber(e)}
                value={i + 1}>
                {i + 1}
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default Pagination;
