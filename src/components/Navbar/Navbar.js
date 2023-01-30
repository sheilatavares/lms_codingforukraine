import { NavLink } from 'react-router-dom';

import { useAuthentication } from '../../hooks/useAuthentication';
import { useAuthValue } from '../../context/AuthContext';
import styles from './Navbar.module.css';
import logo from './cfu_logo.png';
import logoMedium from './coding_w_out_bird_medium.png';

import P from 'prop-types';
import { useLocation } from 'react-router-dom';
import LessonsSidebar from './LessonsSidebar';
import { logoMain } from './logo-cfu-navmain';

const Navbar = () => {
  const { user } = useAuthValue();
  const { logout } = useAuthentication();
  const location = useLocation();

  if (!location.pathname.includes('lesson')) {
    return (
      <nav className="navbar navbar-expand-lg nav_main bg-white shadow">
        <div className="container">
          <NavLink to="/" className="navbar-brand py-0">
            {/* <img src={logoMedium} className={styles.logo}></img> */}
            <div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                xmlSpace="preserve"
                width="110"
                height="70"
                style={{
                  shapeRendering: 'geometricPrecision',
                  textRendering: 'geometricPrecision',
                  imageRendering: 'optimizeQuality',
                  fillRule: 'evenodd',
                  clipRule: 'evenodd',
                }}
                viewBox="0 0 11.4998 5.89143"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <defs>
                  <style
                    type="text/css"
                    dangerouslySetInnerHTML={{
                      __html:
                        '\n   \n    .fil1 {fill:#0076BF}\n    .fil2 {fill:#FFD726}\n    .fil0 {fill:#0076BF;fill-rule:nonzero}\n   \n  ',
                    }}
                  />
                </defs>
                <g id="Layer_x0020_1">
                  <metadata id="CorelCorpID_0Corel-Layer" />
                  <path
                    className="fil1"
                    d="M5.1988 1.62984c-0.0902421,0 -0.161266,0.0302136 -0.213062,0.0906407 -0.051796,0.0604271 -0.0776894,0.143225 -0.0776894,0.248384 0,0.104371 0.0241319,0.186964 0.0723957,0.247781 0.0482638,0.0608258 0.12065,0.091234 0.217178,0.091234 0.0368885,0 0.0718024,-0.0031428 0.104769,-0.00941914 0.0329577,-0.00627634 0.0651367,-0.0141287 0.0965277,-0.0235386l0 0.0918181c-0.031391,0.0117647 -0.0637646,0.0203958 -0.097121,0.0258934 -0.0333471,0.00548832 -0.0731745,0.00824175 -0.119482,0.00824175 -0.0855325,0 -0.156946,-0.0176609 -0.214239,-0.0529734 -0.0572843,-0.0353125 -0.100245,-0.0855418 -0.128892,-0.150678 -0.0286468,-0.0651274 -0.0429702,-0.141649 -0.0429702,-0.229536 0,-0.0847537 0.0155008,-0.159504 0.0465024,-0.224252 0.0309923,-0.0647381 0.0767067,-0.115357 0.137134,-0.151847 0.0604271,-0.0364899 0.133806,-0.0547349 0.220126,-0.0547349 0.0886753,0 0.165975,0.0164742 0.2319,0.049432l-0.0423769 0.0894633c-0.0259026,-0.0117647 -0.0547441,-0.0223612 -0.0865245,-0.0317803 -0.0317803,-0.00941914 -0.0665088,-0.0141287 -0.104176,-0.0141287zm0.887828 0.442607c0,0.10438 -0.0264867,0.185203 -0.0794601,0.242497 -0.0529641,0.0572843 -0.124581,0.0859311 -0.214823,0.0859311 -0.0557176,0 -0.105353,-0.0127566 -0.148908,-0.0382606 -0.0435543,-0.025504 -0.0778933,-0.0627819 -0.102999,-0.111824 -0.0251146,-0.0490518 -0.0376673,-0.108496 -0.0376673,-0.178343 0,-0.104371 0.0262827,-0.184804 0.0788668,-0.24131 0.0525748,-0.0565056 0.123988,-0.0847537 0.214239,-0.0847537 0.0572843,0 0.107708,0.0127474 0.151263,0.0382514 0.0435543,0.025504 0.0776894,0.0623925 0.102405,0.110656 0.0247252,0.0482638 0.0370832,0.107319 0.0370832,0.177156zm-0.476742 0c0,0.0745558 0.0147128,0.133611 0.0441476,0.177165 0.0294255,0.0435543 0.0763173,0.0653314 0.140666,0.0653314 0.0635607,0 0.110258,-0.0217771 0.140082,-0.0653314 0.0298149,-0.0435543 0.0447317,-0.102609 0.0447317,-0.177165 0,-0.0745466 -0.0149167,-0.133018 -0.0447317,-0.175394 -0.0298242,-0.0423769 -0.0769106,-0.0635607 -0.141259,-0.0635607 -0.0643487,0 -0.111046,0.0211838 -0.140082,0.0635607 -0.0290362,0.0423769 -0.0435543,0.100848 -0.0435543,0.175394zm0.833687 0.328428c-0.0784774,0 -0.141259,-0.0272747 -0.188346,-0.0818149 -0.0470864,-0.0545402 -0.070625,-0.135956 -0.070625,-0.244258 0,-0.108292 0.0237333,-0.190107 0.0712091,-0.245435 0.0474851,-0.0553189 0.110462,-0.082983 0.188939,-0.082983 0.0486532,0 0.0884806,0.0090205 0.119473,0.0270708 0.0310016,0.0180503 0.0563109,0.0400221 0.0759279,0.0659247l0.00706436 0c-0.000788019,-0.0102072 -0.0021601,-0.0253093 -0.00412551,-0.045325 -0.00195614,-0.0200064 -0.00293885,-0.0359058 -0.00293885,-0.0476705l0 -0.251906 0.103592 0 0 0.894624 -0.0835763 0 -0.0153061 -0.0847537 -0.00470957 0c-0.0188383,0.0266814 -0.0439436,0.0494412 -0.0753346,0.0682702 -0.031391,0.0188383 -0.0718117,0.0282574 -0.121244,0.0282574zm0.0164742 -0.0859311c0.0667035,0 0.113595,-0.018245 0.140666,-0.0547441 0.02708,-0.0364899 0.0406154,-0.0916141 0.0406154,-0.165382l0 -0.0188383c0,-0.0784774 -0.0129513,-0.138701 -0.0388447,-0.180688 -0.0258934,-0.0419875 -0.0737678,-0.0629766 -0.143614,-0.0629766 -0.0557176,0 -0.0975011,0.0221665 -0.12536,0.0665088 -0.0278588,0.044333 -0.0417928,0.103787 -0.0417928,0.178333 0,0.0753346 0.013934,0.133806 0.0417928,0.175394 0.0278588,0.0415981 0.0700317,0.0623925 0.126537,0.0623925zm0.506427 -0.793396c0.0156955,0 0.0296295,0.00529363 0.0417928,0.0158902 0.0121633,0.0105965 0.018245,0.0272747 0.018245,0.0500253 0,0.0219811 -0.00608165,0.0384553 -0.018245,0.0494412 -0.0121633,0.0109859 -0.0260973,0.0164835 -0.0417928,0.0164835 -0.0172622,0 -0.0317803,-0.00549759 -0.0435543,-0.0164835 -0.0117647,-0.0109859 -0.0176516,-0.0274601 -0.0176516,-0.0494412 0,-0.0227506 0.00588696,-0.0394287 0.0176516,-0.0500253 0.0117739,-0.0105965 0.026292,-0.0158902 0.0435543,-0.0158902zm0.0506186 0.2366l0 0.630953 -0.103583 0 0 -0.630953 0.103583 0zm0.473479 -0.0117647c0.0753346,0 0.13223,0.018245 0.170685,0.0547349 0.0384553,0.0364899 0.0576737,0.095545 0.0576737,0.177156l0 0.410827 -0.102405 0 0 -0.403762c0,-0.101228 -0.0470864,-0.151847 -0.141259,-0.151847 -0.0698463,0 -0.11811,0.019617 -0.144791,0.0588511 -0.0266814,0.0392433 -0.0400221,0.0957489 -0.0400221,0.169517l0 0.327241 -0.103583 0 0 -0.630953 0.0835763 0 0.0152968 0.0859404 0.00588696 0c0.020405,-0.032967 0.0486625,-0.0574883 0.0847537,-0.0735731 0.0361005,-0.0160941 0.0741665,-0.0241319 0.114189,-0.0241319zm0.617084 0c0.0415888,0 0.0790615,0.0078431 0.112409,0.0235386 0.0333564,0.0156955 0.0618085,0.0396327 0.0853471,0.0718117l0.00588696 0 0.0141287 -0.0835856 0.0823989 0 0 0.641549c0,0.0902421 -0.0229545,0.158123 -0.0688636,0.203643 -0.045909,0.0455197 -0.117127,0.0682795 -0.213655,0.0682795 -0.0925968,0 -0.16833,-0.01335 -0.22719,-0.0400314l0 -0.095341c0.0620032,0.0329577 0.139693,0.049432 0.233077,0.049432 0.0541508,0 0.0967223,-0.0158902 0.127724,-0.0476705 0.0309923,-0.0317803 0.0464931,-0.0751399 0.0464931,-0.130069l0 -0.0247252c0,-0.00941914 0.000389374,-0.0229545 0.00117739,-0.0406061 0.000788019,-0.0176609 0.00156677,-0.0300189 0.00235479,-0.0370832l-0.00470957 0c-0.0423769,0.0635607 -0.107514,0.0953503 -0.195401,0.0953503 -0.0816202,0 -0.145385,-0.0286468 -0.191294,-0.0859311 -0.045909,-0.0572936 -0.0688543,-0.137338 -0.0688543,-0.240142 0,-0.100449 0.0229453,-0.180299 0.0688543,-0.239548 0.045909,-0.0592497 0.109284,-0.08887 0.190116,-0.08887zm0.0141194 0.0871085c-0.0525748,0 -0.0933849,0.0209891 -0.122421,0.0629766 -0.0290362,0.0419875 -0.0435543,0.101821 -0.0435543,0.179511 0,0.0776894 0.0143234,0.137143 0.0429702,0.178343 0.0286375,0.0411995 0.0704303,0.0617992 0.12536,0.0617992 0.0635699,0 0.109868,-0.0170676 0.138905,-0.0512119 0.0290362,-0.0341351 0.0435543,-0.0892593 0.0435543,-0.165382l0 -0.0247252c0,-0.0863205 -0.0149075,-0.14812 -0.0447317,-0.185398 -0.0298242,-0.0372779 -0.076512,-0.0559122 -0.140082,-0.0559122zm1.05263 0.00470957l-0.158911 0 0 0.550899 -0.103592 0 0 -0.550899 -0.110647 0 0 -0.0482638 0.110647 -0.0353125 0 -0.0364992c0,-0.0816109 0.0180503,-0.140277 0.0541508,-0.175978 0.0361005,-0.0357112 0.0863205,-0.0535575 0.150669,-0.0535575 0.0251146,0 0.0480691,0.00215083 0.0688636,0.00647102 0.0207944,0.0043202 0.03865,0.00922445 0.0535667,0.0147128l-0.02708 0.0812216c-0.0125527,-0.00392155 -0.0270708,-0.0078431 -0.0435543,-0.0117647 -0.0164742,-0.00393082 -0.0333471,-0.00588696 -0.0506186,-0.00588696 -0.0345245,0 -0.0602232,0.01157 -0.077096,0.0347192 -0.0168729,0.0231585 -0.0253093,0.0594537 -0.0253093,0.108886l0 0.0411995 0.158911 0 0 0.0800534zm0.63239 0.234246c0,0.10438 -0.0264867,0.185203 -0.0794601,0.242497 -0.0529641,0.0572843 -0.124581,0.0859311 -0.214823,0.0859311 -0.0557176,0 -0.105353,-0.0127566 -0.148908,-0.0382606 -0.0435543,-0.025504 -0.0778933,-0.0627819 -0.102999,-0.111824 -0.0251146,-0.0490518 -0.0376673,-0.108496 -0.0376673,-0.178343 0,-0.104371 0.0262827,-0.184804 0.0788668,-0.24131 0.0525748,-0.0565056 0.123988,-0.0847537 0.214239,-0.0847537 0.0572843,0 0.107708,0.0127474 0.151263,0.0382514 0.0435543,0.025504 0.0776894,0.0623925 0.102405,0.110656 0.0247252,0.0482638 0.0370832,0.107319 0.0370832,0.177156zm-0.476742 0c0,0.0745558 0.0147128,0.133611 0.0441476,0.177165 0.0294255,0.0435543 0.0763173,0.0653314 0.140666,0.0653314 0.0635607,0 0.110258,-0.0217771 0.140082,-0.0653314 0.0298149,-0.0435543 0.0447317,-0.102609 0.0447317,-0.177165 0,-0.0745466 -0.0149167,-0.133018 -0.0447317,-0.175394 -0.0298242,-0.0423769 -0.0769106,-0.0635607 -0.141259,-0.0635607 -0.0643487,0 -0.111046,0.0211838 -0.140082,0.0635607 -0.0290362,0.0423769 -0.0435543,0.100848 -0.0435543,0.175394zm0.904312 -0.326064c0.0117739,0 0.0245213,0.000584061 0.0382606,0.00176145 0.0137301,0.00117739 0.0256987,0.00294812 0.0358966,0.0053029l-0.012942 0.095341c-0.0102072,-0.00235479 -0.0213878,-0.00431093 -0.0335511,-0.00587769 -0.0121633,-0.00157604 -0.0237425,-0.00235479 -0.0347284,-0.00235479 -0.0321697,0 -0.0623833,0.00882581 -0.0906407,0.0264774 -0.0282482,0.0176609 -0.0508133,0.0423861 -0.0676862,0.0741665 -0.0168729,0.0317803 -0.0253093,0.0688636 -0.0253093,0.11124l0 0.33666 -0.103583 0 0 -0.630953 0.0847537 0 0.0117647 0.115366 0.00470957 0c0.020405,-0.0345338 0.0466971,-0.0643487 0.078876,-0.0894633 0.0321697,-0.0251146 0.0702356,-0.0376673 0.114179,-0.0376673z"
                  />
                  <path
                    className="fil1"
                    d="M2.79405 3.91584c0,0.117693 -0.025847,0.223853 -0.0775318,0.318489 -0.051694,0.0946271 -0.129624,0.169378 -0.233801,0.224242 -0.104167,0.0548739 -0.235775,0.0823062 -0.394825,0.0823062 -0.225837,0 -0.397606,-0.0576459 -0.515299,-0.172956 -0.117693,-0.11531 -0.176535,-0.267593 -0.176535,-0.456856l0 -1.09739 0.360236 0 0 1.04253c0,0.139961 0.0286283,0.238566 0.0858755,0.295822 0.0572565,0.0572565 0.142344,0.0858848 0.255272,0.0858848 0.117693,0 0.203179,-0.0310201 0.256458,-0.0930418 0.0532793,-0.062031 0.0799144,-0.15905 0.0799144,-0.291048l0 -1.04015 0.360236 0 0 1.10217zm0.695366 -0.400786c0,0.0493022 -0.00199322,0.0982057 -0.0059704,0.14672 -0.00397718,0.0485049 -0.00834373,0.0974084 -0.0131182,0.146711l0.00477447 0c0.0238538,-0.0333935 0.0485049,-0.0671948 0.0739532,-0.101386 0.0254484,-0.0342 0.052482,-0.0664068 0.0811103,-0.0966204l0.365001 -0.396021 0.400796 0 -0.517691 0.565399 0.548702 0.737168 -0.410335 0 -0.374541 -0.527231 -0.152681 0.12167 0 0.405561 -0.355461 0 0 -1.81309 0.355461 0 0 0.811122zm1.8023 -0.32445c0.017494,0 0.0381679,0.00079729 0.062031,0.0023826 0.0238538,0.00159458 0.0429331,0.00397718 0.0572472,0.00715706l-0.0262364 0.33399c-0.0111342,-0.00317989 -0.0274323,-0.00596113 -0.0489035,-0.00834373 -0.0214712,-0.00239187 -0.0401611,-0.00357853 -0.0560699,-0.00357853 -0.0604364,0 -0.118481,0.0107356 -0.174152,0.0322068 -0.0556619,0.0214712 -0.100588,0.0560606 -0.134788,0.103777 -0.0341907,0.0477076 -0.0512861,0.112918 -0.0512861,0.195623l0 0.663206 -0.355461 0 0 -1.30257 0.269577 0 0.052482 0.219486 0.0166967 0c0.0381772,-0.0668054 0.0906592,-0.124053 0.157455,-0.17177 0.0667962,-0.0477169 0.143939,-0.0715706 0.231409,-0.0715706zm0.840881 -0.0023826c0.174949,0 0.30894,0.0377693 0.401982,0.113317 0.0930418,0.0755478 0.139563,0.191248 0.139563,0.347108l0 0.868378 -0.248105 0 -0.069188 -0.176535 -0.00953966 0c-0.0556619,0.0699761 -0.114513,0.120873 -0.176535,0.152681 -0.062031,0.0318081 -0.147118,0.0477076 -0.255272,0.0477076 -0.116098,0 -0.21232,-0.0337921 -0.288656,-0.101386 -0.0763451,-0.0675935 -0.114513,-0.171371 -0.114513,-0.311332 0,-0.138367 0.0485049,-0.24055 0.145524,-0.306549 0.097019,-0.0660082 0.242543,-0.102192 0.436572,-0.108552l0.226634 -0.00715706 0 -0.0572565c0,-0.0683908 -0.0178927,-0.118481 -0.053678,-0.150289 -0.0357761,-0.0318174 -0.0854861,-0.0477169 -0.149102,-0.0477169 -0.0636163,0 -0.125638,0.00914102 -0.186074,0.0274323 -0.0604364,0.0182913 -0.120873,0.0409584 -0.181309,0.0679921l-0.116896 -0.240948c0.0699761,-0.0365826 0.147508,-0.0652109 0.232595,-0.0858848 0.0850875,-0.0206739 0.173753,-0.0310109 0.265998,-0.0310109zm0.0500994 0.730002c-0.114513,0.00318916 -0.194029,0.0238631 -0.238566,0.062031 -0.0445277,0.0381679 -0.0667962,0.0882674 -0.0667962,0.150298 0,0.0540674 0.0159087,0.0926432 0.0477169,0.1157 0.0318081,0.0230658 0.073156,0.0345894 0.124053,0.0345894 0.0763358,0 0.140749,-0.0226579 0.193231,-0.0679828 0.0524913,-0.0453343 0.0787277,-0.109349 0.0787277,-0.192045l0 -0.107356 -0.138367 0.0047652zm0.986414 -1.21429c0.0524913,0 0.0978163,0.0123209 0.135984,0.0369813 0.0381679,0.0246511 0.0572565,0.0703747 0.0572565,0.137171 0,0.0652109 -0.0190886,0.110536 -0.0572565,0.135984 -0.0381679,0.0254484 -0.0834929,0.0381679 -0.135984,0.0381679 -0.0540674,0 -0.0998003,-0.0127195 -0.137171,-0.0381679 -0.0373799,-0.0254484 -0.0560606,-0.0707734 -0.0560606,-0.135984 0,-0.0667962 0.0186807,-0.11252 0.0560606,-0.137171 0.0373706,-0.0246604 0.0831035,-0.0369813 0.137171,-0.0369813zm0.176544 0.510525l0 1.30257 -0.355461 0 0 -1.30257 0.355461 0zm1.06275 -0.0238538c0.139952,0 0.252083,0.0377693 0.336373,0.113317 0.0842902,0.0755478 0.126435,0.196819 0.126435,0.363814l0 0.84929 -0.355461 0 0 -0.761022c0,-0.0938391 -0.0166967,-0.164214 -0.0500902,-0.211133 -0.0334027,-0.0469103 -0.0866821,-0.0703747 -0.159838,-0.0703747 -0.108153,0 -0.182106,0.0369813 -0.221869,0.110934 -0.0397625,0.0739532 -0.0596391,0.180113 -0.0596391,0.31848l0 0.613116 -0.355461 0 0 -1.30257 0.271959 0 0.0477169 0.166995 0.0190793 0c0.0413571,-0.0667962 0.0982149,-0.115301 0.170574,-0.145524 0.0723679,-0.0302136 0.149102,-0.045325 0.230222,-0.045325zm1.31563 0c0.179715,0 0.322059,0.0512954 0.427032,0.153877 0.104964,0.102581 0.157446,0.248504 0.157446,0.437768l0 0.17176 -0.83975 0c0.00318916,0.100199 0.0330041,0.178927 0.0894633,0.236183 0.0564592,0.0572565 0.134788,0.0858848 0.234987,0.0858848 0.0842995,0 0.160635,-0.008353 0.229026,-0.0250497 0.0683908,-0.0166967 0.139164,-0.0425437 0.21232,-0.0775318l0 0.274342c-0.0636163,0.0318174 -0.130811,0.0552726 -0.201584,0.070384 -0.0707734,0.0151021 -0.156259,0.0226579 -0.256458,0.0226579 -0.130412,0 -0.245723,-0.0242524 -0.345922,-0.0727573 -0.100199,-0.0485141 -0.178917,-0.122069 -0.236174,-0.220673 -0.0572565,-0.0986043 -0.0858848,-0.222666 -0.0858848,-0.372167 0,-0.152681 0.025847,-0.279515 0.0775318,-0.380502 0.0516848,-0.100996 0.123654,-0.176943 0.215899,-0.22783 0.0922445,-0.0508967 0.199601,-0.0763451 0.322068,-0.0763451zm0.0023826 0.25288c-0.0683908,0 -0.125249,0.0222685 -0.170574,0.0667962 -0.045325,0.044537 -0.0719693,0.113716 -0.0799236,0.207555l0.498603 0c-0.00158531,-0.079525 -0.0222685,-0.145125 -0.0620217,-0.196819 -0.0397625,-0.0516848 -0.101793,-0.0775318 -0.186084,-0.0775318z"
                  />
                  <polygon
                    className="fil1"
                    points="11.2005,3.23295 11.2005,0.299336 5.82172,0.299262 5.82164,4.6354e-005 11.2005,0 11.4592,0 11.4998,1.85416e-005 11.4998,3.23291 "
                  />
                  <polygon
                    className="fil2"
                    points="0.299299,2.65845 0.299345,5.5921 5.67814,5.59214 5.67821,5.89139 0.299345,5.89143 0.040671,5.89143 0,5.89141 7.41665e-005,2.65852 "
                  />
                </g>
              </svg>
            </div>
          </NavLink>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div
            className="collapse navbar-collapse flex-grow-1 text-right"
            id="navbarSupportedContent"
          >
            <ul className="navbar-nav mb-2 mb-lg-0 ms-auto flex-nowrap">
              {!user && (
                <li className="nav-item px-3">
                  <NavLink
                    to="/"
                    className={
                      ('nav-link',
                      ({ isActive }) => (isActive ? styles.active : ''))
                    }
                  >
                    Home
                  </NavLink>
                </li>
              )}

              {!user && (
                <>
                  <li className="nav-item px-3">
                    <NavLink
                      to="/login"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item px-3">
                    <NavLink
                      to="/register"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      Register
                    </NavLink>
                  </li>
                </>
              )}
              {user && (
                <>
                  <li className="nav-item px-3">
                    <NavLink
                      to="/myhome"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      My Home
                    </NavLink>
                  </li>
                  <li className="nav-item px-3">
                    <NavLink
                      to="/posts/create"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      Create Lesson
                    </NavLink>
                  </li>
                  <li className="nav-item px-3">
                    <NavLink
                      to="/dashboard"
                      className={
                        ('nav-link',
                        ({ isActive }) => (isActive ? styles.active : ''))
                      }
                    >
                      Dashboard
                    </NavLink>
                  </li>
                </>
              )}
              <li className="nav-item px-3">
                <NavLink
                  to="/about"
                  className={
                    ('nav-link',
                    ({ isActive }) => (isActive ? styles.active : ''))
                  }
                >
                  About
                </NavLink>
              </li>
              {user && (
                <li className="nav-item px-3">
                  <button onClick={logout}>Logout</button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    );
  } else {
    const idModuleP = location.pathname.split('/')[3];
    const idSectionP = location.pathname.split('/')[4];
    return (
      <LessonsSidebar moduleNumber={idModuleP} sectionNumber={idSectionP} />
    );
  }
};

Navbar.propTypes = {
  props: P.string,
};

export default Navbar;
