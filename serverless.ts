import type { AWS } from '@serverless/typescript';

import createContract from '@functions/createContract';
import getContract from '@functions/getContract';
import getContractIds from '@functions/getContractIds';
import register from '@functions/register';
import login from '@functions/login';


const serverlessConfiguration: AWS = {
  service: 'contract-manager-api ',
  frameworkVersion: '3',
  plugins: [
    'serverless-esbuild',
    'serverless-offline',
  ],
  provider: {
    name: 'aws',
    runtime: 'nodejs14.x',
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
      NODE_OPTIONS: '--enable-source-maps --stack-trace-limit=1000',
    },
  },
  functions: {
    register,
    login,
    createContract,
    getContract,
    getContractIds
  },
  package: { individually: true },
  custom: {
    esbuild: {
      bundle: true,
      minify: false,
      sourcemap: true,
      exclude: ['aws-sdk'],
      target: 'node14',
      define: { 'require.resolve': undefined },
      platform: 'node',
      concurrency: 10,
    },
    // dynamodb: {
    //   start: {
    //     docker: true,
    //     port: 8000,
    //     inMemory: true,
    //     sharedDb: true,
    //     migrate: true,
    //     convertEmptyValues: true,
    //     create: [{
    //       TableName: 'contracts',
    //       AttributeDefinitions: [
    //         {
    //           AttributeName: 'contractId',
    //           AttributeType: 'S',
    //         },
    //       ],
    //       KeySchema: [
    //         {
    //           AttributeName: 'contractId',
    //           KeyType: 'HASH',
    //         },
    //       ],
    //     }]
    //   },
    //   stages: [
    //     'dev'
    //   ],
    // }
  },
  // resources: {
  //   Resources: {
  //     contacts: {
  //       Type: 'AWS::DynamoDB::Table',
  //       DeletionPolicy: 'Retain',
  //       Properties: {
  //         TableName: 'contracts',
  //         AttributeDefinitions: [
  //           {
  //             AttributeName: 'contractId',
  //             AttributeType: 'S',
  //           },
  //         ],
  //         KeySchema: [
  //           {
  //             AttributeName: 'contractId',
  //             KeyType: 'HASH',
  //           },
  //         ],
  //         ProvisionedThroughput: {
  //           ReadCapacityUnits: 1,
  //           WriteCapacityUnits: 1,
  //         },
  //       },
  //     },
  //   },
  // },
};

module.exports = serverlessConfiguration;
