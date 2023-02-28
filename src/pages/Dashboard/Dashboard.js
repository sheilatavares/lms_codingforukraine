import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

import { useLocation, useParams } from 'react-router-dom';
// import { useRef } from 'react';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

// react
import { useState, useRef, useCallback } from 'react';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;
  const { moduleSlug, sectionSlug, slug } = useParams();

  //modules and sections
  const { documents: posts, loading } = useFetchDocuments('posts');
  const { documents: modules } = useFetchDocuments('modules');
  const { documents: sections } = useFetchDocuments('sections');
  const { deleteDocument } = useDeleteDocument('posts');

  const deleteLesson = (lessonTitle, lessonId) => {
    let msg = confirm(`Are you sure that you want to delete ${lessonTitle}?`);
    if (msg) deleteDocument(lessonId);
  };

  const scroll = useCallback((node) => {
    if (node !== null) {
      window.scrollTo({
        top: node.getBoundingClientRect().top,
        behavior: 'smooth',
      });
    }
  }, []);

  // console.log(uid);
  // console.log(posts);

  return (
    <div className="container bg-white">
      <h1 className="mb-4">
        Dashboard - Introducting Programming with Javascript
      </h1>
      <div className="post-list">
        <div className="accordion accordion_lesson" id="accordionModules">
          {modules &&
            modules.map((module) => (
              <div className="accordion-item" key={module.id}>
                <h2 className="accordion-header">
                  <button
                    className={
                      moduleSlug === module.slug
                        ? 'accordion-button button_lesson'
                        : 'accordion-button button_lesson collapsed'
                    }
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#id_${module.id}`}
                    aria-expanded="true"
                    aria-controls={module.id}
                  >
                    <h6>
                      <strong>
                        Module {module.ordination} - {module.module}
                      </strong>
                    </h6>
                  </button>
                </h2>
                <div
                  id={`id_${module.id}`}
                  // className="accordion-collapse collapse"
                  className={
                    moduleSlug === module.slug
                      ? 'accordion-collapse collapse show'
                      : 'accordion-collapse collapse'
                  }
                  aria-labelledby="headingOne"
                  // data-bs-parent="#accordionModules"
                >
                  <div className="accordion-body p-0">
                    <div className="container">
                      {sections &&
                        sections
                          .filter((emp) => emp.moduleId === module.id)

                          .map((ord) => (
                            <div key={ord.id} className="row">
                              <div className="px-0 pt-0 pb-2">
                                {sectionSlug === ord.slug ? (
                                  <div className="section_list ps-5 current fs-3">
                                    {ord.section}
                                  </div>
                                ) : (
                                  <div className="section_list ps-4 fs-3">
                                    {ord.section}
                                  </div>
                                )}
                              </div>

                              <div className="d-flex flex-column px-0">
                                {posts &&
                                  posts
                                    .filter((emp) => emp.sectionId === ord.id)
                                    .map((lesson) => (
                                      <div className="row m-2" key={lesson.id}>
                                        {slug === lesson.slug ? (
                                          <div
                                            className="col-5 current d-flex align-items-center flex-wrap"
                                            ref={scroll}
                                          >
                                            👉 <strong> {lesson.title} </strong>
                                          </div>
                                        ) : (
                                          <div className="col-5 ps-4">
                                            {lesson.title}
                                          </div>
                                        )}
                                        <div className="col-1 text-center">
                                          {lesson.ordination}
                                        </div>

                                        <div className="col-6 text-center">
                                          <Link
                                            to={`/lesson/${lesson.moduleSlug}/${lesson.sectionSlug}/${lesson.slug}/${lesson.ordination}`}
                                            state={{
                                              from: `${lesson.sectionId}`,
                                              fora: `${lesson.ordination}`,
                                            }}
                                            className="m-2"
                                          >
                                            View
                                          </Link>
                                          <Link
                                            to={`/posts/edit/${lesson.id}`}
                                            className="m-2"
                                          >
                                            Edit
                                          </Link>
                                          <button
                                            onClick={() =>
                                              deleteLesson(
                                                lesson.title,
                                                lesson.id,
                                              )
                                            }
                                            className="btn btn-danger btn-sm"
                                          >
                                            Delete
                                          </button>
                                        </div>
                                      </div>
                                    ))}
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
        {modules && modules.length === 0 && (
          <div className={styles.modules}>
            <p>No Modules were found.</p>
            <Link to="/modules/create" className="btn">
              Criar primeiro module
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
