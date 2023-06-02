import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';
import P from 'prop-types';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import { useNavigate, Link } from 'react-router-dom';
import { useFetchSavedPath } from '../../hooks/useFetchSavedPath';

function ProgressBarCircle({ strokeWidth }) {
  strokeWidth.toString();
  const [style, setStyle] = useState({});
  const { auth } = useAuthentication();
  const [user, setUser] = useState(null);
  const [radius, setRadius] = useState(50 - strokeWidth / 2);
  const [diameter, setDiameter] = useState(Math.PI * 2 * radius);
  const [pathDescription, setPathDescription] = useState(`
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `);
  const [progressStyle, setProgressStyle] = useState({
    stroke: '#005BBB',
    strokeLinecap: 'round',
    strokeDasharray: `${diameter}px ${diameter}px`,
  });

  //progress information
  let userId = auth?.currentUser?.uid;
  const { documents: sections } = useFetchDocuments('sections');
  const { documents: lessons } = useFetchDocuments('posts');
  const { documents: usersPath } = useFetchSavedPath('usersPath', userId);
  const [progress, setProgress] = useState(0);

  // LEsson total
  const lessonsIdsTotal = lessons?.filter(
    (obj) => obj && !obj.quiz && obj.sectionId !== 'F0bt7WvKdHrIGOpkpNtB',
  );

  // Users sections completed
  const sectionIds = usersPath
    ?.filter(
      (obj) => obj && !obj.isQuiz && obj.sectionId !== 'F0bt7WvKdHrIGOpkpNtB',
    )
    ?.map((obj) => obj.sectionId);

  //lessons completed
  const lessonsIdsCompleted = lessonsIdsTotal?.filter((item) =>
    sectionIds?.includes(item.sectionId),
  );

  // Quiz total
  const quizIdsTotal = lessons?.filter((obj) => obj && obj.quiz);

  // Users quiz completed
  const quizIdsCompleted = usersPath
    ?.filter(
      (obj) => obj && obj.isQuiz && obj.sectionId !== 'F0bt7WvKdHrIGOpkpNtB',
    )
    ?.map((obj) => obj.sectionId);

  const totalLessonsCourse = lessonsIdsTotal?.length + quizIdsTotal?.length;
  const totalLessonsCompleted =
    lessonsIdsCompleted?.length + quizIdsCompleted?.length;

  let progressUser = Math.round(
    (totalLessonsCompleted / totalLessonsCourse) * 100,
  );

  useEffect(() => {
    setDiameter(Math.PI * 2 * radius);
    setPathDescription(`
      M 50,50 m 0,-${radius}
      a ${radius},${radius} 0 1 1 0,${2 * radius}
      a ${radius},${radius} 0 1 1 0,-${2 * radius}
    `);
  }, [radius]);

  useEffect(() => {
    let progressUser = Math.round(
      (totalLessonsCompleted / totalLessonsCourse) * 100,
    );
    setProgress(progressUser.toString());
  }, [totalLessonsCompleted, totalLessonsCourse, progressUser]);

  useEffect(() => {
    setProgressStyle((prevStyle) => ({
      ...prevStyle,
      strokeDashoffset: `${((100 - progressUser) / 100) * diameter}px`,
    }));
    setProgress(progressUser.toString());
    strokeWidth.toString();
    setDiameter(diameter.toString());
    setRadius(radius.toString());
    setPathDescription(pathDescription.toString());
  }, [diameter, strokeWidth, radius, pathDescription, progressUser]);

  return (
    <svg
      className={'CircularProgressbar'}
      viewBox="0 0 100 100"
      width={100}
      height={100}
    >
      <path
        className="CircularProgressbar-trail"
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={{
          stroke: '#d6d6d6',
        }}
      />

      <path
        className={styles.CircularProgressbarPath}
        d={pathDescription}
        strokeWidth={strokeWidth}
        fillOpacity={0}
        style={progressStyle}
      />

      <text
        className={styles.fadeInUpAnimation}
        x={50}
        y={50}
        style={{
          fill: '#005BBB',
          fontSize: '24px',
          dominantBaseline: 'central',
          textAnchor: 'middle',
        }}
      >
        {`${progressUser}%`}
      </text>
    </svg>
  );
}

ProgressBarCircle.propTypes = {
  strokeWidth: P.string,
};

export default ProgressBarCircle;
