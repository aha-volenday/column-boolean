import React, { memo, Suspense } from 'react';
import { Checkbox, Radio, Skeleton } from 'antd';

const browser = typeof process.browser !== 'undefined' ? process.browser : true;

export default ({ editable = false, id, onChange, ...defaultProps }) => {
	return {
		...defaultProps,
		Cell: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Cell {...props} other={{ editable, id, onChange }} />
				</Suspense>
			) : null,
		Filter: props =>
			browser ? (
				<Suspense fallback={<Skeleton active={true} paragraph={null} />}>
					<Filter {...props} />
				</Suspense>
			) : null
	};
};

const Cell = memo(({ other: { editable, id, onChange }, row: { original }, value }) => {
	if (typeof value === 'undefined') return null;

	if (editable)
		return <Checkbox checked={value} onChange={e => onChange({ Id: original.Id, [id]: e.target.checked })} />;

	const icon = value ? { symbol: 'check', color: '#55b65c' } : { symbol: 'times', color: '#dc3545' };
	return <i class={`fa fa-${icon.symbol}-circle`} style={{ color: `${icon.color}` }} />;
});

const Filter = memo(({ column: { filterValue, setFilter } }) => {
	return (
		<Radio.Group
			onChange={e => setFilter(e.target.value)}
			value={typeof filterValue !== 'undefined' ? filterValue : ''}>
			<Radio value="">All</Radio>
			<Radio value={true}>
				<i class="fa fa-check-circle" style={{ color: '#55b65c' }} />
			</Radio>
			<Radio value={false}>
				<i class="fa fa-times-circle" style={{ color: '#dc3545' }} />
			</Radio>
		</Radio.Group>
	);
});
