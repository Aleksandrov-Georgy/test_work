import React from 'react';
import S from './cap.module.scss';

import { MdOutlinePostAdd } from 'react-icons/md';
import { useDispatch, useSelector } from 'react-redux';
import { allPosts, loader, setLimitPosts, setPage } from '../../Redux/dataSlice';
import { useLazyGetPostsScrollQuery } from '../../Redux/querySlice';
import AddedPost from '../AddedPost';

const Cap = () => {
  const popupRef = React.useRef();
  const popupRefLimit = React.useRef();
  const availableLimits = [10, 20, 50, 100];

  const [showPopup, setShowPopup] = React.useState(false);
  const [showPopupLimit, setShowPopupLimit] = React.useState(false);

  const [showAddedPost, setShowAddedPost] = React.useState(false);

  const dispatch = useDispatch();
  const page = useSelector((state) => state.dataPost.page);

  const [updatePostLimit, data] = useLazyGetPostsScrollQuery({ page });

  localStorage.getItem('limitPosts') ? '' : localStorage.setItem('limitPosts', 10);
  const limit = localStorage.getItem('limitPosts');
  const [limitPage, setLimitPage] = React.useState(limit);

  if (data.status === 'fulfilled') {
    setTimeout(() => {
      dispatch(allPosts(data.data));
      dispatch(loader(false));
    }, 10);
  }

  if (data.status === 'pending') {
    setTimeout(() => {
      dispatch(loader(true));
    }, 10);
  }

  React.useEffect(() => {
    dispatch(setLimitPosts(limitPage));
    dispatch(setPage(page));

    const local = () => {
      localStorage.setItem('limitPosts', limitPage);
    };
    local();
    updatePostLimit(page);
  }, [dispatch, limitPage, page, updatePostLimit]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(popupRef.current)) {
        setShowPopup(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);
  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.composedPath().includes(popupRefLimit.current)) {
        setShowPopupLimit(false);
      }
    };
    document.body.addEventListener('click', handleClickOutside);

    return () => {
      document.body.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={S.root}>
      {showAddedPost && (
        <AddedPost
          showAddedPost={showAddedPost}
          setShowAddedPost={setShowAddedPost}
        />
      )}
      <div className={S.wrapper}>
        <h1>post list</h1>
        <button
          ref={popupRefLimit}
          onClick={() => setShowPopupLimit(!showPopupLimit)}
          className={S.wrapper__limit}>
          Количество постов на странице {limit}
        </button>
        {showPopupLimit && (
          <div className={S.wrapper__limit_popup}>
            {availableLimits.map((el) => (
              <p
                key={el}
                value={el}
                onClick={() => setLimitPage(el)}>
                {el}
              </p>
            ))}
          </div>
        )}
        <button
          ref={popupRef}
          onClick={() => setShowPopup(!showPopup)}
          className={S.wrapper__filter}>
          Фильтровать по
        </button>
        {showPopup && (
          <div className={S.wrapper__filter_popup}>
            <p>Имени пользователя</p>
            <p>Названию поста</p>
            <p>Избранным</p>
          </div>
        )}
        <button
          className={S.wrapper__added}
          onClick={() => setShowAddedPost(true)}>
          Добавить пост <MdOutlinePostAdd className={S.wrapper__added_svg} />
        </button>
      </div>
    </div>
  );
};

export default Cap;
