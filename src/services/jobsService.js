const aws = require('aws-sdk');
const jobsModel = require('../models/jobsModel');
const { sendMessageToSQS } = require('./sqsService');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

// const sqs = new aws.SQS({ apiVersion: '2012-11-05' });

const s3 = new aws.S3({ apiVersion: '2006-03-01' });

const params = {
  Bucket: process.env.AWS_BUCKET_NAME,
  Key: 'data.json',
};

const findAll = async (status) => {
    if (status) {
        const jobs = await jobsModel.findAll(status);
        return { status: 'SUCCESSFUL', message: jobs };
    }
    
    const data = await s3.getObject(params).promise();
    const jobs = JSON.parse(data.Body.toString('utf-8'));

    return { status: 'SUCCESSFUL', message: jobs };
};

const create = async (job) => {
    const newJob = await jobsModel.create(job);
    await sendMessageToSQS(newJob);
    return { status: 'SUCCESSFUL', message: newJob };
};

module.exports = {
    findAll,
    create,
};
