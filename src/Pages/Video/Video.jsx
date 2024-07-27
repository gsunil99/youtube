import React, { useEffect } from 'react';
import './Video.css';
import Recommended from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';
import Playvideo from '../../Components/Playvideo/Playvideo';
const Video = () => {
  const { videoId, categoryId } = useParams();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div
      className={`play-container ${
        categoryId == 'norecommended' ? 'no-flex' : ''
      }`}
    >
      <Playvideo />
      {categoryId == 'norecommended' ? (
        <></>
      ) : (
        <Recommended categoryId={categoryId} />
      )}
    </div>
  );
};
export default Video;
