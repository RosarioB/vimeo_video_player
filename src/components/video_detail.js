import React from 'react';

const VideoDetail = ({ video }) => {
    if (!video) {
        return <div>Loading...</div>;
    }

    const url= video.player_embed_url;
        return (
            <div className='video-detail col-md-8'>
                <div className='embed-responsive embed-responsive-16by9'>
                    <iframe className='embed-responsive-item' src={url}></iframe>
                </div>
                <div className='details'>
                    <div>{video.name}</div>
                    <div>{video.description}</div>
                </div>
            </div>
        );
};

export default VideoDetail;