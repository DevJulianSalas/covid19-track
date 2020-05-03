const insertCovData = {
  body: {
    type: 'array',
    items: {
      type: 'object',
      required: [
        'id_de_caso', 
        'codigo_divipola', 
        'ciudad_de_ubicaci_n', 
        'departamento', 
        'edad', 
        'sexo', 
        'estado',
        'tipo',
        'pa_s_de_procedencia',
        'fis',
        'fecha_de_notificaci_n',
        'fecha_diagnostico',
        'fecha_recuperado',
        'fecha_de_muerte',
        'fecha_reporte_web'
      ],
      properties: {
        id_de_caso: { type: 'string' },
        codigo_divipola: { type: 'string' },
        ciudad_de_ubicaci_n: { type: 'string' },
        departamento: { type: 'string' },
        atenci_n: { type: 'string' },
        edad: { type: 'string' },
        sexo: { type: 'string' },
        estado: { type: 'string' },
        tipo: { type: 'string' },
        pa_s_de_procedencia: { type: 'string' },
        fis: { type: 'string' },
        fecha_de_notificaci_n: { type: 'string' },
        fecha_diagnostico: { type: 'string' },
        fecha_recuperado: { type: 'string' },
        fecha_de_muerte: { type: 'string' },
        fecha_reporte_web: { type: 'string' }
      }
    }
  }
}

const insertCities = {
  body: {
    type: 'array'
  }
}

module.exports = { insertCovData, insertCities }