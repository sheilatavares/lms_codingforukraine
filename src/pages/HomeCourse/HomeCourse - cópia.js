// CSS
import styles from './HomeCourse.module.css';

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useNavigate, Link } from 'react-router-dom';

// react
import { useState } from 'react';

// components
import PostDetail from '../../components/PostDetail';

const HomeCourse = () => {
  const { documents: lessons, loading } = useFetchDocuments('posts');
  const { documents: modules } = useFetchDocuments('modules');
  const { documents: sections } = useFetchDocuments('sections');

  const navigate = useNavigate();

  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  // console.log(loading);

  return (
    <div className="container text-center">
      <h2 className="mb-4 text-white text-start py-5">
        Course: Introducting Programming with Javascript
      </h2>
      {/* <form className={styles.search_form} onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Search</button>
      </form> */}
      <div className="post-list">
        {loading && (
          <div className="container d-flex align-items-center">
            <p>Loading...</p>
          </div>
        )}

        <div className="accordion" id="accordionModules">
          {modules &&
            modules.map((module) => (
              <div className="accordion-item" key={module.id}>
                <h2 className="accordion-header">
                  <button
                    className="accordion-button accordion-module py-4 ps-4"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target={`#id_${module.id}`}
                    aria-expanded="true"
                    aria-controls={module.id}
                  >
                    Module {module.ordination} - {module.module}
                  </button>
                </h2>
                <div
                  id={`id_${module.id}`}
                  className="accordion-collapse collapse"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionModules"
                >
                  <div className="accordion-body accordion-body-module">
                    <div className="accordion" id="accordionSections">
                      {sections &&
                        sections
                          .filter((emp) => emp.moduleId === module.id)

                          .map((ord) => (
                            <div className="accordion-item" key={ord.id}>
                              <h2 className="accordion-header">
                                <button
                                  className="accordion-button accordion-sections"
                                  type="button"
                                  data-bs-toggle="collapse"
                                  data-bs-target={`#id_${ord.id}`}
                                  aria-expanded="true"
                                  aria-controls={ord.id}
                                >
                                  Section {ord.ordination} - {ord.section}
                                </button>
                              </h2>
                              <div
                                id={`id_${ord.id}`}
                                className="accordion-collapse collapse"
                                aria-labelledby="headingOne"
                                data-bs-parent="#accordionSections"
                              >
                                <div className="accordion-body text-start d-grid">
                                  {lessons &&
                                    lessons
                                      .filter((emp) => emp.sectionId === ord.id)
                                      .map((lesson) => (
                                        <Link
                                          to={`/lesson/${lesson.id}/${lesson.moduleId}/${lesson.sectionId}/${lesson.ordination}`}
                                          state={{
                                            from: `${lesson.sectionId}`,
                                            fora: `${lesson.ordination}`,
                                          }}
                                          key={lesson.id}
                                          className=""
                                        >
                                          {/* Lesson {lesson.ordination} -{' '} */}
                                          {lesson.title}
                                        </Link>
                                      ))}
                                </div>
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
        {/* {modules &&
          modules.map((module) => (
            <Link
              key={module.id}
              to={`/posts/${module.id}`}
              className="btn btn-outline"
            >
              Read
            </Link>
          ))} */}
      </div>
    </div>
  );
};

export default HomeCourse;
