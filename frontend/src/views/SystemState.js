// This is subscribe APIs.
import {useEffect, useRef, useState} from 'react';
import debugLog from '../libs/log';
import {getMemoryInfo, getCpuInfo} from '../libs/services';
import RenderingGraph from './RenderingGraph';
import BodyText from '@enact/sandstone/BodyText';
import RenderingLoading from './RenderingLoading';
import RenderingMemoryGraph from './RenderingMemoryGraph';
import Checkbox from '@enact/sandstone/Checkbox';
import Button from '@enact/sandstone/Button'; // Button 컴포넌트 추가
import './SystemState.css'; // CSS 파일 가져오기

const USER = 0;
const NICE = 1;
const SYSTEM = 2;
const IDLE = 3;

const SystemState = ({navigateToHome}) => { // navigateToHome prop 추가
	const cpuRef = useRef(null);
	const memRef = useRef(null);
	const [curCpu, setCurCpu] = useState([]);
	const [curMem, setCurMem] = useState([]);
	const [loading, setLoading] = useState(true); // 사용량 알 수 있을 때까지 1초 기다린 뒤, true로 set 됨

	const [burstFlag, setBurstFlag] = useState(false);
	const [idx, setIdx] = useState(0);

	const [cpuStat, setCpuStat] = useState({stat: [], returnValue: false});
	const [memoryStat, setMemoryStat] = useState({returnValue: false});

	useEffect(() => {
		if (!cpuRef.current) {
			debugLog('GET_CONFIGS[R]', {});
			cpuRef.current = getCpuInfo({
				parameters: {
					subscribe: true
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					setCpuStat(res);
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

		if (!memRef.current) {
			debugLog('GET_CONFIGS[R]', {});
			memRef.current = getMemoryInfo({
				parameters: {
					subscribe: true
				},
				onSuccess: res => {
					debugLog('GET_CONFIGS[S]', res);
					setMemoryStat(res);
				},
				onFailure: err => {
					debugLog('GET_CONFIGS[F]', err);
				}
			});
		}

		let newCur = cpuStat.stat.slice(0, 5).map((element, index) => {
			return element.split(/\s+/).slice(1, 5);
		});

		setCurCpu(newCur); // cur 상태 업데이트
		setCurMem([memoryStat.usable_memory, memoryStat.swapUsed]);

		return () => {
			if (cpuRef.current) {
				cpuRef.current.cancel();
				cpuRef.current = null;
			}

			if (memRef.current) {
				memRef.current.cancel();
				memRef.current = null;
			}
		};
	}, [cpuStat, memoryStat]);

	return (
		<div>
			{/* 시스템 상태 그래프 렌더링 */}
			<RenderingGraph cpuUsage={curCpu} />
			<RenderingMemoryGraph memoryUsage={curMem} />

			{/* '비디오 리스트' 버튼 추가 */}
			<div className="flex justify-center mt-4">
				<Button
					onClick={navigateToHome}
					type="button"
					className="video-list-button"
				>
					비디오 리스트
				</Button>
			</div>
		</div>
	);
};

export default SystemState;
