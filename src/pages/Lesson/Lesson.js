// CSS
import styles from './Post.module.css';

// hooks

import { useParams } from 'react-router-dom';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useFetchLessons } from '../../hooks/useFetchLessons';
import Pagination from '../../components/Pagination';
import PostDetail from '../../components/PostDetail';

const Post = () => {
  let { id, moduleId, sectionId, order } = useParams();

  const { documents: posts, loading } = useFetchLessons('posts', sectionId);

  return (
    // <div className={styles.post_container}>
    //   {post && (
    //     <>
    //       <div className={styles.content}>
    //         <h1>{post.title}</h1>

    //         <MDEditor.Markdown
    //           source={post.body}
    //           style={{ whiteSpace: 'pre-wrap' }}
    //         />

    //         {/* <p>{post.body}</p> */}
    //       </div>
    //     </>
    //   )}
    // </div>
    <>
      <div className="d-flex justify-content-center py-4">
        {loading && (
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden"></span>
          </div>
        )}
        {posts && (
          <>
            <Pagination
              data={posts}
              ordLesson={order}
              RenderComponent={PostDetail}
              title="Posts"
              buttonConst={3}
              contentPerPage={1}
              siblingCount={1}
            />
          </>
        )}
      </div>
    </>
  );
};

export default Post;
