// CSS
import styles from './HomeCourse.module.css';

//img
import photoFriends from './img/coding-friends-home.jpg';
import avatar from './img/avatar-user.svg';
import webappcard from './img/web-app-build.png';
import iconInformation from './img/icon-info.png';

// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useNavigate, Link } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchSavedPath } from '../../hooks/useFetchSavedPath';

// react
import { useState } from 'react';

// components
import PostDetail from '../../components/PostDetail';
import ProgressBarCircle from '../../components/ProgressBar/ProgressBarCircle';

const HomeCourse = () => {
  const { documents: lessons, loading } = useFetchDocuments('posts');
  const { documents: modules } = useFetchDocuments('modules');
  const { documents: sections } = useFetchDocuments('sections');
  const { user } = useAuthValue();
  let userId = user.uid;
  const { documents: usersPath } = useFetchSavedPath('usersPath', userId);
  // const { documents: quizResults } = useFetchSavedPath('quizResult', userId);

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

  return (
    <div className="container-full homeCourse" id="home-course">
      <div className="container text-center pb-5">
        <div className="row d-flex flex-column flex-lg-row flex-column-reverse pt-lg-2">
          <div className="col-lg-6">
            <h2 className="mb-lg-5 mb-2 text-start py-4">
              Course: Introducting Programming with Javascript
            </h2>
          </div>
          <div className="col-lg-6 pt-4 pt-sm-2 d-flex flex-column align-items-md-end align-items-center justify-content-center">
            <div className="row g-0 justify-content-lg-end justify-content-center">
              <div className="col-lg-5 col-5 pe-lg-4 d-flex justify-content-center align-items-center flex-column me-3 me-lg-0">
                <ProgressBarCircle strokeWidth="6"></ProgressBarCircle>
                <div className="d-flex flex-column">
                  <span style={{ color: '#005BBB' }}>
                    <strong>Course progress*</strong>
                  </span>
                  <small className="fs-7 lh-1">
                    *Based on the sections you marked as completed at the end of
                    each section.
                  </small>
                </div>
              </div>
              <div className="col-lg-6 col-5 d-flex align-items-center flex-column justify-content-center">
                <span className="fs-3 lh-1 mb-0 pb-0 pe-0 me-0">
                  {' '}
                  Hello, {user.displayName}
                </span>

                <span className="mt-2">Have a good study day!</span>

                <Link
                  className={`btn rounded-pill d-flex align-items-center justify-content-center mt-2 py-1 ${styles.link_account}`}
                  to={`/account`}
                >
                  <img></img>
                  <small className="ms-2">
                    <strong>Profile & Account</strong>
                  </small>
                </Link>
              </div>
            </div>
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
          <div className="d-flex flex-column-reverse flex-lg-row g-0">
            <div className="col-lg-3">
              <div className="row g-0">
                {/* <div className="col-5 col-lg-12">
                  <img src={photoFriends} className="w-100"></img>
                </div>
                <div className="col-7 col-lg-12">
                  <p className="fs-lg-5 fs-lg-6 pt-lg-4 pt-0 ps-3">
                    We have carefully prepared a trail that will guide you step
                    by step through this programming journey. Try to follow the
                    sequence and do all the exercises because practice is
                    essential!
                  </p>
                </div> */}
                <h4 className="text-blue text-start">Coming soon:</h4>
                <a
                  className={`${styles.card_courses} p-3`}
                  style={{ cursor: 'not-allowed' }}
                >
                  <div className="d-flex">
                    <strong className="col-6">
                      <p className="text-blue fs-5 lh-1">
                        Intermediate JavaScript
                      </p>
                    </strong>
                    <div className="col-6 p-0 m-0 d-flex align-items-start justify-content-end">
                      <img src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-js-intermediateStroke.svg?alt=media&token=fd7f9fc5-efcc-432a-8308-4a9d6deb3c33"></img>
                    </div>
                  </div>

                  <figcaption>
                    <h4 className="text-uppercase">Coming soon</h4>
                  </figcaption>
                  <p className={`${styles.textGray} lh-sm mt-5 pb-2 ps-1`}>
                    Take your JavaScript to the next level by learning more
                    complex web apps using concepts such as classes, promises,
                    async/await, and requests.
                  </p>
                  <div className="ps-2 mt-2 d-flex align-items-baseline">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-js-level.svg?alt=media&token=f8aa03d9-6a26-402f-9e2b-c9017ecc30bb"
                      className={styles.iconLevel}
                    ></img>
                    <small className="text-blue ms-2">Intermediate</small>
                  </div>
                </a>
                <a
                  className={`${styles.card_courses} p-3 mt-3`}
                  style={{ cursor: 'not-allowed' }}
                >
                  <div className="d-flex">
                    <strong className="col-7">
                      <p className="text-blue fs-5 lh-1">
                        Interactive Websites with JS, HTML and CSS
                      </p>
                    </strong>
                    <div className="col-5 p-0 m-0 d-flex align-items-start justify-content-end">
                      <img src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-js-interactve.svg?alt=media&token=55d9c493-f3e6-4c6a-ba34-ac494a701cfd"></img>
                    </div>
                  </div>

                  <figcaption style={{ top: '110px' }}>
                    <h4 className="text-uppercase">Coming soon</h4>
                  </figcaption>
                  <p
                    className={`${styles.textGray} lh-sm mt-4 pt-lg-3 pt-5 pb-2 ps-2 mb-0`}
                  >
                    Join this course and embark on a journey where you will
                    learn to develop blending HTML, CSS, and JavaScript to craft
                    captivating and interactive websites.
                  </p>
                  <div className="ps-2 mt-2 d-flex align-items-baseline">
                    <img
                      src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-js-level.svg?alt=media&token=f8aa03d9-6a26-402f-9e2b-c9017ecc30bb"
                      className={styles.iconLevel}
                    ></img>
                    <small className="text-blue ms-2">Intermediate</small>
                  </div>
                </a>
              </div>
            </div>
            <div className="col-lg-9 ps-lg-4 ps-0">
              <div className="accordion" id="accordionModules">
                {modules &&
                  modules.map((module) => (
                    <div
                      className="accordion-item my-3 shadow-sm"
                      key={module.id}
                    >
                      <h2 className="accordion-header">
                        <button
                          className={`accordion-button accordion-module py-4 ps-4 fs-5 collapsed ${
                            module.module === 'Exercise solutions'
                              ? `${styles.accBlue} text-white`
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
                                          src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/check-mark.svg?alt=media&token=57abee3e-e749-4390-947b-d5460dbd7b4c"
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
                                      <div className="d-flex flex-column pe-lg-5">
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
                                                      backgroundColor:
                                                        lesson.title?.includes(
                                                          'cise',
                                                        )
                                                          ? '#f2e597'
                                                          : null,
                                                      borderColor: '#0055bb',
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
                                                      src="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/check-mark.svg?alt=media&token=57abee3e-e749-4390-947b-d5460dbd7b4c"
                                                      width="40"
                                                    />
                                                  </div>
                                                ) : (
                                                  <div
                                                    className={
                                                      styles.icon_container
                                                    }
                                                    style={{
                                                      backgroundColor:
                                                        lesson.title?.includes(
                                                          'cise',
                                                        )
                                                          ? '#f2e597'
                                                          : null,
                                                    }}
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
