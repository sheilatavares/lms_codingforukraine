// CSS
import styles from './Post.module.css';

// hooks

import { useLocation, useParams } from 'react-router-dom';
import { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useFetchLessons } from '../../hooks/useFetchLessons';
import Pagination from '../../components/Pagination';
import PostDetail from '../../components/PostDetail';

const Post = () => {
  let { moduleSlug, sectionSlug, slug, order } = useParams();

  // console.log(moduleSlug, sectionSlug, slug);

  const { documents: posts, loading } = useFetchLessons(
    'posts',
    moduleSlug,
    sectionSlug,
  );

  return (
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
              moduleSlug={moduleSlug}
              sectionSlug={sectionSlug}
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
