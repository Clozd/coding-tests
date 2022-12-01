const express = require('express');
const CompanyService = require('./CompanyService');
const app = express();
const port = 8080;
const db = require('./db');

app.use(express.json());
app.use(express.urlencoded());

/**
 * GET /companies
 * Fetches all companies in the database
 */
 app.get('/companies', (req, res) => {
	const sql = `
		SELECT * FROM companies;
	`;
	const params = [];

	db.all(sql, params, (err, rows) => {
		if (err) {
			res.status(400).json({
				error: err.message
			});
			return;
		}
		
		res.send({
			message: 'success',
			data: rows
		});
	});
});

/**
 * GET /companies/:id
 * Fetches data for a single company
 */
 app.get('/companies/:id', async (req, res) => {
	const companyId = Number(req.params.id);
	try {
		const data = await CompanyService.getFullCompany(companyId);
		res.send({
			message: 'success',
			data
		});
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

/**
 * PUT /companies/:id
 * Updates the company's name
 */
 app.put('/companies/:id', async (req, res) => {
	const companyId = Number(req.params.id);
	try {
		const data = await CompanyService.updateCompany(companyId, req.body);
		res.send({
			message: 'success',
			data
		});
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});


app.listen(port, () => {
	console.log(`Example app listening on port ${port}`)
});