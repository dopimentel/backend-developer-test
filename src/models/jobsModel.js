const pool = require('./db');

const findAll = async (status) => {
    if (status) {
        const result = await pool.query('SELECT * FROM jobs WHERE status = $1', [status]);
        return result.rows;
    }
    const result = await pool.query('SELECT * FROM jobs');
    return result.rows;
};

const create = async (job) => {
    const { title, description, companyId, location } = job;
    const result = await pool.query(
        'INSERT INTO jobs (title, description, company_id, location) '
        + 'VALUES ($1, $2, $3, $4) RETURNING *',
        [title, description, companyId, location],
    );
    return result.rows[0];
};

module.exports = {
    findAll,
    create,
};

// create({ 
//     title: 'Desenvolvedor', 
//     description: 'Vaga para desenvolvedor', 
//     companyId: '535a0316-5530-40b9-80d3-3af4a8730a14', 
//     location: 'São Paulo' 
// });
