import { Link } from 'react-router-dom';

import P from 'prop-types';
import MDEditor from '@uiw/react-md-editor';

// import styles from './PostDetail.module.css';
// import { useFetchDocuments } from '../hooks/useFetchDocuments';

const PostDetail = ({ data, slug }) => {
  const {
    id,
    title,
    sectionSlug,
    moduleSlug,
    body,
    bodyColumn,
    ordination,
    column,
  } = data;
  // const { documents: modules } = useFetchDocuments('modules');
  // const { documents: sections } = useFetchDocuments('sections');

  let columnLeft;
  let columnRight;
  if (column === 'one_column') {
    columnLeft = 'col-sm-12';
  } else if (column === 'two_columns_left') {
    columnLeft = 'col-sm-7 col-12';
    columnRight = 'col-sm-5';
  } else {
    columnLeft = 'col-sm-5';
    columnRight = 'col-sm-7';
  }
  return (
    <div className="container-full w-100 col-lg-11 col-12 pt-0 pb-4">
      <div className="row mt-3 mb-2">
        <h2>
          Lesson {ordination}: {title} {slug}
        </h2>
      </div>
      <div className="row">
        <div className={columnLeft}>
          <MDEditor.Markdown source={body} />
          {/* style={{ whiteSpace: 'pre-wrap' }} */}
        </div>
        {column != 'one_column' && (
          <>
            <div className={columnRight}>
              <MDEditor.Markdown source={bodyColumn} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

PostDetail.propTypes = {
  data: P.shape({
    title: P.string,

    id: P.string,
    sectionSlug: P.string,
    moduleSlug: P.string,
    body: P.string,
    bodyColumn: P.string,
    ordination: P.string,
    column: P.string,
  }),
  slug: P.string,
  idLesson: P.string,
};

export default PostDetail;
