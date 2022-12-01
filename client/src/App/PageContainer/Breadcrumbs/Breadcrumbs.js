import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import './Breadcrumbs.css';

const Breadcrumbs = () => {
	const location = useLocation();
	const params = useParams();

	const crumbs = [];

	const pathMatches = (regex) => {
		return regex.test(location.pathname);
	}

	switch (true) {
		case pathMatches(/\//):
		case pathMatches(/\/companies/):
			crumbs.push({
				name: 'Companies',
				destination: '/companies',
			});
			if (pathMatches(/\/companies\/[0-9]+/)) {
				crumbs.push({
					name: params.companyId,
					destination: location.pathname,
				});
			}
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