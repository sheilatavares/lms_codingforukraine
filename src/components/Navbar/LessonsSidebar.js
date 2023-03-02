// hooks
import { useFetchDocuments } from '../../hooks/useFetchDocuments';
import { useNavigate, Link } from 'react-router-dom';
import logoSmall from './cfu_logo_small.svg';
import { NavLink } from 'react-router-dom';
import P from 'prop-types';
import { LogoCfu } from './cfu-logo';

// react
import { useState } from 'react';

// components
import PostDetail from '../../components/PostDetail';

const LessonsSidebar = ({ moduleSlug, sectionSlug }) => {
  const { documents: lessons, loading } = useFetchDocuments('posts');
  const { documents: modules } = useFetchDocuments('modules');
  const { documents: sections } = useFetchDocuments('sections');

  const [clicked, setClicked] = useState(undefined);

  const handleClick = () => {
    clicked ? setClicked('') : setClicked('active');
  };
  return (
    <div>
      <nav className="navbar navbar-light bg-blue-dark nav_lesson">
        <div className="container px-5">
          <NavLink to="/" className="navbar-brand">
            <LogoCfu></LogoCfu>
          </NavLink>
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a
                className="btn btn-primary"
                data-bs-toggle="modal"
                data-bs-target="#staticBackdrop"
              >
                Course Menu
              </a>
            </li>
          </ul>
        </div>
      </nav>
      <div
        className="modal fade"
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Introduction to programming with Javascript
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-1">
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
                                        <div className="section_list ps-5 current icon-lesson">
                                          {ord.section}
                                        </div>
                                      ) : (
                                        <div
                                          className="section_list ps-4 
                                "
                                        >
                                          {ord.section}
                                        </div>
                                      )}
                                    </div>

                                    <div className="d-flex flex-column px-0">
                                      {lessons &&
                                        lessons
                                          .filter(
                                            (emp) => emp.sectionId === ord.id,
                                          )
                                          .map((lesson) => (
                                            // <Link
                                            //   reloadDocument
                                            //   to={`/lesson/${lesson.id}`}
                                            //
                                            //
                                            //   key={lesson.id}
                                            //   className="lesson_list col-12"
                                            // >
                                            //   {/* Lesson {lesson.ordination} -{' '} */}
                                            //   - {lesson.title}
                                            // </Link>
                                            <Link
                                              reloadDocument
                                              key={lesson.id}
                                              to={`/lesson/${lesson.moduleSlug}/${lesson.sectionSlug}/${lesson.slug}/${lesson.ordination}`}
                                              className="lesson_list ps-5 py-2 col-12"
                                            >
                                              {lesson.ordination} -{' '}
                                              {lesson.title}
                                            </Link>
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
            </div>
            {/* <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};
LessonsSidebar.propTypes = {
  moduleSlug: P.string,
  sectionSlug: P.string,
};

export default LessonsSidebar;
