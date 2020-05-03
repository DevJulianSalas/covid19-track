const insertMeta = {
  body: {
    type: 'object',
    required: [
      'id', 
      'name', 
      'attributionLink', 
      'category', 
      'createdAt', 
      'metadataUpdatedAt', 
      'domain',
      'dataUri',
      'provenance'
    ],
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      attributionLink: { type: 'string' },
      category: { type: 'string' },
      createdAt: { type: 'string' },
      metadataUpdatedAt: { type: 'string' },
      dataUri: { type: 'string' },
      domain: { type: 'string' },
      provenance: { type: 'string' },
    }
  }
}

module.exports = { insertMeta }