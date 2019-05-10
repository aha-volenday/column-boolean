import React from 'react';

export default props => {
	const { defaultValue = 'all', editable = false, id, onChange, ...defaultProps } = props;

	return {
		...defaultProps,
		Cell: ({ value }) => {
			const icon = value ? { symbol: 'check', color: '#55b65c' } : { symbol: 'times', color: '#dc3545' };
			return (
				<div style={{ textAlign: 'center' }}>
					<i class={`fa fa-${icon.symbol}-circle`} style={{ color: `${icon.color}` }} />
				</div>
			);
		}
		// Filter: ({ filter, onChange }) => {
		// 	return <span>jerome</span>;
		// }
	};
};

// function ColumnBoolean(columnProps) {
// 	const { booleanProps, Menu, page, ...defaultProps } = columnProps;
// 	return {
// 		...defaultProps,
// 		Cell: props => {
// 			if (booleanProps && booleanProps.customAction) {
// 				return <Menu value={props.value} menuProps={booleanProps} page={page} formId={props.original.Id} />;
// 			} else {
// 				let icon = props.value ? { symbol: 'check', color: '#55b65c' } : { symbol: 'times', color: '#dc3545' };
// 				return (
// 					<center>
// 						<i
// 							class={`fa fa-${icon.symbol}-circle boolean ${props.value}`}
// 							style={{ color: `${icon.color}` }}
// 						/>
// 					</center>
// 				);
// 			}
// 		}
// 	};
// }
