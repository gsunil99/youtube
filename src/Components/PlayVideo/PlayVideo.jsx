import React, { useEffect, useState } from 'react';
import './Playvideo.css';
import like from '../../assets/like.png';
import dislike from '../../assets/dislike.png';
import share from '../../assets/share.png';
import save from '../../assets/save.png';
import { API_KEY, valueConverter } from '../../data';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
const Playvideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [commentData, setCommentData] = useState(null);
  const fetchVideoData = async () => {
    const videoDetailsUrl = `https://content-youtube.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    const commentDataUrl = `https://content-youtube.googleapis.com/youtube/v3/commentThreads?videoId=${videoId}&part=snippet%2Creplies&maxResults=50&key=${API_KEY}`;
    await fetch(videoDetailsUrl)
      .then((res) => res.json())
      .then((data) => setApiData(data.items[0]));
    await fetch(commentDataUrl)
      .then((res) => res.json())
      .then((data) => setCommentData(data.items));
  };
  const fetchChannelData = async () => {
    const channelDataUrl = `https://content-youtube.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
    await fetch(channelDataUrl)
      .then((res) => res.json())
      .then((data) => setChannelData(data.items[0]));
  };
  useEffect(() => {
    fetchVideoData();
  }, [videoId]);
  useEffect(() => {
    fetchChannelData();
  }, [apiData]);
  return (
    <div className="play-video">
      <iframe
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
        title="Create YouTube Clone Using React JS | Build Complete Website Like YouTube In React JS 2024"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerpolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
      <h3>{apiData ? apiData.snippet.title : 'Title here'}</h3>
      <div className="play-video-info">
        <p>
          {apiData ? valueConverter(apiData.statistics.viewCount) : '1K'} Views
          &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ''}
        </p>
        <div>
          <span>
            <img src={like} alt="" />
            {apiData ? valueConverter(apiData.statistics.likeCount) : '183'}
          </span>
          <span>
            <img src={dislike} alt="" />
          </span>
          <span>
            <img src={share} alt="" />
            Share
          </span>
          <span>
            <img src={save} alt="" /> Save
          </span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img
          src={channelData ? channelData.snippet.thumbnails.default.url : ''}
          alt=""
        />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span>
            {channelData
              ? valueConverter(channelData.statistics.subscriberCount)
              : '1M'}
          </span>
        </div>
        <button>Subscribe</button>
      </div>
      <div className="vid-description">
        <p>
          {apiData
            ? apiData.snippet.description.slice(0, 250)
            : 'Description Here'}
        </p>
        <hr />
        <h4>
          {apiData ? valueConverter(apiData.statistics.commentCount) : 102}{' '}
          Comments
        </h4>
        {commentData &&
          commentData.map((item, index) => {
            return (
              <div key={index} className="comment">
                <img
                  src={
                    item.snippet.topLevelComment.snippet.authorProfileImageUrl
                  }
                  alt=""
                />
                <div>
                  <h3>
                    {item.snippet.topLevelComment.snippet.authorDisplayName}{' '}
                    <span>1 day ago</span>
                  </h3>
                  <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                  <div className="comment-action">
                    <img src={like} alt="" />
                    <span>
                      {valueConverter(
                        item.snippet.topLevelComment.snippet.likeCount
                      )}
                    </span>
                    <img src={dislike} alt="" />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};
export default Playvideo;
