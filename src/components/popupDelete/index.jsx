// import React from 'react';
import S from './popup.module.scss';

import { useGetDeletePostMutation } from '../../Redux/querySlice';

const PopupDelete = (params) => {
  const { setShowDeletePopup, deletePostId, setDeletePostList, deletePostList } = params;

  const [deletePost] = useGetDeletePostMutation();

  const handleDeletePost = (deletePostId) => {
    setShowDeletePopup(false);
    setDeletePostList([...deletePostList, deletePostId]);

    deletePost(deletePostId).unwrap();
  };

  return (
    <div className={S.wrapper}>
      <div className={S.modal}>
        <h3>Вы действительно ходите удалить пост?</h3>
        <div className={S.modal__button}>
          <button
            className={S.modal__success}
            onClick={() => handleDeletePost(deletePostId)}>
            Да, удалить
          </button>
          <button
            className={S.modal__cancel}
            onClick={() => setShowDeletePopup(false)}>
            Отмена
          </button>
        </div>
      </div>
    </div>
  );
};

export default PopupDelete;
