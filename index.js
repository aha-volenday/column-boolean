import React from 'react';
import Checkbox from 'rc-checkbox';
import Select from 'react-select';
import { keyBy } from 'lodash';

export default props => {
	const { defaultValue = 'all', editable = false, id, onChange, ...defaultProps } = props;

	const options = [
		{ label: 'All', value: 'all' },
		{ label: <i class="fa fa-check-circle" style={{ color: '#55b65c' }} />, value: true },
		{ label: <i class="fa fa-times-circle" style={{ color: '#dc3545' }} />, value: false }
	];
	const optionsObj = keyBy(options, 'value');

	return {
		...defaultProps,
		Cell: ({ original, value }) => {
			if (editable) {
				return (
					<div style={{ textAlign: 'center' }}>
						<Checkbox
							checked={value}
							onChange={e => onChange({ Id: original.Id, [id]: e.target.checked })}
						/>
					</div>
				);
			} else {
				const icon = value ? { symbol: 'check', color: '#55b65c' } : { symbol: 'times', color: '#dc3545' };
				return (
					<div style={{ textAlign: 'center' }}>
						<i class={`fa fa-${icon.symbol}-circle`} style={{ color: `${icon.color}` }} />
					</div>
				);
			}
		},
		Filter: ({ filter, onChange }) => {
			return (
				<Select
					isClearable
					value={
						filter
							? optionsObj[filter.value]
								? optionsObj[filter.value]
								: optionsObj[defaultValue]
							: optionsObj[defaultValue]
					}
					onChange={e => onChange(e ? (e.value != 'all' ? e.value : '') : '')}
					options={options}
				/>
			);
		}
	};
};
