import React, { useEffect, useState } from 'react';
import './Searchfeed.css';
import { API_KEY } from '../../data';
import { Link } from 'react-router-dom';
import moment from 'moment';

const Searchfeed = ({ searchText }) => {
  const [searchData, setSearchData] = useState(null);
  const fetchSearchData = async () => {
    const searchDataUrl = `https://content-youtube.googleapis.com/youtube/v3/search?part=snippet&q=${searchText}&maxResults=100&key=${API_KEY}`;
    await fetch(searchDataUrl)
      .then((res) => res.json())
      .then((data) => setSearchData(data.items));
  };
  useEffect(() => {
    fetchSearchData();
  }, [searchText]);
  return (
    <>
      {searchData &&
        searchData.map((item, index) => {
          return (
            <Link to={`video/${item.id}/${item.id.videoId}`}>
              <div key={index} className="video-thumbnail">
                <img
                  className="thumbnail-image"
                  src={item.snippet.thumbnails.medium.url}
                  alt={item.snippet.title}
                />
                <div className="video-details">
                  <div className="video-title">{item.snippet.title}</div>
                  <div className="views-and-time">
                    {moment(item.snippet.publishTime).fromNow()}
                  </div>
                  <div className="channel-info">
                    <img src={item.snippet.thumbnails.medium.url} alt={'tte'} />
                    <div>{item.snippet.channelTitle}</div>
                  </div>
                  <div className="channel-info">{item.snippet.description}</div>
                  <div className="views-and-time">
                    {item.snippet.liveBroadcastContent == 'live' && (
                      <span className="live-badge">LIVE</span>
                    )}
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default Searchfeed;
