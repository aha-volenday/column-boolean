import React from 'react';
import Checkbox from 'rc-checkbox';
import Select from 'react-select';
import { keyBy } from 'lodash';

export default props => {
	const {
		defaultValue = 'all',
		editable = false,
		headerStyle = {},
		id,
		onChange,
		style = {},
		...defaultProps
	} = props;

	const options = [
		{ label: 'All', value: 'all' },
		{ label: <i class="fa fa-check-circle" style={{ color: '#55b65c' }} />, value: true },
		{ label: <i class="fa fa-times-circle" style={{ color: '#dc3545' }} />, value: false }
	];
	const optionsObj = keyBy(options, 'value');

	return {
		...defaultProps,
		style: { ...style, display: 'flex', alignItems: 'center', justifyContent: 'center' },
		headerStyle: {
			...headerStyle,
			overflow: editable ? 'visible' : 'hidden',
			display: 'flex',
			alignItems: 'center'
		},
		Cell: ({ original, value }) => {
			if (editable) {
				return (
					<Checkbox checked={value} onChange={e => onChange({ Id: original.Id, [id]: e.target.checked })} />
				);
			} else {
				const icon = value ? { symbol: 'check', color: '#55b65c' } : { symbol: 'times', color: '#dc3545' };
				return <i class={`fa fa-${icon.symbol}-circle`} style={{ color: `${icon.color}` }} />;
			}
		},
		Filter: ({ filter, onChange }) => {
			return (
				<Select
					inputId={`${id}-filter`}
					value={
						filter
							? optionsObj[filter.value]
								? optionsObj[filter.value]
								: optionsObj[defaultValue]
							: optionsObj[defaultValue]
					}
					onChange={e => onChange(e ? (e.value != 'all' ? e.value : '') : '')}
					options={options}
					styles={{ container: (provided, state) => ({ ...provided, flex: 1 }) }}
				/>
			);
		}
	};
};
