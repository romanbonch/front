import { createStore } from 'vuex'

export default createStore({
  state: {
    app: {
      popupError: {
        show: false,
        message: null
      },
      popupWarn: {
        show: false,
        message: null,
        acceptCallback: null,
      },
      popup: {
        show: false,
        message: null
      },
    },
    newTest: {
      questionsCount: 0,
      questions: []
    },
    results: {
      editBlock: null
    },
    company: {

    },
    group: {

    }
  },
  getters: {
    editBlock(state) {
      return state.results.editBlock
    },
    questions(state) {
      return state.newTest.questions
    },
    question: (state) => (id) => {
      return state.newTest.questions[id]
    },
    test: (state) => {
      return state.newTest
    },
    popupError(state) {
      return state.app.popupError
    },
    popupWarn(state) {
      return state.app.popupWarn
    },
    popup(state) {
      return state.app.popup
    }
  },
  mutations: {
    setEditBlock(state, block) {
      state.results.editBlock = block
    },
    removeEditBlock(state) {
      state.results.editBlock = null
    },
    addQuestion(state, question) {
      question.id = state.newTest.questionsCount
      state.newTest.questions.push(question)
      state.newTest.questionsCount++
    },
    editQuestion(state, question) {
      state.newTest.questions.map((el, index) => {
        if (el.id === question.id) {
          state.newTest.questions[index] = question
        }
      })
    },
    removeQuestion(state, question) {
      state.newTest.questions.splice(question, 1)
    },
    fillQuestions(state, questions) {
      state.newTest.questions = questions
    },
    addAnswer(state, data) {
      console.log(data)
      state.newTest.questions[data.questionId].answers.push(data.answer)
    },
    editAnswer(state, data) {
      state.newTest.questions[data.questionId].answers[data.id] = data.answer
    },
    removeAnswer(state, data) {
      state.newTest.questions[data.questionId].answers.splice(data.id, 1)
    },
    clearNewTest(state) {
      state.newTest = {
        questionsCount: 0,
        questions: []
      }
    },
    fillTest(state, test) {
      state.newTest = test
    },
    openErrorPopup(state, message) {
      state.app.popupError.show = true
      state.app.popupError.message = message
    },
    closeErrorPopup(state) {
      state.app.popupError.show = false
      state.app.popupError.message = ''
    },
    openWarnPopup(state, { message, acceptCallback }) {
      state.app.popupWarn.show = true;
      state.app.popupWarn.message = message;
      state.app.popupWarn.acceptCallback = acceptCallback;
    },
    acceptWarnPopup(state) {
      state.app.popupWarn.acceptCallback();
    },
    closeWarnPopup(state) {
      state.app.popupWarn.show = false;
      state.app.popupWarn.message = "";
    },
    openPopup(state, message) {
      state.app.popup.show = true
      state.app.popup.message = message
      setTimeout(() => {
        state.app.popup.show = false
        state.app.popup.message = ''
      }, 3000)
    },
    setEditCompany(state, company) {
      state.company = company;
    },
    setEditGroup(state, group) {
      state.group = group;
    }
  },
  actions: {
    createGroup() {

    }
  },
  modules: {
  }
})
