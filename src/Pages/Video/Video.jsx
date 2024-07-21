import React from 'react';
import './Video.css';
import Recommended from '../../Components/Recommended/Recommended';
import { useParams } from 'react-router-dom';
import Playvideo from '../../Components/Playvideo/Playvideo';
const Video = () => {
  const { videoId, categoryId } = useParams();
  return (
    <div className="play-container">
      <Playvideo />
      <Recommended categoryId={categoryId} />
    </div>
  );
};
export default Video;
