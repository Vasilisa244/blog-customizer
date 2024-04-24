import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { RadioGroup } from 'components/radio-group';
import { Select } from 'components/select';
import { Separator } from 'components/separator';
import { Text } from 'components/text';
import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import { useState, useRef, FormEvent } from 'react';
import clsx from 'clsx';

import styles from './ArticleParamsForm.module.scss';

interface ArticleParamsForm {
	articleParams: ArticleStateType;
	setArticleParams: (articleParams: ArticleStateType) => void;
}

export const ArticleParamsForm = ({
	articleParams,
	setArticleParams,
}: ArticleParamsForm) => {
	const [isActive, setIsActive] = useState(false);
	const asideRef = useRef<HTMLDivElement | null>(null);
	const [fontFamily, setFontFamily] = useState(articleParams.fontFamilyOption);
	const [fontSize, setFontSize] = useState(articleParams.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleParams.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleParams.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleParams.contentWidth);

	const handleClickOpen = () => {
		setIsActive(!isActive);
	};

	const handleFormApply = (event: FormEvent<HTMLFormElement>) => {
		const newArticleParams = {
			fontFamilyOption: fontFamily,
			fontSizeOption: fontSize,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		};
		event.preventDefault();
		setArticleParams(newArticleParams);
	};

	const handleFormReset = () => {
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
		setArticleParams(defaultArticleState);
	};

	useOutsideClickClose({
		isOpen: isActive,
		rootRef: asideRef,
		onChange: setIsActive,
	});

	return (
		<>
			<ArrowButton containerOpen={isActive} onClick={handleClickOpen} />
			<aside
				className={clsx(styles.container, isActive && styles.container_open)}
				ref={asideRef}>
				<form
					className={styles.form}
					onSubmit={handleFormApply}
					onReset={handleFormReset}>
					<Text size={31} weight={800} uppercase={true}>
						{'Задайте параметры'}
					</Text>
					<Select
						selected={fontFamily}
						options={fontFamilyOptions}
						title={'шрифт'}
						onChange={setFontFamily}
					/>
					<RadioGroup
						name={'FontSize'}
						selected={fontSize}
						options={fontSizeOptions}
						title={'размер шрифта'}
						onChange={setFontSize}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title={'цвет шрифта'}
						onChange={setFontColor}
					/>
					<Separator></Separator>
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title={'цвет фона'}
						onChange={setBackgroundColor}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title={'ширина контента'}
						onChange={setContentWidth}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
