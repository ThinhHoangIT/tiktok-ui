import { useEffect, useState } from 'react';

import Video from '~/components/Video/Video';
import * as videoService from '~/services/videoService';

function Home() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        videoService
            .getVideos()
            .then((data) => {
                setVideos(data);
            })
            .catch((error) => console.log(error));
    }, []);
    return (
        <div>
            {videos.map((data) => (
                <Video key={data.id} data={data}></Video>
            ))}
        </div>
    );
}

export default Home;
