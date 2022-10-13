import { useState, useEffect, useRef } from 'react';
import useElementOnScreen from '~/hooks/useElementOnScreen';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames/bind';
import styles from './VideoContent.module.scss';
import { faComment, faHeart, faShare } from '@fortawesome/free-solid-svg-icons';
const cx = classNames.bind(styles);

function VideoContent({ data }) {
    const videoRef = useRef();
    const [playing, setPlaying] = useState(false);
    const handleVideo = () => {
        if (playing) {
            videoRef.current.pause();
            setPlaying(false);
        } else {
            videoRef.current.play();
            setPlaying(true);
        }
    };
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.3,
    };
    const isVisibile = useElementOnScreen(options, videoRef);

    useEffect(() => {
        if (isVisibile) {
            if (!playing) {
                videoRef.current.play();
                setPlaying(true);
            }
        } else {
            if (playing) {
                videoRef.current.pause();
                setPlaying(false);
            }
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isVisibile]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('video')}>
                <video ref={videoRef} onClick={handleVideo} src={data.file_url} loop />
                {/* controls */}
            </div>
            <div className={cx('content')}>
                <button className={cx('btn-icon')}>
                    <span className={cx('like-icon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faHeart} />
                    </span>
                    <strong className={cx('count')}>{data.likes_count}</strong>
                </button>
                <button className={cx('btn-icon')}>
                    <span className={cx('cmt-icon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faComment} />
                    </span>
                    <strong className={cx('count')}>{data.comments_count}</strong>
                </button>
                <button className={cx('btn-icon')}>
                    <span className={cx('share-icon')}>
                        <FontAwesomeIcon className={cx('icon')} icon={faShare} />
                    </span>
                    <strong className={cx('count')}>{data.shares_count}</strong>
                </button>
            </div>
        </div>
    );
}

export default VideoContent;
