import {useCallback, useEffect, useState, useRef} from 'react';
import LS2Request from '@enact/webos/LS2Request';
import ProgressBar from '@enact/sandstone/ProgressBar';

const getSysProcInfo = (
	set_cpu_util,
	set_mem_usage,
	cyclePrev,
	cyclePrevRun
) => {
	const set_cpu = res => {
		const cur_stat = JSON.stringify(res.stat[0]).split(' ').slice(1);
		const cycle_sum =
			Number(cur_stat[1]) +
			Number(cur_stat[2]) +
			Number(cur_stat[3]) +
			Number(cur_stat[4]);
		const cycle_run = cycle_sum - cur_stat[4];
		set_cpu_util(
			(cycle_run - cyclePrevRun.current) / (cycle_sum - cyclePrev.current)
		);

		cyclePrev.current = cycle_sum;
		cyclePrevRun.current = cycle_run;
	};
	const cpu_req = new LS2Request().send({
		service: 'luna://com.webos.memorymanager',
		method: 'getProcStat',
		onSuccess: set_cpu,
		onFailure: set_cpu
	});
	const set_mem = res => {
		const unitSum = JSON.parse(JSON.stringify(res))
			.unitList.slice(1)
			.map(e => e.split(' ').filter(x => x != '')[6])
			.reduce((a, c) => a + Number(c), 0);
		const memSum = Number(res.usable_memory);
		set_mem_usage(unitSum / (unitSum + memSum));
	};
	const mem_req = new LS2Request().send({
		service: 'luna://com.webos.memorymanager',
		method: 'getUnitList',
		onSuccess: set_mem,
		onFailure: set_mem
	});
};

const SysProcPop = () => {
	const [cpu_util, set_cpu_util] = useState(0);
	const [mem_usage, set_mem_usage] = useState(0);

	const cyclePrev = useRef(0);
	const cyclePrevRun = useRef(0);

	useEffect(() => {
		
		const fetchSysInfo = async () => {
			try {
				
				const sysInfo = await getSysProcInfo(
					set_cpu_util,
					set_mem_usage,
					cyclePrev,
					cyclePrevRun
				);
			} catch (error) {
				console.error('Error fetching system information:', error);
			}
		};

		
		fetchSysInfo();

		
		const intervalId = setInterval(fetchSysInfo, 1000);

		
		return () => clearInterval(intervalId);
	}, []);

	return (
		<div>
			<ProgressBar orientation="horizontal" progress={cpu_util} />
			<ProgressBar orientation="horizontal" progress={mem_usage} />
		</div>
	);
};

export default SysProcPop;