// CSS
import styles from './HomeCourse.module.css';

//img
import photoFriends from './img/coding-friends-home.jpg';

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
    <div className="container-full" id="home-course">
      <div className="container text-center pb-5">
        <h2 className="mb-4 text-primary text-start py-5">
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
          <div className="row g-0">
            <div className="col-lg-3">
              <img src={photoFriends} className="w-100"></img>
              <p className="fs-5 pt-4">
                We have carefully prepared a trail that will guide you step by
                step through this programming journey. Try to follow the
                sequence and do all the exercises because practice is essential!
              </p>
            </div>
            <div className="col-lg-9 ps-4">
              <div className="accordion" id="accordionModules">
                {modules &&
                  modules.map((module) => (
                    <div
                      className="accordion-item my-3 shadow-sm"
                      key={module.id}
                    >
                      <h2 className="accordion-header">
                        <button
                          className="accordion-button accordion-module py-4 ps-4 fs-5"
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
                        // data-bs-parent="#accordionModules"
                      >
                        <div className="">
                          <div className="">
                            {sections &&
                              sections
                                .filter((emp) => emp.moduleId === module.id)

                                .map((ord) => (
                                  <div className="ps-5 pt-3" key={ord.id}>
                                    <h6 className="">
                                      <p className="">
                                        <strong>
                                          Section {ord.ordination} -{' '}
                                          {ord.section}
                                        </strong>
                                      </p>
                                    </h6>
                                    <div id={`id_${ord.id}`} className="pb-2">
                                      <div className="d-flex flex-column pe-5">
                                        {lessons &&
                                          lessons
                                            .filter(
                                              (emp) => emp.sectionId === ord.id,
                                            )
                                            .map((lesson) => (
                                              <Link
                                                to={`/lesson/${lesson.id}/${lesson.moduleId}/${lesson.sectionId}/${lesson.ordination}`}
                                                state={{
                                                  from: `${lesson.sectionId}`,
                                                  fora: `${lesson.ordination}`,
                                                }}
                                                key={lesson.id}
                                                className="text-start d-inline-flex align-items-center link-lesson py-2 text-decoration-none"
                                              >
                                                {/* Lesson {lesson.ordination} -{' '} */}
                                                <div
                                                  className={
                                                    styles.icon_container
                                                  }
                                                >
                                                  <img
                                                    src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-lesson-w.svg?alt=media&token=f9a60a88-6023-4fba-89f4-d8c2298468aa"
                                                    width="40"
                                                  ></img>
                                                </div>
                                                <span className="ps-2">
                                                  {lesson.title}
                                                </span>
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
        </div>
      </div>
    </div>
  );
};

export default HomeCourse;
