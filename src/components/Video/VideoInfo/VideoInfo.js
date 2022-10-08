import { faMusic } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import styles from './VideoInfo.module.scss';
import Button from '~/components/Button';
import Image from '~/components/Image';
import { Wrapper as PopperWrapper } from '~/components/Popper';
import AccountPreview from '~/components/SuggestedAccounts/AccountPreview';
import Tippy from '@tippyjs/react/headless';
import { Link } from 'react-router-dom';
const cx = classNames.bind(styles);
function VideoInfo({ data }) {
    const renderPreview = (props) => {
        return (
            <div tabIndex="-1" {...props}>
                <PopperWrapper>
                    <AccountPreview data={data.user} />
                </PopperWrapper>
            </div>
        );
    };
    return (
        <div>
            <div className={cx('wrapper')}>
                <div className={cx('content')}>
                    <Tippy interactive delay={[800, 0]} offset={[0, 5]} placement="bottom-start" render={renderPreview}>
                        <Image className={cx('avatar')} src={data.user.avatar} alt={data.user.nickname} />
                    </Tippy>
                    <div className={cx('info')}>
                        <Tippy
                            interactive
                            delay={[800, 0]}
                            offset={[-70, 32]}
                            placement="bottom-start"
                            render={renderPreview}
                        >
                            <Link to={`/@${data.nickname}`} className={cx('info-user')}>
                                <h3 className={cx('nickname')}>{data.user.nickname}</h3>
                                <h4 className={cx('name')}>{`${data.user.first_name} ${data.user.last_name}`}</h4>
                            </Link>
                        </Tippy>
                        <div>
                            <span>{data.description}</span>
                        </div>
                        <h4 className={cx('music')}>
                            <FontAwesomeIcon icon={faMusic} />
                            <span className={cx('music-name')}>{data.music || 'âm nhạc đang phát'}</span>
                        </h4>
                    </div>
                </div>

                <div>
                    <Button outline className={cx('btn-follow')}>
                        Follow
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default VideoInfo;
