import React, { useEffect, useState } from 'react';
import './Feed.css';
import thumbnail1 from '../../assets/thumbnail1.png';
import thumbnail2 from '../../assets/thumbnail2.png';
import thumbnail3 from '../../assets/thumbnail3.png';
import thumbnail4 from '../../assets/thumbnail4.png';
import thumbnail5 from '../../assets/thumbnail5.png';
import thumbnail6 from '../../assets/thumbnail6.png';
import thumbnail7 from '../../assets/thumbnail7.png';
import thumbnail8 from '../../assets/thumbnail8.png';
import { API_KEY, valueConverter } from '../../data';
import { Link } from 'react-router-dom';
import moment from 'moment';
const Feed = ({ category }) => {
  const [data, setData] = useState([]);
  const fetchData = async () => {
    const videoList_url = `https://www.googleapis.com/youtube/v3/videos?regionCode=IN&part=snippet%2CcontentDetails%2Cstatistics&videoCategoryId=${category}&chart=mostPopular&maxResults=50&key=${API_KEY}`;
    try {
      const response = await fetch(videoList_url);

      if (!response.ok) {
        const errorDetails = await response.text(); // Get detailed error response
        console.error('Error response:', errorDetails);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setData(data?.items);
    } catch (error) {
      console.error('Error fetching videos:', error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [category]);
  return (
    <div className="feed">
      {data &&
        data.map((item, index) => {
          return (
            <Link
              to={`video/${item?.snippet.categoryId}/${item.id}`}
              className="card"
              key={index}
            >
              <img src={item.snippet.thumbnails.medium.url} alt="" />
              <h2>{item.snippet.title}</h2>
              <h3>{item.snippet.channelTitle}</h3>
              <p>
                {valueConverter(item.statistics.viewCount)} views &bull;{' '}
                {moment(item.snippet.publishedAt).fromNow()}
              </p>
            </Link>
          );
        })}
    </div>
  );
};

export default Feed;
