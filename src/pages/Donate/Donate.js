// CSS
import styles from './Donate.module.css';

//img
import kiev from './img/kiev.jpg';

import React from 'react';

function Donate() {
  return (
    <div className="container bg-white">
      <div
        className={`row d-flex justify-content-center mt-4 py-5 ${styles.donateBox}`}
      >
        <div className="col-lg-11 pb-5">
          <div className="row">
            <div className="col-lg-5">
              <h1 className="text-start py-3">Partner With Us</h1>
              <div className="">
                <h6 className="lh-base">
                  {' '}
                  We are a completely independent, nonprofit and voluntary group
                  of professionals sharing the best of our IT background while
                  essentially driven for humanistic purposes.
                </h6>
                <h6 className="lh-base">
                  {' '}
                  Our courses are especially conceived in consideration to those
                  who aren&apos;t familiarized with tech, establishing a
                  comprehensive and empathic learning environment in a friendly
                  step-by-step process. To ensure these guidelines, we produce
                  the videos, animations and illustrations all over the
                  platform.
                </h6>
              </div>
            </div>
            <div className="col-lg-6 ms-5 d-flex align-items-center flex-column justify-content-end">
              <div className={`p-4 shadow ${styles.bgYellowDonate}`}>
                <h5 className="lh-base">
                  Support us and become strategic partners of our project. Your
                  generosity will help to motivate, instruct, and provide
                  Ukrainians with the necessary tools to be successful. We will
                  be extremely grateful for being able to continue with our
                  mission.
                </h5>
                <div className="d-flex justify-content-center mt-3">
                  <a
                    className="btn btn-lg w-50 btn-primary rounded-pill"
                    href="https://www.buymeacoffee.com/CodingUkraine"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`row d-flex justify-content-center mt-4 py-5 ${styles.donateBox2}`}
      >
        <div className="col-lg-11 pb`-5">
          <div className="row">
            <div className="col-lg-5">
              <h1 className={`text-start pb-3 pt-2 ${styles.DarkBlue}`}>
                Partner With Us
              </h1>
              <div className="">
                <h6 className="lh-base">
                  {' '}
                  We are a completely independent, nonprofit and voluntary group
                  of professionals sharing the best of our IT background while
                  essentially driven for humanistic purposes.
                </h6>
                <h6 className="lh-base">
                  {' '}
                  Our courses are especially conceived in consideration to those
                  who aren&apos;t familiarized with tech, establishing a
                  comprehensive and empathic learning environment in a friendly
                  step-by-step process. To ensure these guidelines, we produce
                  the videos, animations and illustrations all over the
                  platform.
                </h6>
              </div>
            </div>
            <div className="col-lg-6 ms-5 d-flex align-items-center flex-column justify-content-end">
              <div className={`p-4 shadow ${styles.bgYellowDonate}`}>
                <h5 className="lh-base">
                  Support us and become strategic partners of our project. Your
                  generosity will help to motivate, instruct, and provide
                  Ukrainians with the necessary tools to be successful. We will
                  be extremely grateful for being able to continue with our
                  mission.
                </h5>
                <div className="d-flex justify-content-center mt-3">
                  <a
                    className="btn btn-lg w-50 btn-primary rounded-pill"
                    href="https://www.buymeacoffee.com/CodingUkraine"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`row d-flex justify-content-center mt-4 py-5 ${styles.donateBox3}`}
      >
        <div className="col-lg-11 pb-5">
          <div className="row">
            <div className="col-lg-5">
              <h1 className={`text-start py-3 ${styles.DarkBlue}`}>
                Partner With Us
              </h1>
              <div className="">
                <h6 className="lh-base">
                  {' '}
                  We are a completely independent, nonprofit and voluntary group
                  of professionals sharing the best of our IT background while
                  essentially driven for humanistic purposes.
                </h6>
                <h6 className="lh-base">
                  {' '}
                  Our courses are especially conceived in consideration to those
                  who aren&apos;t familiarized with tech, establishing a
                  comprehensive and empathic learning environment in a friendly
                  step-by-step process. To ensure these guidelines, we produce
                  the videos, animations and illustrations all over the
                  platform.
                </h6>
              </div>
            </div>
            <div className="col-lg-6 ms-5 d-flex align-items-center flex-column justify-content-end">
              <div className={`p-4 shadow ${styles.bgYellowDonate}`}>
                <h5 className="lh-base">
                  Support us and become strategic partners of our project. Your
                  generosity will help to motivate, instruct, and provide
                  Ukrainians with the necessary tools to be successful. We will
                  be extremely grateful for being able to continue with our
                  mission.
                </h5>
                <div className="d-flex justify-content-center mt-3">
                  <a
                    className="btn btn-lg w-50 btn-primary rounded-pill"
                    href="https://www.buymeacoffee.com/CodingUkraine"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Donate
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Donate;
