//DEFAULT LANGUAGE SETTINGS
const defaultLanguage = {
  nativeLang: 'en',
  learningLang: 'es',
  learningLangCode: 'es-419'
}

//ACTION TYPES
const SET_LANGUAGE = 'SET_LANGUAGE'

//ACTION CREATORS
export const setLanguage = language => {
  return {
    type: SET_LANGUAGE,
    language
  }
}

//REDUCER
export default function(state = defaultLanguage, action) {
  switch(action.type) {
    case SET_LANGUAGE:
      return action.language
    default:
      return state
  }
}
