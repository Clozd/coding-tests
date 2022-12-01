import React from 'react';
import {
	Routes,
	Route,
} from 'react-router-dom';
import PageContainer from './PageContainer/PageContainer.js';
import Companies from './Companies/Companies.js';
import CompanyProfile from './Companies/CompanyProfile/CompanyProfile.js';

const App = () => {
	return (
			<Routes>
				<Route path="/" element={<PageContainer />}>
					<Route index element={<Companies />} />
					<Route path="companies" element={<Companies />} />
					<Route path="companies/:companyId" element={<CompanyProfile />} />
				</Route>
			</Routes>
	);
};

export default App;
