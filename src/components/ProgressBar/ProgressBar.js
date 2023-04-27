import React, { useState, useEffect } from 'react';
import styles from './ProgressBar.module.css';
import P from 'prop-types';
import { useAuthentication } from '../../hooks/useAuthentication';
import { useFetchDocuments } from '../../hooks/useFetchDocuments';

import { useNavigate, Link } from 'react-router-dom';
import { useFetchSavedPath } from '../../hooks/useFetchSavedPath';

const ProgressBar = () => {
  const [style, setStyle] = useState({});
  const { auth } = useAuthentication();
  const [user, setUser] = useState(null);

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
    sectionIds.includes(item.sectionId),
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
    setTimeout(() => {
      const newStyle = {
        opacity: 1,
        width: `${progressUser < 10 ? 10 : progressUser}%`,
      };

      setStyle(newStyle);
    }, 200);
  }, [progressUser]);

  useEffect(() => {
    let progressUser = Math.round(
      (totalLessonsCompleted / totalLessonsCourse) * 100,
    );
    setProgress(progressUser.toString());
  }, [totalLessonsCompleted, totalLessonsCourse]);

  return (
    <div className={styles.progress}>
      <div className={styles.progressDone} style={style}>
        {progressUser}%
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  done: P.string,
};

export default ProgressBar;
