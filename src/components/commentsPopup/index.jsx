import React from 'react';
import S from './comments.module.scss';
import { useLazyGetCommentsPostQuery } from '../../Redux/querySlice';

const CommentsPopup = (id) => {
  const [getComments, data] = useLazyGetCommentsPostQuery(id);

  React.useEffect(() => {
    getComments(id);
  }, [getComments, id]);

  return (
    <div className={S.wrapper}>
      {data.data?.map((comment) => (
        <div
          key={comment.id}
          className={S.wrapper__box}>
          <div className={S.wrapper__text}>
            <h3>{comment.name}</h3>
            <h5>{comment.email}</h5>
            <p>{comment.body}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CommentsPopup;
