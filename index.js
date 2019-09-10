import React from 'react';
import { Checkbox, Radio } from 'antd';

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
			}

			const icon = value ? { symbol: 'check', color: '#55b65c' } : { symbol: 'times', color: '#dc3545' };
			return <i class={`fa fa-${icon.symbol}-circle`} style={{ color: `${icon.color}` }} />;
		},
		Filter: ({ filter, onChange }) => {
			return (
				<Radio.Group
					onChange={e => onChange(e.target.value)}
					value={typeof filter != 'undefined' ? filter.value : ''}>
					<Radio value="">All</Radio>
					<Radio value={true}>
						<i class="fa fa-check-circle" style={{ color: '#55b65c' }} />
					</Radio>
					<Radio value={false}>
						<i class="fa fa-times-circle" style={{ color: '#dc3545' }} />
					</Radio>
				</Radio.Group>
			);
		}
	};
};
