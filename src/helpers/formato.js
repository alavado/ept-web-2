import moment from 'moment'

export const formatearSexo = sexo => {
  return sexo === 'masculino' ? 'Hombre' : 'Mujer'
}

export const formatearEdad = fechaNacimiento => {
  return `${moment().diff(moment(fechaNacimiento), 'years')} años`
}

export const formatearLateralidad = (lateralidad, sexo) => {
  if (sexo === 'masculino') {
    return lateralidad === 'diestra' ? 'diestro' : 'zurdo'
  }
  else {
    return lateralidad === 'diestra' ? 'diestra' : 'zurda'
  }
}