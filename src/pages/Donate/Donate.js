// CSS
import styles from './Donate.module.css';

//img
import kiev from './img/kiev.jpg';

import React from 'react';
import BuyMeACoffee from '../../components/BuyMeACoffee/BuyMeACoffee';

function Donate() {
  return (
    <div className="container-full bg-white">
      <div
        className={`row d-flex justify-content-center g-0 pb-5 pt-3 ${styles.donateBox}`}
      >
        <div className="col-lg-12 pb-4">
          <div className="row p-lg-3">
            <div className="col-lg-6">
              <h1 className={`text-start pb-3 ms-3 pt-2 ${styles.DarkBlue}`}>
                Partner With Us
              </h1>
              <div className="bg-white p-4 rounded">
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
            <div className="col-lg-5 mt-5 ms-4 d-flex align-items-center flex-column justify-content-end">
              <div className={`p-lg-4 shadow ${styles.bgYellowDonate}`}>
                <span className="lh-base fs-5">
                  Support us and become strategic partners of our project. Your
                  generosity will help to motivate, instruct, and provide
                  Ukrainians with the necessary tools to be successful. We will
                  be extremely grateful for being able to continue with our
                  mission.
                </span>
                <div className=" mt-3">
                  <small className="pb-2 d-block">
                    Buy me a Coffee is a donation platform that allows donations
                    to be made in a hassle free and secure way.
                  </small>
                  <BuyMeACoffee></BuyMeACoffee>
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
