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