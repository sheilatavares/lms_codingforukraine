import React from 'react';
import styles from './About.module.css';
import logo from './img/cfu_bird.jpg';
import sheila from './img/sheila-about.jpg';
import { useNavigate, Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="container aboutContent">
      <div className="row position-relative justify-content-center d-flex flex-column flex-lg-row flex-column-reverse">
        <div className="col-lg-7 pb-5">
          <div className="">
            <h1 className="text-white text-start py-5">
              Time to think on the next steps for Ukraine
            </h1>
            <h2 className="text-warning">Hi! I&apos;m Sheila</h2>
            <p className="text-white fs-5">
              Sheila Tavares has over 15 years of experience in the education
              and technology industries, and she seeks to combine the best of
              both sectors to create a future of learning that is engaging and
              impactful. Her expertise throughout this diverse range of
              experiences, incorporating front-end development skills,
              user-centric approach, cultural adaptability as well as the
              commitment to continuous learning, creates a valuable asset to
              engage impactful learning experiences for organizations and
              students.{' '}
            </p>
            <p className="text-white fs-5">
              In these days, the IT market offers opportunities that Ukrainians
              may take advantage in a short to middle term, in particular by
              means of working remotely, offering services to international
              companies or those operating large outsourcing networks.
            </p>
            <p className="text-white fs-5">
              This project is the result of a partnership with tech
              professionals from different segments of the IT market, united by
              the common cause of providing a teaching platform for Ukrainians
              to build or complement their tech skills. With that intention, we
              developed a quality and convenient platform to foster the
              expansion of these abilities, aiming especially to the Ukrainian
              public, a highly-educated population and naturally enthusiastic to
              master technology qualifications.
            </p>
            <div className="text-start pt-4">
              <Link
                to="/register"
                className="btn btn-lg donate_button text-blue shadow text-nowrap d-inline"
              >
                <strong>Start learning code for free!</strong>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-lg-4 d-flex flex-column align-items-center mt-3 mt-lg-0">
          <img src={sheila} className="w-100" />
          <a
            href="https://www.linkedin.com/in/sheila-tavares/"
            className={`btn btn-sm mt-3 donate_button`}
            target="_blank"
            rel="noreferrer"
          >
            <small>
              <strong>Contact me</strong>
            </small>
          </a>
          {/* <div className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlSpace="preserve"
              width="150"
              height="150"
              style={{
                shapeRendering: 'geometricPrecision',
                textRendering: 'geometricPrecision',
                imageRendering: 'optimizeQuality',
                fillRule: 'evenodd',
                clipRule: 'evenodd',
              }}
              viewBox="0 0 2.77864 1.81506"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <defs>
                <style
                  type="text/css"
                  dangerouslySetInnerHTML={{
                    __html:
                      '\n   \n    .fil2 {fill:#0055bb}\n    .fil0 {fill:#FFD726}\n    .fil1 {fill:#0055bb;fill-rule:nonzero}\n   \n  ',
                  }}
                />
              </defs>
              <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer" />
                <path
                  className="fil0"
                  d="M2.65228 0.120246c0.0259752,0.0137021 0.0471272,0.0366867 0.0544868,0.0744702 0.0124697,0.0640164 -0.0283788,0.11406 -0.0714982,0.147777 -0.0223472,-0.0326284 -0.0591294,-0.0499717 -0.0591294,-0.0499717 0,0 2.92155e-005,0.000605557 -0.000220444,0.00175558 -0.00546064,-0.00578201 -0.0124086,-0.0112506 -0.0206394,-0.0163261 0.0484685,-0.0315846 0.106663,-0.0853463 0.0970006,-0.157705zm-0.334544 0.284213c-0.0315102,0.00405298 -0.0454088,0.00167325 -0.0454088,0.00167325l0.0167883 -0.00723481c0.00912585,0.00215132 0.0186873,0.0040158 0.0286205,0.00556156zm0.333914 -0.0182437c0.0387424,0.0266684 0.110379,0.0976115 -0.0134896,0.203786 -0.0433982,0.0371992 -0.088159,0.0640987 -0.134056,0.0839387 -0.00331197,-0.0182676 -0.0119385,-0.0335633 -0.0191786,-0.0437674 -0.00518707,-0.0139198 -0.018504,-0.0267242 -0.0378606,-0.037518 0.0463835,-0.019901 0.0915878,-0.0469492 0.135424,-0.084523 0.0562052,-0.0481763 0.0721277,-0.0890912 0.069161,-0.121916zm-0.148757 0.323197c0.016366,-0.00652302 0.0263709,-0.0110567 0.0263709,-0.0110567 0,0 0.092196,0.0892904 -0.0368434,0.169325 -0.0462454,0.0286843 -0.100012,0.046426 -0.156305,0.057326 0.000547126,-0.0172212 -0.00528269,-0.0319723 -0.0111098,-0.0422721 -0.00432654,-0.0151495 -0.0182358,-0.029072 -0.0391328,-0.0406653 0.0543222,-0.0109797 0.106116,-0.0284957 0.150877,-0.0562584 0.0412708,-0.0255981 0.0598811,-0.0521337 0.0661438,-0.0763984zm-0.17414 0.245086c0.0130513,-0.00164669 0.0266418,-0.00347398 0.0407981,-0.00550579 0,0 0.0742338,0.0771288 -0.0482719,0.147365 -0.0499877,0.0286604 -0.12663,0.0458869 -0.19985,0.0562504l0.000438232 -0.000913647c0.00975796,-0.0215902 0.00924271,-0.0380465 0.00518973,-0.0483091 -0.00428139,-0.013548 -0.0162491,-0.0260868 -0.0340095,-0.0368194 0.0644998,-0.0106344 0.128758,-0.0269632 0.17256,-0.0520779 0.0350346,-0.020087 0.0539556,-0.0407396 0.0631452,-0.05999zm0.354129 0.411638c0.060893,0.0332127 0.0957523,0.0650708 0.0957523,0.0650708 0,0 -0.300547,0.104538 -0.390385,0.383851 -0.0864379,-0.00340493 -0.168119,-0.0569409 -0.248278,-0.117606l-0.0618624 -0.0468164c0,0 -0.0145812,-0.0089718 -0.0492095,0.0059812 -0.0232635,0.0100448 -0.170847,0.0670548 -0.312754,0.0999169 -0.159442,0.0369257 -0.342243,0.0305275 -0.492546,-0.0390239 -0.0815855,-0.037757 -0.160783,-0.100767 -0.220138,-0.207884 0.049398,0.0593738 0.106328,0.0991095 0.164467,0.126014 0.150303,0.0695514 0.333104,0.0759496 0.492546,0.0390239 0.141907,-0.0328621 0.289491,-0.0898721 0.312754,-0.0999169 0.0346283,-0.014953 0.0492095,-0.0059812 0.0492095,-0.0059812l0.0618624 0.0468164c0.0801593,0.0606646 0.16184,0.114201 0.248278,0.117606 0.0695647,-0.216282 0.265428,-0.327747 0.350304,-0.367052z"
                />
                <path
                  className="fil1"
                  d="M0 0.836022c0,-0.0600537 0.0104299,-0.118015 0.0312898,-0.173885 0.0208625,-0.0558706 0.0536183,-0.106201 0.0982808,-0.150996l0.0731555 0c-0.0411301,0.046272 -0.0721303,0.0972184 -0.0929875,0.152842 -0.0208625,0.0556236 -0.0312924,0.112724 -0.0312924,0.171301 0,0.0571003 0.0104299,0.113093 0.0312924,0.167978 0.0208572,0.0548852 0.0515626,0.105463 0.0921057,0.151734l-0.0722737 0c-0.0446625,-0.0433186 -0.0774183,-0.0924191 -0.0982808,-0.147304 -0.0208598,-0.0548852 -0.0312898,-0.112108 -0.0312898,-0.17167zm0.687509 0c0,0.0595624 -0.0104299,0.116785 -0.0312898,0.17167 -0.0208625,0.0548852 -0.053621,0.103986 -0.0982808,0.147304l-0.0722764 0c0.0405457,-0.046272 0.0712485,-0.0968493 0.092111,-0.151734 0.0208598,-0.0548852 0.0312898,-0.110878 0.0312898,-0.167978 0,-0.058577 -0.0104299,-0.115677 -0.0312898,-0.171301 -0.0208625,-0.0556236 -0.0518574,-0.10657 -0.0929928,-0.152842l0.0731582 0c0.0446598,0.0447953 0.0774183,0.0951255 0.0982808,0.150996 0.0208598,0.0558706 0.0312898,0.113831 0.0312898,0.173885z"
                />
                <path
                  className="fil2"
                  d="M0.727061 0.756957c0,0 0.092289,-0.0988811 0.247203,-0.108769 0.154914,-0.00988811 0.266979,0.105473 0.286755,0.131841 0.0197762,0.0263683 0.095585,0.108769 0.095585,0.108769 0,0 0.0906264,-0.0264294 0.407046,-0.438431 0.316419,-0.412002 0.662854,-0.444994 0.662854,-0.444994 0,0 0.177168,-0.0379456 0.201669,0.087827 0.0245011,0.125773 -0.156807,0.197643 -0.156807,0.197643l-0.22196 0.0956435c0,0 0.0506331,0.00871683 0.178039,-0.0353852 0.127406,-0.0441021 0.125773,-0.0782257 0.125773,-0.0782257 0,0 0.166425,0.0784037 0.00635303,0.21561 -0.13437,0.115173 -0.28169,0.131616 -0.435937,0.145551 0,0 0.0226845,0.0225092 0.112522,0.0208784 0.0898375,-0.00163075 0.214519,-0.058075 0.214519,-0.058075 0,0 0.092196,0.0892904 -0.0368434,0.169325 -0.120458,0.0747146 -0.291892,0.0752936 -0.426315,0.0736814 -6.10869e-005,0.0232794 0.0854393,0.0389362 0.303445,0.00763055 0,0 0.0742338,0.0771288 -0.0482719,0.147365 -0.122506,0.0702366 -0.405086,0.07187 -0.405086,0.07187l-0.0245011 0c-0.00690547,0 0.089479,0.0453105 0.277316,0.00489757 0.00963048,-0.00163872 0.0264958,0.0206899 0.00853091,0.0604388 -0.0179649,0.039749 -0.100724,0.0816705 -0.123592,0.0931044 -0.0228677,0.0114339 0.1265,-0.0176674 0.214059,-0.0289977 0.0613153,-0.00793333 0.137193,-0.0117845 0.219881,0.00122971 0.176408,0.0277653 0.290747,0.132306 0.290747,0.132306 0,0 -0.300547,0.104538 -0.390385,0.383851 -0.0864379,-0.00340493 -0.168119,-0.0569409 -0.248278,-0.117606l-0.0618624 -0.0468164c0,0 -0.0145812,-0.0089718 -0.0492095,0.0059812 -0.0232635,0.0100448 -0.170847,0.0670548 -0.312754,0.0999169 -0.159442,0.0369257 -0.342243,0.0305275 -0.492546,-0.0390239 -0.0975318,-0.0451352 -0.191648,-0.126338 -0.252536,-0.275874 -0.0102015,-0.0250536 -0.0208678,-0.0497407 -0.0302885,-0.0745977 -0.0264161,-0.0696842 -0.0234945,-0.133268 -0.0367876,-0.203908 -0.0105016,-0.0557829 -0.030894,-0.107688 -0.058901,-0.127018 -0.00882041,-0.00608744 -0.0296085,-0.0217841 -0.053459,-0.0315102 -0.0839918,-0.0342618 -0.0762311,-0.0261319 -0.0762311,-0.0261319l0.0609753 -0.0933939c0,0 0.0311543,-0.027999 0.0292819,-0.0266047zm0.247325 0.0094844c0.0401792,0 0.0727518,0.0325726 0.0727518,0.0727518 0,0.0401792 -0.0325726,0.0727518 -0.0727518,0.0727518 -0.0401792,0 -0.0727518,-0.0325726 -0.0727518,-0.0727518 0,-0.0401792 0.0325726,-0.0727518 0.0727518,-0.0727518z"
                />
                <path
                  className="fil0"
                  d="M0.748806 0.933158c0.0606433,-0.115645 -0.0126928,-0.178084 -0.0126928,-0.178084l-0.188982 0.0694903c0,0 -0.0631373,0.0218239 -0.00141031,0.0451299 0.061727,0.023306 0.130081,0.0439135 0.203085,0.0634639z"
                />
              </g>
            </svg>
          </div> */}
          {/* <p className="fs-5">
            By inserting into the international field of the tech-related
            careers, Ukrainian professionals will be able to access reliable
            prospects of income building and so decisively improve family
            welfare.
          </p> */}
        </div>
      </div>
      {/* <div className="row">
        <div className="col-lg-7 bg-white pe-5 ps-5 pt-4">
          <h1>Who are us?</h1>
          <p>
            We are a group of tech professionals from different segments of the
            IT market, united by the common cause of providing a teaching
            platform for Ukrainians to build or complement tech skills.
          </p>
          <p>
            {' '}
            Sheila Tavares is a high-profile tech professional with 15+ years of
            experience in well-known educational institutions and edtech
            startups. She is passionate about making the process of tech
            learning more comprehensible and accessible to a broader audience by
            employing elements of Instructional Design and incorporating all the
            stages related to the talent development. Currently based in Brazil,
            Sheila strongly believes everyone has a special talent to be
            unfolded or streamlined, so education is not only a source of
            individual development, but a factor of community transformation in
            a global scale.
          </p>
        </div>
      </div> */}
    </div>
  );
};

export default About;
