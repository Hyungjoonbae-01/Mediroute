import { Elysia, t } from 'elysia'
import { supabase } from '../utils/db'

export const patientPlugin = new Elysia({ prefix: '/patients' })
  .get('/', async () => {
    const { data, error } = await supabase.from('patients').select()

    if (error) {
      console.error('Error fetching patients:', error)
      return new Response('Error fetching patients', { status: 500 })
    }

    return data
  })
  .post(
    '/',
    async ({ body, set }) => {
      const {
        age,
        gender,
        symptoms,
        consciousness,
        pupils,
        skinCondition,
        heartRate,
        bloodPressure,
        oxygenSaturation,
        comments,
      } = body

      const { data, error } = await supabase
        .from('patients')
        .insert([
          {
            age_range: age,
            gender,
            symptoms: symptoms.join(', '),
            consciousness,
            pupils,
            skin_condition: skinCondition,
            heart_rate: heartRate,
            blood_pressure: bloodPressure,
            oxygen_saturation: oxygenSaturation,
            comments,
          },
        ])
        .select()

      if (error) {
        console.error('Error inserting patient data:', error)
        set.status = 500
        return { message: 'Error inserting patient data' }
      }

      return data
    },
    {
      body: t.Object({
        age: t.String(),
        gender: t.String(),
        symptoms: t.Array(t.String()),
        consciousness: t.String(),
        pupils: t.String(),
        skinCondition: t.String(),
        heartRate: t.String(),
        bloodPressure: t.String(),
        oxygenSaturation: t.String(),
        comments: t.String(),
      }),
    }
  )
