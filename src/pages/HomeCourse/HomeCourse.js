// CSS
import styles from './HomeCourse.module.css';

//img
import photoFriends from './img/coding-friends-home.jpg';
import avatar from './img/avatar-user.svg';

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchSavedPath } from '../../hooks/useFetchSavedPath';

// react
import { useState } from 'react';

// components
import PostDetail from '../../components/PostDetail';

const HomeCourse = () => {
  const { documents: lessons, loading } = useFetchDocuments('posts');
  const { documents: modules } = useFetchDocuments('modules');
  const { documents: sections } = useFetchDocuments('sections');
  const { user } = useAuthValue();
  let userId = user.uid;
  const { documents: usersPath } = useFetchSavedPath('usersPath', userId);
  const { documents: quizResults } = useFetchSavedPath('quizResult', userId);

  // Users sections completed
  const sectionIds = usersPath
    ?.filter(
      (obj) => obj && !obj.isQuiz && obj.sectionId !== 'F0bt7WvKdHrIGOpkpNtB',
    )
    ?.map((obj) => obj.sectionId);

  // Users quiz completed
  const quizIdsCompleted = usersPath
    ?.filter(
      (obj) => obj && obj.isQuiz && obj.sectionId !== 'F0bt7WvKdHrIGOpkpNtB',
    )
    ?.map((obj) => obj.sectionId);

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
        <div className="row">
          <div className="col-lg-8">
            <h2 className="mb-5 text-primary text-start py-4">
              Course: Introducting Programming with Javascript
            </h2>
          </div>
          <div className="col-lg-4 d-flex flex-column align-items-end justify-content-center">
            <span className="fs-2 mt-2"> Hello, {user.displayName}</span>
            <small>Have a good study day!</small>
            <Link
              className={`btn btn-outline-primary rounded-pill mt-2 ${styles.link_account}`}
              to={`/account`}
            >
              <img></img>
              <small className="ms-2">
                <strong>Profile & Account</strong>
              </small>
            </Link>
          </div>
        </div>

        {/* <form className={styles.search_form} onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setQuery(e.target.value)} />
        <button className="btn btn-dark">Search</button>
      </form> */}
        <div className="post-list">
          {loading && (
            <div className="container d-flex align-items-center justify-content-end">
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
                          className={`accordion-button accordion-module py-4 ps-4 fs-5 ${
                            module.module === 'Exercise solutions'
                              ? 'bg-primary text-white'
                              : ''
                          }`}
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#id_${module.id}`}
                          aria-expanded="true"
                          aria-controls={module.id}
                        >
                          {module.module === 'Exercise solutions'
                            ? `${module.module}`
                            : `Module ${module.ordination} - ${module.module}`}
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
                                    <h6 className="d-flex flex-row-reverse justify-content-end align-items-start">
                                      {sectionIds?.includes(ord.id) &&
                                      quizIdsCompleted?.includes(ord.id) ? (
                                        <img
                                          style={{
                                            width: '20px',
                                            marginLeft: '-8px',
                                          }}
                                          className=""
                                          src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/check-mark.svg?alt=media&token=10987695-b4ba-4e2c-9330-af76d1df6237"
                                          width="40"
                                        />
                                      ) : null}
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
                                                to={`/lesson/${lesson.moduleSlug}/${lesson.sectionSlug}/${lesson.slug}/${lesson.ordination}`}
                                                state={{
                                                  from: `${lesson.sectionId}`,
                                                  fora: `${lesson.ordination}`,
                                                }}
                                                key={lesson.id}
                                                className="text-start d-inline-flex align-items-center link-lesson py-1 text-decoration-none"
                                              >
                                                {(sectionIds?.includes(
                                                  ord.id,
                                                ) &&
                                                  !lesson.quiz) ||
                                                (lesson.quiz &&
                                                  quizIdsCompleted?.includes(
                                                    ord.id,
                                                  )) ? (
                                                  <div
                                                    className={
                                                      styles.icon_container
                                                    }
                                                    style={{
                                                      borderColor: '#0076BF',
                                                      borderWidth: '2px',
                                                    }}
                                                  >
                                                    <img
                                                      src={lesson.image}
                                                      width="40"
                                                    />
                                                    <img
                                                      style={{
                                                        position: 'absolute',
                                                        right: '-12px',
                                                        top: '-2px',
                                                      }}
                                                      src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/check-mark.svg?alt=media&token=10987695-b4ba-4e2c-9330-af76d1df6237"
                                                      width="40"
                                                    />
                                                  </div>
                                                ) : (
                                                  <div
                                                    className={
                                                      styles.icon_container
                                                    }
                                                  >
                                                    <img
                                                      src={lesson.image}
                                                      width="40"
                                                    />
                                                  </div>
                                                )}

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
