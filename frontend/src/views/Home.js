import React, { useState, useEffect, useCallback } from 'react';
import TabLayout from '@enact/sandstone/TabLayout';
import { Tab } from '@enact/sandstone/TabLayout';
import Media from './Media';
import Detail from './Detail';
import Button from '@enact/sandstone/Button';
import $L from '@enact/i18n/$L';
import './Home.css'; // CSS 파일 가져오기

const Home = ({ 
    user_id, 
    navigateToSystemState, 
    navigateToLogin, 
    navigateToHLSVideo, 
    navigateToVideo 
}) => {
    const [currentVideoSrc, setCurrentVideoSrc] = useState('');
    const [currentVideoId, setCurrentVideoId] = useState('');
    const [currentVideoTitle, setCurrentVideoTitle] = useState('');
    const [videoSources, setVideoSources] = useState([]);
    const [PopularVideoSources, setPopularVideoSources] = useState([]);
    const [likedVideoSources, setLikedVideoSources] = useState([]);
    const [categoryVideos, setCategoryVideos] = useState([]);
    const [selectedTab, setSelectedTab] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const backendUri = process?.env?.REACT_APP_BACKEND_URI || 'http://localhost:8080';

    const fetchVideos = async () => {
        try {
            const response = await fetch(
                `${backendUri}/videos`
            );
            const data = await response.json();
            setVideoSources(data);
        } catch (error) {
            console.error('Error fetching videos:', error);
        }
    };

    const fetchPopularVideos = async () => {
        try {
            const response = await fetch(
                `${backendUri}/videos?order_by=likes`
            );
            const data = await response.json();
            setPopularVideoSources(data);
        } catch (error) {
            console.error('Error fetching popular videos:', error);
        }
    };

    const fetchLikedVideos = async () => {
        try {
            const response = await fetch(
                `${backendUri}/videos/liked`
            );
            const data = await response.json();
            setLikedVideoSources(data);
        } catch (error) {
            console.error('Error fetching liked videos:', error);
        }
    };

    const fetchCategoryVideos = async (category) => {
        try {
            const response = await fetch(
                `${backendUri}/videos?category=${category}`
            );
            const data = await response.json();
            setCategoryVideos(data);
        } catch (error) {
            console.error('Error fetching category videos:', error);
        }
    };

    const handleVideoSelect = (video) => {
        setCurrentVideoSrc(video ? video.url : '');
        setCurrentVideoId(video ? video.video_id : '');
        setCurrentVideoTitle(video ? video.title : '');
        navigateToHLSVideo(video);
    };

    const handleKeyPress = (event, src) => {
        if (event.key === 'Enter') {
            handleVideoSelect(src);
        }
    };

    useEffect(() => {
        if (selectedTab === '') {
            fetchVideos();
        } else if (selectedTab === '좋아한 동영상') {
            fetchLikedVideos();
        } else if (selectedTab === '사랑받는 동영상') {
            fetchPopularVideos();
        } else {
            fetchCategoryVideos(selectedTab);
        }
    }, [selectedTab]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

	return (
		<>
			{currentVideoSrc === '' ? (
				<>
					<div className="pt-8">
						<img
							src="https://i.ibb.co/yXsCgqb/logo.png"
							alt="킹받챠"
							border="0"
							width="300"
							height="200"
							className="mx-auto mb-4"
						/>
					</div>
					<div className="h-screen flex flex-col">
						{/* 버튼 추가 */}
						<div className="flex justify-end px-4 mb-4">
							<Button
								onClick={navigateToSystemState}
								type="button"
								className="usage-button"
							>
								{$L('시스템 사용량')}
							</Button>
							<Button
								onClick={navigateToLogin}
								type="button"
								className="logout-button ml-2"
							>
								{$L('로그아웃')}
							</Button>
						</div>
						<TabLayout orientation="horizontal" className="flex-grow">
							<Tab
								title="인기 동영상"
								onTabClick={() => setSelectedTab('Most Viewed')}
							>
								<div className="justify-center grid grid-cols-4 gap-4 overflow-y-auto max-h-full px-4">
									{videoSources.map((video, index) => (
										<div key={index}>
											<Media
												onClick={() => handleVideoSelect(video)}
												onKeyDown={event => handleKeyPress(event, video)}
												idx={video.video_id}
												src={video.url}
												thumbSrc={video.thumb}
												name={video.title}
											/>
										</div>
									))}
								</div>
							</Tab>
							<Tab
								title="사랑받는 동영상"
								onTabClick={() => setSelectedTab('사랑받는 동영상')}
							>
								<div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-full px-4">
									{PopularVideoSources.map((video, index) => (
										<div key={index}>
											<Media
												onClick={() => handleVideoSelect(video)}
												onKeyDown={event => handleKeyPress(event, video)}
												idx={video.video_id}
												src={video.url}
												thumbSrc={video.thumb}
												name={video.title}
											/>
										</div>
									))}
								</div>
							</Tab>
							<Tab
								title="좋아한 동영상"
								onTabClick={() => setSelectedTab('좋아한 동영상')}
							>
								<div className="grid grid-cols-4 gap-4 overflow-y-auto max-h-full px-4">
									{likedVideoSources.map((video, index) => (
										<div key={index}>
											<Media
												onClick={() => handleVideoSelect(video)}
												onKeyDown={event => handleKeyPress(event, video)}
												idx={video.video_id}
												src={video.url}
												thumbSrc={video.thumb}
												name={video.title}
											/>
										</div>
									))}
								</div>
							</Tab>
						</TabLayout>
					</div>
				</>
			) : (
				<Detail
					name={currentVideoTitle}
					src={currentVideoSrc}
					video_id={currentVideoId}
					onBack={() => handleVideoSelect('')}
					user_id=""
				/>
			)}
		</>
	);
};

export default Home;
