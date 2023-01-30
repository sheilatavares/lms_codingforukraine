import MarkdownEditor from '@uiw/react-markdown-editor';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const CreateModule = () => {
  const { documents: sections, loading } = useFetchDocuments('sections');
  const [course, setCourse] = useState('introduction_programming');
  const [module, setModule] = useState('');
  const [ordination, setOrdination] = useState('');
  const [formError, setFormError] = useState('');

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument('modules');

  // if (sections) console.log(sections);

  const groupBySection = (xs, key) => {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  let sectionsUp;

  const resultSections = () => {
    let sectionsUp = groupBySection(sections, 'module');

    return Object.keys(sectionsUp).map((module, ordination) => (
      <div className="mb-3" key={ordination}>
        <h5 key={module.id}>
          Module {ordination} - {module}
        </h5>
        {sectionsUp[module].map((ord) => (
          <h6 key={ord.id}>
            Section {ord.ordination} - {ord.section}
          </h6>
        ))}
      </div>
    ));
  };

  // console.log(sectionsUp);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formError) {
      return;
    } else {
      insertDocument({
        course,
        module,
        ordination,
      });
    }

    //redirect
    navigate('/');
  };

  return (
    <div>
      <h1>Create Module</h1>
      <p>Insert down the Module for the Course</p>
      <form onSubmit={handleSubmit} className="w-100">
        <div className="row">
          <label className="col-3">
            <span>Course:</span>
            <input
              disabled
              type="text"
              className="w-100 m-1 p-1 border-0"
              name="course"
              required
              placeholder="Introduction to programming with Javascript"
              onChange={(e) => setCourse(e.target.value)}
              value={course}
            />
          </label>
          <label className="col-6">
            <span>Module:</span>
            <input
              type="text"
              name="module"
              className="m-1 p-2 w-100"
              required
              placeholder="Module"
              onChange={(e) => setModule(e.target.value)}
              value={module}
            />
          </label>
          <label className="col-2">
            <span>Ordination:</span>
            <select
              className="form-select"
              onChange={(e) => setOrdination(e.target.value)}
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT" disabled>
                Choose the Order for this Module ...
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </label>
          <label className="col-1 align-middle d-flex justify-content-center mt-3">
            {!response.loading && (
              <button className="btn btn-primary">Submit</button>
            )}
            {response.loading && (
              <button className="btn" disabled>
                Wait...
              </button>
            )}
            {response.error && <p className="error">{response.error}</p>}
            {formError && <p className="error">{formError}</p>}
          </label>
        </div>
      </form>
      <div className="container d-flex justify-content-center mb-5 mt-5">
        <div className="row">
          <h2 className="mb-3">All the modules for this course:</h2>
          {loading && <p>Carregando...</p>}
          {sections && resultSections()}

          {sections && sections.length === 0 && (
            <div>
              <p>No sections were found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateModule;
