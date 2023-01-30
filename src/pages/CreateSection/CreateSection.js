import MarkdownEditor from '@uiw/react-markdown-editor';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const CreateSection = () => {
  const [course, setCourse] = useState('introduction_programming');
  const [moduleId, setModuleId] = useState('');
  const [module, setModule] = useState('');
  const [moduleOrd, setModuleOrd] = useState('');
  const [section, setSection] = useState('');
  const [ordination, setOrdination] = useState('');
  const [formError, setFormError] = useState('');
  const [value, setValue] = useState('');

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument('sections');
  const { documents: modules, loading } = useFetchDocuments('modules');
  // console.log('do section:', modules);

  const navigate = useNavigate();

  function onChange(event) {
    setValue(event.target.value);
    setModuleId(event.target.value);
    setModuleOrd(
      event.target.options[event.target.selectedIndex].getAttribute('data-key'),
    );
    setModule(event.target.options[event.target.selectedIndex].text);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    // setFormError('');

    //checar todos os valores
    // if (!title || !course || !module || !section || !lesson || !body) {
    //   setFormError('Please, fill all the fields!');
    // }

    if (formError) {
      return;
    } else {
      insertDocument({
        course,
        module,
        moduleId,
        moduleOrd,
        section,
        ordination,
      });
    }

    //redirect
    navigate('/');
  };

  return (
    <div>
      <h1>Create Section</h1>
      <p>Insert down the Section for the Course</p>
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
          <label className="col-7">
            <span>Module:</span>
            {loading && <p>Loading...</p>}

            <select
              className="form-select m-1"
              onChange={onChange}
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT" disabled>
                Choose the Module for this Section
              </option>
              {modules &&
                modules.map((module) => (
                  <option
                    key={module.ordination}
                    data-key={module.ordination}
                    value={module.id}
                  >
                    Module {module.ordination} - {module.module}
                  </option>
                ))}
            </select>

            {modules && modules.length === 0 && (
              <div className="danger">
                <p>No Module were found</p>
              </div>
            )}
          </label>
        </div>
        <div className="row">
          <label className="col-7">
            <span>Section:</span>
            <input
              type="text"
              name="section"
              className="m-1 p-2 w-100"
              required
              placeholder="section"
              onChange={(e) => setSection(e.target.value)}
              value={section}
            />
          </label>
          <label className="col-3">
            <span>Ordination:</span>
            <select
              className="form-select m-1"
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
          <label className="col-2 d-flex justify-content-center">
            {!response.loading && (
              <button className="btn btn-primary m-1 mt-3">Submit</button>
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

        {/* <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insert tags"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label> */}
      </form>
    </div>
  );
};

export default CreateSection;
