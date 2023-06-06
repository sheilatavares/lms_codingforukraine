import { Link } from 'react-router-dom';
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import P from 'prop-types';
import MDEditor from '@uiw/react-md-editor';

import styles from './PostDetail.module.css';

import { useAuthValue } from '../context/AuthContext';
import { useInsertDocument } from '../hooks/useInsertDocument';
import { useFetchSavedPath } from '../hooks/useFetchSavedPath';
import { useDeleteDocument } from '../hooks/useDeleteDocument';

const PostDetail = ({ data }) => {
  const {
    id,
    title,
    quiz,
    sectionSlug,
    moduleSlug,
    sectionId,
    moduleId,
    body,
    bodyColumn,
    ordination,
    column,
    slug,
  } = data;

  //Quiz variables
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [background, setBackground] = useState();

  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState([]);

  const [isQuiz, setIsQuiz] = useState(false);
  const { user } = useAuthValue();
  const [savedPath, setSavedPath] = useState(false);
  const [savedError, setSavedError] = useState(false);
  const { insertDocument, response } = useInsertDocument('usersPath');
  const { insertDocument: insertQuiz, response: responseQuiz } =
    useInsertDocument('quizResult');

  const { deleteDocument } = useDeleteDocument('usersPath');

  const handleDeletePath = (pathId) => {
    return deleteDocument(pathId);
  };

  let userId = user.uid;
  let lessonId = id;

  const { documents: usersPath, loading } = useFetchSavedPath(
    'usersPath',
    userId,
    lessonId,
  );

  // Users quiz completed
  const quizConcluded = usersPath?.find(
    (obj) => obj && obj.isQuiz && obj.sectionSlug === sectionSlug,
  );
  console.log('quiz concluido?', quizConcluded);

  const handleCoursePath = async (e) => {
    e.preventDefault();

    try {
      const response = await insertDocument({
        userId: user.uid,
        moduleId,
        sectionId,
        lessonId: id,
        sectionSlug,
        moduleSlug,
        slug,
        isQuiz,
      });
      setSavedPath(true);
      setSavedError(false);
    } catch (error) {
      console.error(error);
      setSavedError('An error occurred. Please try again later.');
      setSavedPath(false);
    }
  };

  useEffect(() => {
    const resetQuiz = () => {
      setCurrentQuestion(0);
      setShowScore(false);
      setScore(0);
      setResult(false);
      setBackground(null);
    };

    return () => {
      resetQuiz();
    };
  }, []);

  function handleAnswerOptionClick(
    currentQuestion,
    answerOption,
    isCorrect,
    explanation,
    index,
  ) {
    setBackground(index);
    const questions = [...quizQuestions];
    const answers = [...quizAnswers];
    questions[currentQuestion] = isCorrect;
    answers[currentQuestion] = answerOption;
    setQuizQuestions(questions);
    setQuizAnswers(answers);
    if (isCorrect) {
      setResult(`👏 Good Job! ` + explanation);
      setScore(score + 1);
    } else {
      setResult(`❗ Incorrect. ` + explanation);
    }
  }
  if (quiz) {
    const parsedQuestions = JSON.parse(body);
    let percentage = Math.round((score / parsedQuestions.length) * 100);
    let incorrects = parsedQuestions.length - score;

    const handleNextQuestion = async () => {
      setResult(false);
      setIsQuiz(true);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < parsedQuestions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);

        console.log(isQuiz);
        if (!quizConcluded) {
          try {
            const response = await insertDocument({
              userId: user.uid,
              moduleId,
              sectionId,
              lessonId: id,
              sectionSlug,
              moduleSlug,
              slug,
              isQuiz,
            });
          } catch (error) {
            console.error(error);
          }
        }
        try {
          const responseQuiz = await insertQuiz({
            userId: user.uid,
            sectionId,
            sectionSlug,
            moduleId,
            moduleSlug,

            quizQuestions,
            quizAnswers,
            percentage,
          });
          console.log(responseQuiz);
        } catch (error) {
          console.error(error);
        }
      }
    };
    return (
      <div className="container-full w-100 col-lg-11 col-12 pt-0 pb-4 text-center">
        <div className="row mt-3 mb-2">
          <h2>{title}</h2>
        </div>
        <div className="row justify-content-center bg-quiz py-5">
          <div className="col-lg-8 align-self-center text-white">
            <div>
              {showScore ? (
                <div className="score-section">
                  <h4 className="pb-4">Quiz Summary</h4>

                  <h4 className="text-warning"> {percentage}% </h4>

                  <h4>{score} correct </h4>
                  <h4 className="border-bottom border-white pb-5">
                    {incorrects} incorrects
                  </h4>

                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <a className=" text-decoration-none" href="">
                      <strong>Retake quiz</strong>
                    </a>
                    {sectionSlug !== 'loops' ? (
                      <a
                        className="btn btn-warning w-50 mt-3"
                        href={bodyColumn}
                      >
                        <strong>Go to next section</strong>
                      </a>
                    ) : null}
                  </div>
                </div>
              ) : (
                <>
                  <div className="question-section" data-color-mode="dark">
                    <h5 className="question-text mb-4">
                      {parsedQuestions[currentQuestion].questionText}
                    </h5>
                    {parsedQuestions[currentQuestion].codeImage ? (
                      <img
                        src={parsedQuestions[currentQuestion].codeImage}
                      ></img>
                    ) : (
                      ''
                    )}
                  </div>
                  <div className="answer-section answer-section d-flex flex-column pt-4">
                    {parsedQuestions[currentQuestion].answerOptions.map(
                      (answerOption, index) => (
                        <a
                          key={index}
                          className={`py-2 my-1
                          d-flex justify-content-start text-start px-2 ${
                            result ? 'disabled' : ''
                          } ${
                            answerOption.isCorrect
                              ? 'border-green'
                              : 'border-red'
                          } ${background === index ? 'filled' : ''}`}
                          onClick={() =>
                            handleAnswerOptionClick(
                              currentQuestion,
                              answerOption.answerText,
                              answerOption.isCorrect,
                              answerOption.explanation,
                              index,
                            )
                          }
                        >
                          <div className="text">{answerOption.answerText}</div>
                        </a>
                      ),
                    )}
                    <div className="pt-5">{result}</div>
                    <div className="d-flex align-items-end flex-column mb-3">
                      <button
                        className="btn btn-primary mt-5 col-3"
                        disabled={result != '' ? false : true}
                        onClick={() => handleNextQuestion()}
                      >
                        Next step
                      </button>
                    </div>
                  </div>
                  <div className="question-count text-white">
                    Question {currentQuestion + 1}/{parsedQuestions.length}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    let columnLeft;
    let columnRight;
    if (column === 'one_column') {
      columnLeft = 'col-sm-12';
    } else if (column === 'two_columns_left') {
      columnLeft = 'col-sm-7 col-12 pe-lg-4';
      columnRight = 'col-sm-5';
    } else if (column === 'two_columns_right') {
      columnLeft = 'col-sm-5 col-12 pe-lg-4';
      columnRight = 'col-sm-7';
    } else if (column === 'column_exercise') {
      columnLeft = 'col-sm-3 col-12 pe-lg-4 questionStatement';
      columnRight = 'col-sm-9 pt-3 pt-md-0';
    } else {
      columnLeft = 'col-sm-6 col-12 pe-lg-4';
      columnRight = 'col-sm-6';
    }
    return (
      <div className="container-full w-100 col-lg-11 col-12 pt-0 pb-4">
        <div className="row mt-3 mb-2">
          <h2>{title}</h2>
        </div>
        <div
          className={`row pb-5 mb-4 mb-lg-2 ${
            column === 'column_exercise' ? styles.exerciseScreen : ''
          }`}
          data-color-mode="light"
        >
          <div className={`${columnLeft} wmde-markdown-var`}>
            <MDEditor.Markdown source={body} />
          </div>
          {column != 'one_column' && (
            <>
              <div className={columnRight}>
                <MDEditor.Markdown source={bodyColumn} />
              </div>
            </>
          )}
        </div>

        {slug === 'conclusion' && (
          <div className="row">
            <div className="col-lg-5 col-12 d-grid gap-2">
              {usersPath?.length === 0 ? (
                <button
                  className="btn btn-secondary w-50"
                  onClick={handleCoursePath}
                >
                  〇 Mark this section as done
                </button>
              ) : (
                usersPath?.map((path) => (
                  <button
                    className="btn btn-success w-50"
                    key={path.id}
                    onClick={() => handleDeletePath(path.id)}
                  >
                    ✓ Done
                  </button>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    );
  }
};

PostDetail.propTypes = {
  data: P.shape({
    title: P.string,
    quiz: P.boolean,
    id: P.string,
    sectionSlug: P.string,
    moduleSlug: P.string,
    sectionId: P.string,
    moduleId: P.string,
    body: P.string,
    bodyColumn: P.string,
    ordination: P.string,
    column: P.string,
    slug: P.string,
  }),

  idLesson: P.string,
};

export default PostDetail;
