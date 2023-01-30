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
      setSectionId(post.sectionId);
      setOrdination(post.ordination);
      setImage(post.image);
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

    // check values
    // if (
    //   !course ||
    //   !moduleId ||
    //   !sectionId ||
    //   !title ||
    //   !ordination ||
    //   !column ||
    //   !body
    // ) {
    //   setFormError('All fields are mandatory.');
    // }

    console.log({
      title,
      moduleId,
      sectionId,
      ordination,
      column,
      body,
      bodyColumn,
    });

    const data = {
      title,
      image,
      moduleId,
      sectionId,
      ordination,
      column,
      body,
      bodyColumn,
    };

    console.log(post);

    updateDocument(id, data);

    // redirect to home page
    navigate('/dashboard');
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
              <label className="col-2 me-5" htmlFor="lesson">
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
              <label className="col-6">
                <span>Icon</span>
                <input
                  type="text"
                  name="title"
                  className="ml-3 p-2 w-100"
                  required
                  placeholder="Lesson title"
                  onChange={(e) => setImage(e.target.value)}
                  value={image}
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
                </select>
              </label>
            </div>
            <div className="row mt-4">
              <label className="col-12">
                {column != 'one_column' && (
                  <>
                    <span>Content first column:</span>
                    <MarkdownEditor
                      value={body}
                      onChange={(value, viewUpdate) => setBody(value)}
                      style={{ height: '400px' }}
                    />
                    <span>Content second column:</span>
                    <MarkdownEditor
                      value={bodyColumn}
                      onChange={(value, viewUpdate) => setBodyColumn2(value)}
                      style={{ height: '400px' }}
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
