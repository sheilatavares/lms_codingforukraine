import { Link } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import P from 'prop-types';

const Quiz = ({ dataQuiz }) => {
  const {
    id,
    title,
    sectionSlug,
    moduleSlug,
    sectionId,
    moduleId,
    body,
    bodyColumn,
    ordination,
    column,
    slug,
  } = dataQuiz;

  console.log(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [background, setBackground] = useState();

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
                <div className="question-section" data-color-mode="dark">
                  <h5 className="question-text mb-4">
                    {questions[currentQuestion].questionText}
                  </h5>
                  {questions[currentQuestion].codeImage ? (
                    <img src={questions[currentQuestion].codeImage}></img>
                  ) : (
                    ''
                  )}
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
                          answerOption.isCorrect ? 'border-green' : 'border-red'
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
};

Quiz.propTypes = {
  dataQuiz: P.shape({
    title: P.string,

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

export default Quiz;
