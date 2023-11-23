import React from 'react';
import S from './root.module.scss';

import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { MdOutlineCheckBox } from 'react-icons/md';
import { TfiCommentsSmiley } from 'react-icons/tfi';
import { MdOutlineCheckBoxOutlineBlank } from 'react-icons/md';
import { CiEdit } from 'react-icons/ci';
import { MdDeleteOutline } from 'react-icons/md';
import { GrFavorite } from 'react-icons/gr';
import { useSelector } from 'react-redux';
import Pagination from '../../components/Pagination';

const Root = () => {
  const [highPosts, setHighPosts] = React.useState([]);

  const data = useSelector((state) => state.dataPost.posts);
  const loader = useSelector((state) => state.dataPost.isLoading);
  const loaderUser = useSelector((state) => state.dataPost.usersLoading);
  const usersList = useSelector((state) => state.dataPost.users);

  const userData = (id) => {
    for (let i = 0; i < usersList.length; i++) {
      if (id === usersList[i].id) {
        return usersList[i].name;
      }
    }
  };

  const handleCheckBox = (id) => {
    if (highPosts.includes(id)) {
      setHighPosts(highPosts.filter(item => item !== id));
    } else {
      setHighPosts([...highPosts, id]);
    }
  }

  return (
    <div className={S.postBox}>
      {data.map((post) => (
        <div
          key={post.id}
          className={S.box}>
          <div className={S.box__content}>
            <div
              className={S.box__checkbox}
              onClick={() => handleCheckBox(post.id)}>
              {highPosts.includes(post.id) ? (
                <MdOutlineCheckBox value="checkBoxOn" />
              ) : (
                <MdOutlineCheckBoxOutlineBlank value="checkBoxOff" />
              )}
            </div>

            <h3>{post.title}</h3>
            <h5>
              author: {` `}
              {loaderUser ? (
                <AiOutlineLoading3Quarters className={S.loader_user} />
              ) : (
                userData(post.userId)
              )}
            </h5>
            <p>{post.body}</p>
            <div className={S.box__button}>
              <button className={S.box__button_comments}>
                Комментарии <TfiCommentsSmiley className={S.box__button_svg} />
              </button>
              <button className={S.box__button_edit}>
                Редактировать <CiEdit className={S.box__button_svg} />
              </button>
              <button className={S.box__button_delete}>
                Удалить <MdDeleteOutline className={S.box__button_svg} />
              </button>
              <button className={S.box__button_favorites}>
                В избранное <GrFavorite className={S.box__button_svg} />
              </button>
            </div>
          </div>
        </div>
      ))}
      {loader && <span className={S.loader}></span>}
      <Pagination />
    </div>
  );
};

export default Root;
