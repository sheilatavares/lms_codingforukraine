import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import P from 'prop-types';
import MDEditor from '@uiw/react-md-editor';

// import styles from './PostDetail.module.css';
// import { useFetchDocuments } from '../hooks/useFetchDocuments';

const PostDetail = ({ data, slug }) => {
  const {
    id,
    title,
    quiz,
    sectionSlug,
    moduleSlug,
    body,
    bodyColumn,
    ordination,
    column,
  } = data;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [background, setBackground] = useState();

  if (quiz) {
    // const questionsP = body.replace(/\\t/g, '');
    const questions = JSON.parse(body);
    console.log('aqui', questions);
    const handleAnswerOptionClick = (isCorrect, explanation, index) => {
      setBackground(index);
      if (isCorrect) {
        setResult(`👏 Good Job! ` + explanation);
        setScore(score + 1);
      } else {
        setResult(`❗ Incorrect. ` + explanation);
      }
    };

    const handleNextQuestion = () => {
      setResult(false);
      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
      } else {
        setShowScore(true);
      }
    };

    let percentage = (score / questions.length) * 100;
    let incorrects = questions.length - score;

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
                  {/* {percentage < 70 ? (
                    <p className="text-center">
                      Practice the concepts and try again!
                    </p>
                  ) : (
                    ''
                  )} */}
                  <div className="d-flex flex-column justify-content-center align-items-center">
                    <a className=" text-decoration-none" href="">
                      <strong>Retake quiz</strong>
                    </a>
                    <a className="btn btn-warning w-50 mt-3" href={bodyColumn}>
                      <strong>Go to next section</strong>
                    </a>
                  </div>
                </div>
              ) : (
                <>
                  <div className="question-section">
                    <h5 className="question-text">
                      {questions[currentQuestion].questionText}
                    </h5>
                  </div>
                  <div className="answer-section answer-section d-flex flex-column pt-4">
                    {questions[currentQuestion].answerOptions.map(
                      (answerOption, index) => (
                        <a
                          key="index"
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
                    Question {currentQuestion + 1}/{questions.length}
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
      columnLeft = 'col-sm-7 col-12 pe-5';
      columnRight = 'col-sm-5';
    } else if (column === 'two_columns_right') {
      columnLeft = 'col-sm-5 col-12 pe-5';
      columnRight = 'col-sm-7';
    } else {
      columnLeft = 'col-sm-6 col-12 pe-5';
      columnRight = 'col-sm-6';
    }
    return (
      <div className="container-full w-100 col-lg-11 col-12 pt-0 pb-4">
        <div className="row mt-3 mb-2">
          <h2>{title}</h2>
        </div>
        <div className="row pb-5" data-color-mode="light">
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
      </div>
    );
  }
};

PostDetail.propTypes = {
  data: P.shape({
    title: P.string,
    quiz: P.string,
    id: P.string,
    sectionSlug: P.string,
    moduleSlug: P.string,
    body: P.string,
    bodyColumn: P.string,
    ordination: P.string,
    column: P.string,
  }),
  slug: P.string,
  idLesson: P.string,
};

export default PostDetail;
