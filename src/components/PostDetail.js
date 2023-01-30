import { Link } from 'react-router-dom';

import P from 'prop-types';
import MDEditor from '@uiw/react-md-editor';

// import styles from './PostDetail.module.css';
// import { useFetchDocuments } from '../hooks/useFetchDocuments';

const PostDetail = ({ data }) => {
  const {
    id,
    title,
    sectionId,
    moduleId,
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
    columnLeft = 'col-12';
  } else if (column === 'two_columns_left') {
    columnLeft = 'col-7';
    columnRight = 'col-5';
  } else {
    columnLeft = 'col-5';
    columnRight = 'col-7';
  }
  return (
    <div className="container-full w-100 col-lg-11 col-12 pt-4 pb-4">
      <div className="row mt-3 mb-2">
        <h2>
          Lesson {ordination}: {title}
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
      {/* <div className="d-flex">
        {modules &&
          modules
            .filter((emp) => emp.id === moduleId)
            .map((md) => (
              <small key={md.id} className="pr-5">
                Module: {md.module}
              </small>
            ))}
        {sections &&
          sections
            .filter((emp) => emp.id === sectionId)
            .map((sec) => (
              <small key={sec.id} className="pl-2">
                Section: {sec.section}
              </small>
            ))}
      </div> */}
    </div>
  );
};

PostDetail.propTypes = {
  data: P.shape({
    title: P.string,
    id: P.string,
    sectionId: P.string,
    moduleId: P.string,
    body: P.string,
    bodyColumn: P.string,
    ordination: P.string,
    column: P.string,
  }),
  idLesson: P.string,
};

export default PostDetail;
