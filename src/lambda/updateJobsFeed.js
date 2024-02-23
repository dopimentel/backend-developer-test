const aws = require('aws-sdk');
const jobsModel = require('../models/jobsModel');

aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS,
    region: process.env.AWS_REGION,
});

const s3 = new aws.S3();
const S3_BUCKET = process.env.AWS_BUCKET_NAME;
const FEED_FILE_KEY = 'data.json';
console.log('S3_BUCKET:', S3_BUCKET);

const handler = async (_event, _context) => {
    try {
        const jobs = await jobsModel.findByStatusWithCompanyName('published');
        console.log(jobs);
        await s3.putObject({
            Bucket: S3_BUCKET,
            Key: FEED_FILE_KEY,
            Body: JSON.stringify(jobs),
        }).promise();
        console.log('Feed updated successfully');
        return { statusCode: 200, body: 'Feed updated successfully' };
    } catch (error) {
        console.error('Error getting jobs:', error);
        return { statusCode: 500, body: 'Internal Server Error' };
    }
    };

// handler();

module.exports = { handler };
