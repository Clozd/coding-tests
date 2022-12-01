const db = require('./db');


module.exports = {
	async getCompany(companyId) {
		return new Promise((res, rej)=>{
			const sql = `
				SELECT * FROM companies WHERE id = $1;
			`;
			let params = [companyId];

			db.all(sql, params, (err, rows) => {
				if (err) {
					return rej(err);
				}
				
				return res(rows[0]);
			});	
		})
	},

	async getFullCompany(companyId) {
		const data = await this.getCompany(companyId);
		const departments = await this.getCompanyDepartments(companyId);
		const employees = await this.getCompanyEmployees(companyId);
		for (let e of employees) {
			let dep = departments.find(d => d.id === e.department_id);
			if (dep.employees) {
				dep.employees.push(e);
			}
			else dep.employees = [e];
		}
		data.departments = departments;
		return data;
	},

	async getCompanyDepartments(companyId) {
		return new Promise((res, rej)=>{
			const sql = `
				SELECT * FROM departments WHERE company_id = $1;
			`;
			let params = [companyId];

			db.all(sql, params, (err, rows) => {
				if (err) {
					return rej(err);
				}
				
				return res(rows);
			});	
		})
	},

	async getCompanyEmployees(companyId) {
		return new Promise((res, rej)=>{
			const sql = `
				SELECT e.*
				FROM departments d
					join employees e on d.id = e.department_id
				WHERE d.company_id = $1;
			`;
			let params = [companyId];

			db.all(sql, params, (err, rows) => {
				if (err) {
					return rej(err);
				}
				
				return res(rows);
			});	
		})
	},
	
	async updateCompany(companyId, data) {
		const {
			name,
			industry,
			segment,
			region
		} = data;

		console.log(name)

		return new Promise((res, rej)=>{
			const sql = `
				UPDATE companies
				SET name = ?, industry = ?, segment = ?, region = ?
				WHERE id = ?;
			`;
			let params = [name, industry, segment, region, companyId];

			db.run(sql, params, async (err) => {
				if (err) {
					console.log(err);
					return rej(err);
				}

				res(null);
			});	
		})
	},
}
