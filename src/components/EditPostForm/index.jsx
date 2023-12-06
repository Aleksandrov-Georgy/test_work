import React from 'react';
import S from './editPost.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useEditPostMutation } from '../../Redux/querySlice';
import { updatePost } from '../../Redux/dataSlice';

const EditPost = (params) => {
  const { setShowEditForm, idEditPost, userEditPost } = params;
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.dataPost.posts);
  const users = useSelector((state) => state.dataPost.users);

  const editorPost = posts[idEditPost - 1];
  const [editorAuthor, setEditorAuthor] = React.useState('');

  const [newTitle, setNewTitles] = React.useState(editorPost.title);
  const [newBody, setNewBody] = React.useState(editorPost.body);

  React.useEffect(() => {
    const foundUser = users.find((user) => user.id === userEditPost);
    if (foundUser) {
      setEditorAuthor(foundUser.name);
    }
  }, [userEditPost, users]);

  const [fetchEdit, { data, isLoading, isSuccess }] = useEditPostMutation();

  if (isSuccess) {
    setTimeout(() => {
      dispatch(updatePost(data));
      setShowEditForm(false);
    }, 10);
  }

  const handleEditPost = () => {
    fetchEdit({
      title: newTitle,
      body: newBody,
      idEditPost,
    });
  };

  return (
    <div className={S.editPost__wrapper}>
      <div className={S.editPost__modal}>
        {isLoading ? (
          <span className={S.loader}></span>
        ) : (
          <>
            {' '}
            <h3>Редактирование поста</h3>
            <IoCloseSharp
              className={S.editPost__modal_svg}
              onClick={() => setShowEditForm(false)}
            />
            <div className={S.editPost__modal__input_box}>
              <h5>Автор</h5>
              <input
                disabled
                className={S.editPost__modal_title}
                type="text"
                value={editorAuthor}
              />
            </div>
            <div className={S.editPost__modal__input_box}>
              <h5>Заголовок</h5>
              <input
                className={S.editPost__modal_title}
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitles(e.target.value)}
              />
            </div>
            <div className={S.editPost__modal__input_box}>
              <h5>Пост</h5>
              <textarea
                className={S.editPost__modal_textarea}
                type="textarea"
                value={newBody}
                onChange={(e) => setNewBody(e.target.value)}
              />
            </div>
            <button
              className={S.editPost__modal_btn}
              onClick={() => handleEditPost()}>
              Сохранить
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default EditPost;
