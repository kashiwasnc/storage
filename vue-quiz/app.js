const ANSWER = { YES: 1, NO: 0 }
const CORRECT = { CD: 1, VALUE: "◯" }
const INCORRECT = { CD: 0, VALUE: "✕" }
const MAX_POINT = 100

// 親コンポーネント
const app = Vue.createApp({
  data() {
    return {
      // 出題文の配列
      questions: [
        {
          text: "日本で二番目に高い山は奥穂高岳である",
          answer: ANSWER.NO
        },
        {
          text: "十二支で、午年の５年後は丑年である",
          answer: ANSWER.NO
        },
        {
          text: "日本で三番目に長い川は石狩川である",
          answer: ANSWER.YES
        },
        {
          text: "12星座で、ふたご座の５か月前はいて座である",
          answer: ANSWER.NO
        },
        {
          text: "日本で二番目に広い湖は霞ヶ浦である",
          answer: ANSWER.YES
        }
      ],
      // 現在の問題のindex
      currentIndex: 0,
      // 回答を格納する配列
      yourAnswers: []
    }
  },
  computed: {
    // 現在の問題
    currentQuestion() {
      return this.questions[this.currentIndex]
    },
    // 正答した問題の配列
    correctAnswers() {
      const self = this
      return this.questions.filter((question, index) => {
        return question.answer === self.yourAnswers[index]
      })
    },
    // 得点の算出
    totalScore() {
      const score = MAX_POINT / this.questions.length
      return Math.floor(score * this.correctAnswers.length)
    }
  },
  methods: {
    // 回答を行った時
    doAnswer(answer) {
      this.yourAnswers[this.currentIndex] = answer
      this.nextQuestion()
    },
    // 次の出題
    nextQuestion() {
      if (this.currentIndex < this.questions.length) {
        this.currentIndex += 1
      }
    },
    // 最初からやり直す
    doRestart() {
      this.currentIndex = 0
      this.initYourAnswersArray()
    },
    // 問題数からyourAnswers配列の長さを設定
    initYourAnswersArray() {
      this.yourAnswers = Array(this.questions.length)
    }
  },
  mounted() {
    this.initYourAnswersArray()
  }
})

// 出題＆回答コンポーネント
app.component("qa-template", {
  props: {
    questionText: String
  },
  template: "#qa-template",
  methods: {
    onClickYesBtn() {
      this.$emit("click-yes-btn", ANSWER.YES)
    },
    onClickNoBtn() {
      this.$emit("click-no-btn", ANSWER.NO)
    }
  }
})

// 結果表示コンポーネント
app.component("result-template", {
  props: {
    totalScore: {
      type: Number,
      required: true
    },
    questions: Array,
    yourAnswers: Array
  },
  template: "#result-template",
  computed: {
    // その回答が正解かどうか判定
    corrects() {
      const self = this
      return this.questions.map((q, i) => {
        if (q.answer === self.yourAnswers[i]) {
          return { cd: CORRECT.CD, value: CORRECT.VALUE }
        } else {
          return { cd: INCORRECT.CD, value: INCORRECT.VALUE }
        }
      })
    },
    maxPoint() {
      return MAX_POINT
    },
    isPerfect() {
      return this.totalScore === this.maxPoint
    }
  },
  methods: {
    onClick() {
      this.$emit("click")
    },
    // 正答した時にクラス変更
    getCorrectClassName(correctCd) {
      return correctCd === CORRECT.CD ? "has-text-weight-bold has-text-white has-background-success" : ""
    }
  }
})

app.mount("#app")