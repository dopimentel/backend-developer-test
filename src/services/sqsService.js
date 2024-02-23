const AWS = require('aws-sdk');

const sqs = new AWS.SQS({
  region: process.env.AWS_REGION || 'us-east-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS,
});

const sendMessageToSQS = async (message) => {
  try {
    await sqs.sendMessage({
      QueueUrl: process.env.SQS_URL,
      MessageBody: JSON.stringify(message),
    }).promise();
  } catch (error) {
    console.error('Erro ao enviar mensagem para a fila SQS:', error);
    throw error;
  }
};

module.exports = {
  sendMessageToSQS,
};
