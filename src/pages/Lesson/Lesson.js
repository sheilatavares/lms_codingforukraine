// CSS
import styles from './Post.module.css';

// hooks

import { useLocation, useParams } from 'react-router-dom';
import { useCallback, useEffect, useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useFetchLessons } from '../../hooks/useFetchLessons';
import Pagination from '../../components/Pagination';
import PostDetail from '../../components/PostDetail';
import { useInsertDocument } from '../../hooks/useInsertDocument';

import { useAuthValue } from '../../context/AuthContext';

const Post = () => {
  let { moduleSlug, sectionSlug, slug, order } = useParams();
  const { user } = useAuthValue();
  const [feedback, setFeedback] = useState('');
  const [comments, setComments] = useState('');
  const [responseForm, setResponseForm] = useState(false);
  const { insertDocument, response } = useInsertDocument('feedbacks');

  const { documents: posts, loading } = useFetchLessons(
    'posts',
    moduleSlug,
    sectionSlug,
  );

  const handleSendFeedback = async (e) => {
    e.preventDefault();

    try {
      const response = await insertDocument({
        userId: user.uid,
        sectionSlug,
        moduleSlug,
        slug,
        feedback,
        comments,
      });
      setResponseForm('Your feedback has been sent. Thank you!');
    } catch (error) {
      console.error(error);
      setResponseForm(
        'An error occurred while submitting your feedback. Please try again later.',
      );
    }
  };

  const resetForm = useCallback(() => {
    setResponseForm(false);
  }, []);

  useEffect(() => {
    return () => {
      resetForm();
    };
  }, [resetForm]);

  return (
    <>
      <div className="d-flex flex-column justify-content-center py-4">
        <div className=" justify-content-end d-flex pe-lg-5 pe-2">
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdropForm"
          >
            <span>Feedback</span>
          </button>
        </div>
        {loading && (
          <div className="d-flex justify-content-center pt-5">
            <div className="spinner-border text-light" role="status">
              <span className="visually-hidden"></span>
            </div>
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

        <div
          className="modal fade"
          id="staticBackdropForm"
          data-bs-backdrop="static"
          data-bs-keyboard="false"
          tabIndex="-1"
          aria-labelledby="staticBackdropLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header border-bottom-0">
                <div>
                  <h5 className="modal-title" id="staticBackdropLabel">
                    Give us your feedback!
                  </h5>
                  <small>
                    Help us improve our course by sending us your feedback
                  </small>
                </div>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={() => setResponseForm(false)}
                ></button>
              </div>
              <div className="modal-body">
                {!responseForm && (
                  <form
                    className="me-0 ms-0"
                    style={{ maxWidth: '100%' }}
                    onSubmit={handleSendFeedback}
                  >
                    <div className="container">
                      <div className="row g-0">
                        <div className="col">
                          <label className="pe-3">
                            The feedback is about this page content?
                          </label>
                          <select
                            required
                            onChange={(e) => setFeedback(e.target.value)}
                          >
                            <option value="">Choose...</option>
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div className="row my-4 g-0">
                          <div className="col">
                            <textarea
                              className="form-control"
                              style={{ height: '100px' }}
                              placeholder="Leave your comments here"
                              onChange={(e) => setComments(e.target.value)}
                              required
                            ></textarea>
                          </div>
                        </div>
                      </div>
                      <div className="d-flex justify-content-end">
                        <button className="btn btn-primary">Send</button>
                      </div>
                    </div>
                  </form>
                )}
                {responseForm && <h5>{responseForm}</h5>}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
