const {
  db,
  Quest,
  PromptResponses,
  CharacterPrompts,
  UserQuests,
  Language,
  Prompt,
  Character,
  Scene,
  User,
  Response
} = require('./server/db')

const users = [
  {id: 1, name: 'sam', username: 'food', password: '123'},
  {id: 2, name: 'owen', username: 'sushi', password: '123'},
]

const characters = [
  {
    name: 'Octo',
    startingPromptId: 1
  }
]

const quests = [
  {id: 1, name: 'Buy an apple', text: 'Buy an apple', promptResponsesId: 11},
  {id: 2, name: 'Buy a pear', text: 'Buy a pear', promptResponsesId: 12}
]

let userQuests = []
users.forEach(user => {
  quests.forEach(quest => {
    userQuests.push({userId: user.id, questId: quest.id})
  })
})

const characterPrompts = [
  {characterId: 1, promptId: 1},
  {characterId: 1, promptId: 2},
  {characterId: 1, promptId: 3},
  {characterId: 1, promptId: 4},
  {characterId: 1, promptId: 5},
  {characterId: 1, promptId: 6},
  {characterId: 1, promptId: 7}
]

const prompts = [
  {id: 1, text: 'Do you want an apple?'},
  {id: 2, text: 'Do you want a pear?'},
  {id: 3, text: 'Bye!'},
  {id: 4, text: 'The best apple ever!'},
  {id: 5, text: 'Here is your apple'},
  {id: 6, text: 'Here is your pear'},
  {id: 7, text: 'I don\'t have time for this.'}
]

const responses = [
  {id: 1, text: 'Yes'},
  {id: 2, text: 'No'},
  {id: 3, text: 'What kind of apple?'},
  {id: 4, text: 'What kind of pear?'},
  {id: 5, text: 'Bye'},
  {id: 6, text: 'Okay I\'ll buy one.'},
  {id: 7, text: 'I don\'t believe you'},
  {id: 8, text: 'Impossible'},
  {id: 9, text: 'Thanks'}
]

const promptResponses = [
  {id: 1, promptId: 1, responseId: 1, nextPromptId: 5},
  {id: 2, promptId: 1, responseId: 2, nextPromptId: 2},
  {id: 3, promptId: 1, responseId: 3, nextPromptId: 4},
  {id: 4, promptId: 2, responseId: 1, nextPromptId: 6},
  {id: 5, promptId: 2, responseId: 2, nextPromptId: 3},
  {id: 6, promptId: 2, responseId: 4, nextPromptId: 7},
  {id: 7, promptId: 3, responseId: 5, nextPromptId: null},
  {id: 8, promptId: 4, responseId: 6, nextPromptId: 6},
  {id: 9, promptId: 4, responseId: 7, nextPromptId: 7},
  {id: 10, promptId: 4, responseId: 8, nextPromptId: 7},
  {id: 11, promptId: 5, responseId: 9, nextPromptId: 3},
  {id: 12, promptId: 6, responseId: 9, nextPromptId: 3},
  {id: 13, promptId: 7, responseId: 5, nextPromptId: null}
]

const languages = [
  {name: 'Spanish', code: 'es-419', google: 'es'},
  {name: 'French', code: 'fr-FR', google: 'fr'},
  {name: 'German', code: 'de-DE', google: 'de'}
]

function addPrompts(prompts) {
  return prompts.forEach((prompt) => {
    Prompt.create(prompt)
  })
}

function addResponses(responses) {
  return responses.forEach((response) => {
    Response.create(response)
  })
}

function addLanguages(languages) {
  return languages.forEach((language) => {
    Language.create(language)
  })
}

function addCharacters(characters) {
  return characters.forEach((character) => {
    Character.create(character)
  })
}

function addUsers(users) {
  return users.forEach((user) => {
    User.create(user)
  })
}

function addQuests(quests) {
  return quests.forEach((quest) => {
    Quest.create(quest)
  })
}

function addPromptResponses(promptResponses) {
  return Promise.all(promptResponses.map(promptResponse => PromptResponses.create(promptResponse)))
}

function addCharacterPrompts(characterPrompts) {
  return Promise.all(characterPrompts.map(characterPrompt => CharacterPrompts.create(characterPrompt)))
}

function addUserQuests(userQuests) {
  return Promise.all(userQuests.map(userQuest => UserQuests.create(userQuest)))
}

function seed(prompts, responses, promptResponses, languages, characterPrompts, characters, users, quests, userQuests) {
  return Promise.all([
    addLanguages(languages),
    addPrompts(prompts),
    addResponses(responses),
    addCharacters(characters),
    addUsers(users),
    addQuests(quests)
  ])
    .then(() => Promise.all([
      addUserQuests(userQuests),
      addPromptResponses(promptResponses),
      addCharacterPrompts(characterPrompts)
    ]))
}

db.sync({force: true})
  .then(() => {
    console.log('Seeding database')
    return seed(prompts, responses, promptResponses, languages, characterPrompts, characters, users, quests, userQuests)
  })
  .then(() => console.log('Seeding successful'))
  .catch(err => {
    console.error('Error while seeding')
    console.error(err.stack)
  })
  .finally(() => {
    db.close()
    return null
  })
