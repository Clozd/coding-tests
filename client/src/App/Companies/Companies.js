import React, { useEffect, useState } from 'react';
import './Companies.css';

const TableRow = ({
	className,
	onClick,
	name,
	segment,
	region,
	industry,
}) => (
	<div className={className} onClick={onClick}>
		<div className="companies_row-cell">{name}</div>
		<div className="companies_row-cell">{segment}</div>
		<div className="companies_row-cell">{region}</div>
		<div className="companies_row-cell">{industry}</div>
	</div>
);

const Companies = () => {
	const [companies, setCompanies] = useState([]);

	// fetch the company data from the backend
	useEffect(() => {
		async function getCompanies() {
			const response = await fetch('/companies');
			const { message, data } = await response.json();
			if (message === 'success') {
				setCompanies(data);
			}
		}
		getCompanies();
	}, []);

	return (
		<div className="companies">
			<TableRow
				className="companies_header"
				name="Name"
				segment="Segment"
				region="Region"
				industry="Industry"
			/>
			{companies.map(company => (
				<TableRow
					key={company.id}
					className="companies_row"
					onClick={() => console.log(`navigate to company page for ${company.name}`)}
					{...company}
				/>
			))}
		</div>
	);
};

export default Companies;
