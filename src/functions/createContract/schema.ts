export default {
  type: "object",
  properties: {
    userId: { type: 'string' },
    contractName: { type: 'string' },
    templateId: { type: 'string' },
  },
  required: ['userId', 'contractName', 'templateId']
} as const;