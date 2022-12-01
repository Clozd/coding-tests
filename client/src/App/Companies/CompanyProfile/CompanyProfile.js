import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './CompanyProfile.css';

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

const CompanyProfile = () => {
	const { companyId } = useParams();
	const [company, setCompany] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [newName, setNewName] = useState("");
	const nameInput = useRef();

	// fetch the company data from the backend
	useEffect(() => {
		getCompany();
	}, []);

	const getCompany = async () => {
		const response = await fetch('/companies/'+companyId);
		const { message, data } = await response.json();
		if (message === 'success') {
			setCompany(data);
			setNewName(data.name);
			console.log(data)
		}
	}

	const updateName = (event) => {
		setNewName(event.target.value);
	}

	const startEdit = () => {
		setIsEditing(true);
	};

	const saveEdit = async () => {
		const { id, industry, segment, region } = company;
		console.log(id)
		const response = await fetch('/companies/'+id, {
			method: 'PUT',
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				name: newName,
				region,
				industry,
				segment
			})
		})
		const { message, data } = await response.json();
		if ( message === 'success') {
			setIsEditing(false);
			getCompany();
		}
	};

	const cancelEdit = () => {
		setNewName(company.name);
		setIsEditing(false);
	};

	if (!company) {
		return <div>Loading...</div>
	}

	return (
		<div className="company">
			<div className='name-wrapper'>
				<input ref={nameInput} disabled={!isEditing} value={newName} onChange={updateName} />
				{ isEditing ? 
					<>
						<a className='button' onClick={saveEdit}>Save</a>
						<a className='button' onClick={cancelEdit}>Cancel</a>
					</>
				:
					<>
						<a className='button' onClick={startEdit}>Edit</a>
					</>
				}
			</div>
			<div className="company-data"><span className="label">Industry</span>{company.industry}</div>
			<div className="company-data"><span className="label">Segment</span>{company.segment}</div>
			<div className="company-data"><span className="label">Region</span>{company.region}</div>

			<h3>Departments</h3>
			<div className="departments">
			{ company.departments?.map((d => (
				<details>
					<summary>{d.name} ({d.employees.length})<span className="expander" /></summary>
					<content>
						<table>
							<tr>
								<th></th>
								<th>Name</th>
								<th>Title</th>
								<th>Country</th>
							</tr>
							{ d.employees?.map(e => (
								<tr>
									<td style={{width: '2em'}}><img className='avatar' src={e.avatar} /></td>
									<td className='name'>{e.name}</td>
									<td>{e.title}</td>
									<td>{e.country}</td>
								</tr>
							))}
						</table>
					</content>
				</details>
			))) }
			</div>
		</div>
	);
};

export default CompanyProfile;
