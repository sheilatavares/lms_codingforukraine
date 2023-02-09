import styles from './CreatePost.module.css';
import MarkdownEditor from '@uiw/react-markdown-editor';

import React, { useRef } from 'react';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthValue } from '../../context/AuthContext';
import { useInsertDocument } from '../../hooks/useInsertDocument';
import { Link } from 'react-router-dom';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

const CreatePost = () => {
  const [course, setCourse] = useState('introducing_programming');
  const { documents: sections, loading } = useFetchDocuments('sections');
  const { documents: modules } = useFetchDocuments('modules');
  const [sectionSlug, setSectionSlug] = useState('');
  const [moduleSlug, setModuleSlug] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [moduleId, setModuleId] = useState('');
  const [ordination, setOrdination] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [bodyColumn, setBodyColumn2] = useState('');
  const [formError, setFormError] = useState('');
  const [value, setValue] = useState('');
  const [column, setColumn] = useState('');
  const [image, setImage] = useState('');
  const [slug, setSlug] = useState('');

  //editor
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const { user } = useAuthValue();

  const { insertDocument, response } = useInsertDocument('posts');

  const navigate = useNavigate();

  const mergedSections = (r, { module, moduleId, slug, ...rest }) => {
    return r.reduce((r, { module, moduleId, slug, ...rest }) => {
      const key = `${module}-${moduleId}-${slug}`;
      r[key] = r[key] || { module, moduleId, slug, section: [] };
      r[key]['section'].push(rest);
      return r;
    }, {});
  };

  const resultModules = (select, moduleId) => {
    let sectionsMerged = mergedSections(sections, {
      module,
      moduleId,
      slug,
    });
    const sectionsValues = Object.values(sectionsMerged);

    // console.log(sectionsMerged);

    let result;
    // if (select === 'module') {
    //   return sectionsValues.map((module, index) => (
    //     <option
    //       key={module.id}
    //       data-value={module.slug}
    //       value={module.moduleId}
    //     >
    //       {module.module}
    //     </option>
    //   ));
    // } else {
    return sections
      .filter((emp) => emp.moduleId === value)

      .map((ord) => (
        <option key={ord.id} value={ord.slug} data-id={ord.id}>
          Section {ord.ordination} - {ord.section}
        </option>
      ));
    // }
  };

  function onChangeModule(event) {
    setModuleSlug(
      event.target.options[event.target.selectedIndex].getAttribute(
        'data-value',
      ),
    );
    setModuleId(event.target.value);
    setValue(event.target.value);
  }

  function onChangeSection(event) {
    setSectionId(
      event.target.options[event.target.selectedIndex].getAttribute('data-id'),
    );
    setSectionSlug(event.target.value);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    setFormError('');

    // check values
    // if (
    //   !course ||
    //   !moduleId ||
    //   sectionId ||
    //   title ||
    //   ordination ||
    //   column ||
    //   body
    // ) {
    //   setFormError('All fields are mandatory.');
    // }

    console.log({
      course,

      moduleSlug,
      moduleId,

      sectionSlug,
      sectionId,
      title,
      ordination,
      body,
      column,
      bodyColumn,
      slug,
      uid: user.uid,
      createdBy: user.displayName,
    });

    if (formError) {
      return;
    } else {
      insertDocument({
        course,
        image,
        moduleSlug,
        moduleId,

        sectionSlug,
        sectionId,
        title,
        ordination,
        body,
        slug,
        column,
        bodyColumn,
        uid: user.uid,
        createdBy: user.displayName,
      });
    }

    //redirect
    navigate('/');
  };

  return (
    <div className="container bg-white">
      <div className="container mt-2 mb-0">
        <div className="row align-center d-flex justify-content-center">
          <Link to="/posts/create-module" className="btn btn-primary col-3 m-3">
            Create Module
          </Link>
          <Link
            to="/posts/create-section"
            className="btn btn-primary col-3 m-3"
          >
            Create Section
          </Link>
        </div>
      </div>

      <h1>Create Lesson</h1>
      <p>Insert down the content in markdown format.</p>
      <form onSubmit={handleSubmit}>
        <div className="row">
          <span>Course: Introduction to programming with Javascript</span>
          <label className="col-4 d-flex justify-content-center align-middle">
            <span>Icon lesson:</span>
            <input
              type="text"
              name="image"
              required
              placeholder="Insert icon"
              onChange={(e) => setImage(e.target.value)}
              value={image}
            />
          </label>
          <label className="col-4">
            <span>Module:</span>
            <select
              className="form-select"
              onChange={(e) => onChangeModule(e)}
              defaultValue={'DEFAULT'}
            >
              <option value="DEFAULT" disabled>
                Choose a Module ...
              </option>
              {loading && <option>Loading...</option>}
              {modules &&
                modules.map((module) => (
                  <option
                    key={module.ordination}
                    data-value={module.slug}
                    value={module.id}
                  >
                    Module {module.ordination} - {module.module}
                  </option>
                ))}
            </select>
          </label>
          <label className="col-4">
            <span>Section:</span>
            <select
              className="form-select"
              onChange={(e) => onChangeSection(e)}
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
        <div className="row">
          <label className="col-3" htmlFor="lesson">
            <span>Lesson number:</span>
            <input
              type="number"
              className="m-1"
              name="Lesson"
              required
              placeholder="Lesson"
              onChange={(e) => setOrdination(e.target.value)}
              value={ordination}
            />
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
          <label className="col-6">
            <span>Title:</span>
            <input
              type="text"
              name="title"
              className="m-1 p-2 w-100"
              required
              placeholder="Lesson title"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
          </label>
          <label className="col-3">
            <span>Display columns:</span>
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
                  style={{ height: '400px', border: '10px' }}
                />
              </>
            )}
          </label>
        </div>
        <div className="container d-inline-block">
          {!response.loading && (
            <button className="btn btn-primary float-end">Submit</button>
          )}
          {response.loading && (
            <button className="btn" disabled>
              Wait...
            </button>
          )}
          {response.error && <p className="error">{response.error}</p>}
          {formError && <p className="error">{formError}</p>}
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
