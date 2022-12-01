import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
	const location = useLocation();

	const crumbs = [];

	switch (location.pathname) {
		case '/':
		case '/companies':
			crumbs.push({
				name: 'Companies',
				destination: '/companies',
			});
			break;
		default:
			break;
	}

	return (
		<div className="breadcrumbs">
			<div className="breadcrumbs_crumb">/</div>
			{crumbs.map(crumb => (
				<div className="breadcrumbs_crumb" key={crumb.name}>
					<Link to={crumb.destination}>{crumb.name}</Link>
					/
				</div>
			))}
		</div>
	);
};

export default Breadcrumbs;