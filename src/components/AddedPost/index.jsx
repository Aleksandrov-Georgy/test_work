import React from 'react';
import S from './addedPost.module.scss';
import { IoCloseSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { useAddNewPostMutation } from '../../Redux/querySlice';
import { addNewPost } from '../../Redux/dataSlice';

const AddedPost = (params) => {
  const { setShowAddedPost } = params;

  const dispatch = useDispatch();
  const usersList = useSelector((state) => state.dataPost.users);

  const [fetchData, { data, isLoading }] = useAddNewPostMutation();

  const [title, setTitle] = React.useState('');
  const [body, setBody] = React.useState('');
  const [userId, setUserId] = React.useState(null);

  if (data) {
    setTimeout(() => {
      dispatch(addNewPost(data));
    }, 10);
  }

  const handleSubmit = () => {
    fetchData({
      title,
      body,
      userId,
    });

  
  };

  return (
    <div className={S.editPost__wrapper}>
      <div className={S.editPost__modal}>
        <h3>Редактирование поста</h3>
        <IoCloseSharp
          className={S.editPost__modal_svg}
          onClick={() => setShowAddedPost(false)}
        />
        {isLoading ? (
          <span className={S.loader}></span>
        ) : (
          <div>
            <div className={S.editPost__modal__input_box}>
              <h5>Автор</h5>
              <select
                className=""
                name="author"
                id="author"
                onChange={(e) => setUserId(e.target.value)}>
                <option value="">Выберите автора</option>

                {usersList.map((el) => (
                  <option
                    key={el.id}
                    value={el.id}>
                    {el.name}
                  </option>
                ))}
              </select>
            </div>
            <div className={S.editPost__modal__input_box}>
              <h5>Заголовок</h5>
              <input
                className={S.editPost__modal_title}
                type="textarea"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div className={S.editPost__modal__input_box}>
              <h5>Пост</h5>
              <textarea
                className={S.editPost__modal_textarea}
                type="textarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
            <button
              onClick={() => handleSubmit()}
              className={S.editPost__modal_btn}>
              Сохранить
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddedPost;
