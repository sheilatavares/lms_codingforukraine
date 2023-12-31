import styles from './EditPost.module.css';
import MarkdownEditor from '@uiw/react-markdown-editor';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useFetchDocument } from '../../hooks/useFetchDocument';
import { useUpdateDocument } from '../../hooks/useUpdateDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const EditPost = () => {
  const { id } = useParams();
  const { document: post } = useFetchDocument('posts', id);

  console.log(post);

  const [course, setCourse] = useState('introducing_programming');
  const { documents: sections, loading } = useFetchDocuments('sections');
  const { documents: modules } = useFetchDocuments('modules');
  const [sectionId, setSectionId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [ordination, setOrdination] = useState('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [quiz, setQuiz] = useState('');
  const [image, setImage] = useState('');
  const [body, setBody] = useState('');
  const [bodyColumn, setBodyColumn2] = useState('');

  const [value, setValue] = useState('');
  const [column, setColumn] = useState('');
  const [formError, setFormError] = useState('');

  //To fill Modules and Sections

  const mergedSections = (r, { module, moduleId, course, ...rest }) => {
    return r.reduce((r, { module, moduleId, course, ...rest }) => {
      const key = `${module}-${moduleId}-${course}`;
      r[key] = r[key] || { module, moduleId, course, section: [] };
      r[key]['section'].push(rest);
      return r;
    }, {});
  };

  const resultModules = (select, moduleId) => {
    let sectionsMerged = mergedSections(sections, {
      module,
      moduleId,
      course,
    });
    const sectionsValues = Object.values(sectionsMerged);

    let result;
    if (select === 'module') {
      return sectionsValues.map((module, index) => (
        <option key={module.moduleId} value={module.moduleId}>
          {module.module}
        </option>
      ));
    } else {
      // console.log('resultado:', result, ' valor:', value);

      return sections
        .filter((emp) => emp.moduleId === value)

        .map((ord) => (
          <option key={ord.id} value={ord.id}>
            Section {ord.ordination} - {ord.section}
          </option>
        ));
    }
  };

  function onChangeModule(event) {
    setModuleId(event.target.value);
    setValue(event.target.value);
  }

  // fill form data
  useEffect(() => {
    if (post) {
      setModuleId(post.moduleId);
      setQuiz(post.quiz);
      setSectionId(post.sectionId);
      setOrdination(post.ordination);
      setImage(post.image);
      setSlug(post.slug);
      setColumn(post.column);
      setTitle(post.title);
      setBodyColumn2(post.bodyColumn);
      setBody(post.body);
    }
  }, [post]);

  const { user } = useAuthValue();

  const navigate = useNavigate();

  const { updateDocument, response } = useUpdateDocument('posts');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError('');

    const data = {
      title,
      slug,
      quiz,
      image,
      moduleId,
      sectionId,
      ordination: Number(ordination),
      column,
      body,
      bodyColumn,
    };

    // console.log(post);

    updateDocument(id, data);

    // redirect to Dashboard
    navigate(`/dashboard/${post.moduleSlug}/${post.sectionSlug}/${post.slug}`);
  };

  return (
    <div className="container bg-white pt-4">
      {post && (
        <>
          <h2 style={{ color: 'black' }}>Editing Lesson: </h2>{' '}
          <h2> {post.title}</h2>
          <form onSubmit={handleSubmit}>
            <div className="row mt-5">
              <label className="col-6">
                Current Module:
                {modules &&
                  modules
                    .filter((emp) => emp.id === post.moduleId)

                    .map((ord) => <span key={ord.id}>{ord.module}</span>)}
                <select
                  className="form-select"
                  onChange={(e) => onChangeModule(e)}
                  defaultValue={'DEFAULT'}
                >
                  <option value="DEFAULT" disabled>
                    Choose a Module ...
                  </option>
                  {loading && <option>Loading...</option>}
                  {sections && resultModules('module', '')}
                </select>
              </label>
              <label className="col-6">
                Current Section:{' '}
                {sections &&
                  sections
                    .filter((emp) => emp.id === post.sectionId)

                    .map((ord) => <span key={ord.id}>{ord.section}</span>)}
                <select
                  className="form-select"
                  onChange={(e) => setSectionId(e.target.value)}
                  defaultValue={'DEFAULT'}
                >
                  <option value="DEFAULT" disabled>
                    Choose a Section ...
                  </option>
                  {loading && <option>Loading...</option>}
                  {sections && resultModules('', value)}
                </select>
              </label>
            </div>
            <div className="row g-0">
              <label className="col-2 me-3" htmlFor="lesson">
                <span>Current number: {post.ordination}</span>
                <input
                  type="number"
                  className="w-100 "
                  name="Lesson"
                  required
                  placeholder="Lesson"
                  onChange={(e) => setOrdination(e.target.value)}
                  value={ordination}
                />
              </label>
              <label className="col-4">
                <span>
                  Current Icon: <img src={post.image} width="20px"></img>
                </span>
                <select
                  className="form-select m-1 p-2 w-100"
                  onChange={(e) => setImage(e.target.value)}
                >
                  <option selected>Choose...</option>
                  <option value="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-lesson.svg?alt=media&token=fc140020-c264-476f-a408-d16e9cadb7ed">
                    Lesson icon
                  </option>
                  <option value="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-exercise-gray.svg?alt=media&token=264d792c-7c83-46a9-ae28-ef89eede289e">
                    Exercise icon
                  </option>
                  <option value="https://firebasestorage.googleapis.com/v0/b/coding-for-ukraine.appspot.com/o/icon-quiz-gray.svg?alt=media&token=fb69bb8b-703e-4351-bb37-5de421d941d1">
                    Quiz icon
                  </option>
                </select>
              </label>
              <label className="col-3">
                <span>Is a quiz lesson?</span>
                Current: <span>{post.quiz ? 'yes' : 'no'}</span>
                <select
                  className="form-select m-1 p-2 w-100"
                  onChange={(e) => setQuiz(JSON.parse(e.target.value))}
                >
                  <option selected>Choose...</option>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </label>
              <label className="col-3">
                <span>Slug:</span>
                <input
                  type="text"
                  name="slug"
                  className="m-1 p-2 w-100"
                  required
                  placeholder="slug"
                  onChange={(e) => setSlug(e.target.value)}
                  value={slug}
                />
              </label>
            </div>
            <div className="row">
              <label className="col-6">
                <span>Title:</span>
                <input
                  type="text"
                  name="title"
                  className="ml-3 p-2 w-100"
                  required
                  placeholder="Lesson title"
                  onChange={(e) => setTitle(e.target.value)}
                  value={title}
                />
              </label>
              <label className="col-4">
                <span>Current Display columns: {post.column}</span>
                <select
                  className="form-select m-1 p-2 w-100"
                  onChange={(e) => setColumn(e.target.value)}
                >
                  <option selected>Choose...</option>
                  <option value="one_column">One column</option>
                  <option value="two_columns_left">
                    Two columns - Large left column
                  </option>
                  <option value="two_columns_right">
                    Two columns - Large right column
                  </option>
                  <option value="column_exercise">Live code exercise</option>
                  <option value="two_columns_same">
                    Two columns - same width
                  </option>
                </select>
              </label>
            </div>
            <div className="row mt-4">
              <label className="col-12 text-wrap">
                {column != 'one_column' && (
                  <>
                    <span>Content first column:</span>
                    <MarkdownEditor
                      value={body}
                      onChange={(value, viewUpdate) => setBody(value)}
                      style={{ height: '400px', whiteSpace: 'pre-wrap' }}
                    />
                    <span>Content second column:</span>
                    <MarkdownEditor
                      value={bodyColumn}
                      onChange={(value, viewUpdate) => setBodyColumn2(value)}
                      style={{ height: '400px', whiteSpace: 'pre-wrap' }}
                    />
                  </>
                )}
                {column === 'one_column' && (
                  <>
                    <span>Content:</span>
                    <MarkdownEditor
                      value={body}
                      onChange={(value, viewUpdate) => setBody(value)}
                      style={{ height: '400px' }}
                    />
                  </>
                )}
              </label>
            </div>
            {!response.loading && (
              <button className="btn btn-primary w-50 mb-5">
                Submit edition
              </button>
            )}
            {response.loading && (
              <button className="btn" disabled>
                Aguarde.. .
              </button>
            )}
            {(response.error || formError) && (
              <p className="error">{response.error || formError}</p>
            )}
          </form>
        </>
      )}
    </div>
  );
};

export default EditPost;
