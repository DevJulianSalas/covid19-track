import db from '../services/firebase'

export async function getGeneralData () {
  try {
    const snap = await db.collection('covid-data').get()
    if (!snap.empty){
      console.log(snap.size)
    }
  } catch (error) {
    console.log(error)
  }
}


export async function getCities(){
  try {
    const snap = await db.collection('cities').get()
    if(!snap.empty){
      return snap.map(doc => doc.data())
    }
  } catch (error) {
    console.log(error)
    
  }
}

export async function getDataByCity(option){
  try {
    let allDataCity = {}
    const covRef = db.collection('covid-data')
    const snap = await covRef.where('ciudad_de_ubicaci_n', '==', `${option}`)
      .limit(2000)
      .get()
    
    if (!snap.empty) {
      allDataCity['infected'] = snap.size
    }
    const snapA = await covRef
      .where('ciudad_de_ubicaci_n', '==', `${option}`)
      .where('estado', '==', 'Fallecido')
      .limit(2000)
      .get()
    
    if (!snapA.empty){
      allDataCity['deceased'] = snapA.size
      
    }
    const snapB = await covRef
      .where('ciudad_de_ubicaci_n', '==', `${option}`)
      .where('atenci_n', '==', 'Recuperado')
      .limit(2000)
      .get()
    
    if (!snapB.empty){
      allDataCity['recover'] = snapB.size
    }
    const snapC = await covRef
      .where('ciudad_de_ubicaci_n', '==', `${option}`)
      .where('estado', '==', 'Leve')
      .limit(2000)
      .get()
    
    if (!snapC.empty){
      allDataCity['mild'] = snapC.size
    }
    return allDataCity
  } catch (error) {
    console.log(error)
  }

}