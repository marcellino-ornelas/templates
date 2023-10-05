import { useEffect, useState } from 'react';

interface useTypeProps {
	start?: boolean;
	slash?: boolean;
	animation?: boolean;
	delay?: number;
	interval?: number;
	onEnd?: () => void;
}

export const useType = (
	word: string,
	{
		animation = true,
		start = null,
		interval = 100,
		slash = false,
		delay = null,
		debug = false,
		// eslint-disable-next-line @typescript-eslint/no-empty-function
		onEnd = () => {},
	}: useTypeProps = {},
) => {
	const [output, setOutput] = useState('');
	const [startAnimation, setStartAnimation] = useState(false);
	const [index, setIndex] = useState(0);
	const [end, setEnd] = useState(false);

	const isWordOver = index >= word.length;
	const isWordOverAndOne = index > word.length;

	useEffect(() => {
		if (animation && !delay) setStartAnimation(start);
	}, [start, animation]);

	useEffect(() => {
		if (!animation) return;
		if (!start) return;

		const id = setTimeout(() => {
			setStartAnimation(true);
		}, delay || 0);

		return () => {
			clearTimeout(id);
		};
	}, [start, animation]);

	useEffect(() => {
		if (index === word.length + 1) setEnd(true);
		if (isWordOverAndOne || !startAnimation) return;

		const id = setInterval(() => {
			if (isWordOver) {
				setIndex(index + 1);
				return clearInterval(id);
			}

			const singleChar = word[index];

			setOutput(output + singleChar);

			setIndex(index + 1);
		}, interval);

		return () => {
			clearInterval(id);
		};
	}, [output, index, startAnimation]);

	useEffect(() => {
		if (end) {
			onEnd();
		}
	}, [end]);

	return {
		started: animation ? startAnimation : true,
		ended: animation ? end : true,
		output: animation ? output : word,
	};
};
