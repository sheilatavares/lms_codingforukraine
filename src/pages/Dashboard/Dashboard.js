import styles from './Dashboard.module.css';

import { Link } from 'react-router-dom';

import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useDeleteDocument } from '../../hooks/useDeleteDocument';

// react
import { useState } from 'react';

const Dashboard = () => {
  const { user } = useAuthValue();
  const uid = user.uid;

  //modules and sections
  const { documents: posts, loading } = useFetchDocuments('posts');
  const { documents: modules } = useFetchDocuments('modules');
  const { documents: sections } = useFetchDocuments('sections');
  const { deleteDocument } = useDeleteDocument('posts');

  const deleteLesson = (lessonTitle, lessonId) => {
    let msg = confirm(`Are you sure that you want to delete ${lessonTitle}?`);
    if (msg) deleteDocument(lessonId);
  };

  console.log(uid);
  // console.log(posts);

  return (
    <div className="container bg-white">
      <h1 className="mb-4">Introducting Programming with Javascript</h1>
      <div className="post-list">
        <div className="container col-11">
          {modules &&
            modules.map((module) => (
              <div className="row border border-info mt-2 mb-3" key={module.id}>
                <h2 className=" text-black">
                  Module {module.ordination} - {module.module}
                </h2>
                <div>
                  <div className="container">
                    {sections &&
                      sections
                        .filter((emp) => emp.moduleId === module.id)

                        .map((ord) => (
                          <div key={ord.id} className="row">
                            <h4 className="text-start mb-1 text-primary">
                              <strong>
                                Section {ord.ordination} - {ord.section}
                              </strong>
                            </h4>
                            <div className="container">
                              <>
                                <div className="row text-center">
                                  <div className="col-5 bg-secondary text-white">
                                    Title
                                  </div>
                                  <div className="col-1 bg-secondary text-white">
                                    Order
                                  </div>

                                  <div className="col-6 bg-secondary text-white">
                                    Actions
                                  </div>
                                </div>
                              </>

                              {posts &&
                                posts
                                  .filter((emp) => emp.sectionId === ord.id)
                                  .map((lesson) => (
                                    <div className="row m-2" key={lesson.id}>
                                      <div className="col-5">
                                        {lesson.title}
                                      </div>
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
                              {posts && posts.length === 0 && (
                                <div>
                                  <p>No lessons for this Section.</p>
                                  <Link to="/modules/create" className="btn">
                                    Criar primeiro module
                                  </Link>
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
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
