const aws = require('aws-sdk');
const jobsModel = require('../models/jobsModel');
const { sendMessageToSQS } = require('./sqsService');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
    region: process.env.AWS_REGION,
});

// const sqs = new aws.SQS({ apiVersion: '2012-11-05' });

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: 'data.json',
};

const findAll = async (status) => {
    if (status === 'published') {
        console.log('Fetching from S3');
        const data = await s3.getObject(params).promise();
        const jsonString = data.Body.toString('utf-8');
        if (!jsonString.trim()) {
            console.error('Conteúdo do arquivo JSON está vazio ou inválido.');
            return { status: 'ERROR', message: 'Conteúdo do arquivo JSON inválido.' };
        }
        const jobs = JSON.parse(jsonString);
        
        return { status: 'SUCCESSFUL', message: jobs };
    }
    const jobs = await jobsModel.findAll();    

    return { status: 'SUCCESSFUL', message: jobs };
};

const create = async (job) => {
    const newJob = await jobsModel.create(job);
    await sendMessageToSQS(newJob);
    return { status: 'SUCCESSFUL', message: newJob };
};

const publish = async (id) => {
    const job = await jobsModel.publish(id);
    await sendMessageToSQS(job);
    return { status: 'SUCCESSFUL', message: job };
};

module.exports = {
    findAll,
    create,
};
