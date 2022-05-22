<template>
  <div>
    <div class="calc">
      <div class="inputs">
        <input
          v-model.number.lazy="op1"
          placeholder="a"
          name="op1"
        >
        <input
          v-model.number.trim="op2"
          placeholder="b"
          name="op2"
        >
        <span class="result"> = {{ result }} </span>
      </div>
      <br>
      <div
        v-if="hasError"
        class="error"
      >
        {{ errorText }}
      </div>
      <div class="btns">
        <button
          v-for="(operation, idx) in buttons"
          :key="idx"
          class="btn"
          :title="operation"
          :disabled="op1 === ' ' && op2 === ' '"
          :name="buttons"
          @click="calc(operation)"
        >
          {{ operation }}
        </button>
      </div>
      <hr>
      <input
        id="checkbox"
        v-model="checked"
        type="checkbox"
        @click="checked = !checked"
      >
      <label for="checkbox">Цифровая Клавиатура</label>
      <div
        v-if="checked"
        name="checked"
      >
        <keyboard
          @addNum="addNumber"
          @delNum="delNumber"
        />
      </div>
    </div>
    <div class="results">
      <div class="logs">
        Последние вычисления: <br>{{ logs }}
      </div>
      <div class="result">
        <div
          v-if="result > 0"
          class="cond"
        >
          Результат положительный
        </div>
        <div
          v-else-if="result < 0"
          class="cond"
        >
          Результат отрицательный
        </div>
        <div
          v-else
          class="cond"
        >
          Результат = 0
        </div>
      </div>
      <div
        v-for="(item, idx) in numbersComp"
        :key="idx"
        class="numbers"
      >
        {{ item }}
      </div>
      <!-- <div class="fibo">Фибоначчи: {{ fibResult }}</div> -->
    </div>
  </div>
</template>

// <script>
// import keyboard from "./keyboard.vue";
export default {
    name: "Calculator",
  props: {
    msg: String,
    secondMsg: {
      type: String,
      default: "User"
    }
  },
  data() {
    return {
      op1: "",
      op2: "",
      result: 0,
      hasError: false,
      errorText: " На ноль делить нельзя!!!",
      buttons: ["+", "-", "*", "/", "**", "%"],
      numbers: [1, 2, 3, 5, 6, 7, 8, 11, 2, 3, 5],
      logs: {},
      checked: false
    };
  },
  computed: {
    numbersComp() {
      return this.numbers.filter(n => n > 6);
    },
    // fib1() {
    //   return this.fib(this.op1);
    // },
    // fibResult() {
    //   for testing
    //   return this.fib(this.op1) - this.fib(this.op2);
    // }
  },
  watch: {
    op1(newValue){
      this.result = this.op2 + newValue;
    },
    op2(newValue) {
      this.result = this.op1 + newValue;
    },
  },
  methods: {
    addNumber(val, op) {
      if (op == 2) {
        let tempVal = this.op2;
        console.log(tempVal);
        tempVal = tempVal +''+ val;
        this.op2 = Number(tempVal);
      } else {
        let tempVal = this.op1;
        tempVal = tempVal+''+ val;
        this.op1 = Number(tempVal);
      }
    },
    delNumber(op) {
      if (op == 2) {
        this.op2 = "";
      } else {
        this.op1 = "";
      }
    },
    calc(operation) {
      this.hasError = false;
      if (operation === "/" && this.op2 === 0) {
        this.hasError = true;
        return;
      }
      const { op1, op2 } = this;
      // const op1 = this.op1
      this.$set(this.logs, Date.now(), `${op1} ${operation} ${op2} = ?`);
      // this.logs[Date.now()] = `${op1} ${operation} ${op2}=?` без реактивности
      const calcOperations = {
        "+": () => op1 + op2,
        "-": () => op1 - op2,
        "*": () => op1 * op2,
        "/": () => op1 / op2,
        "**": () => op1 ** op2,
        "%": () => op1 % op2
      };
      this.result = calcOperations[operation]();
    },
    fib(n) {
      console.log(n)
      return n <= 1 ? n : this.fib(n - 1) + this.fib(n - 2);
    }
  }
};
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
input {
  width: 200px;
  height: 40px;
  margin: 10px;
  font-size: 24px;
  padding: 10px;
  box-sizing: border-box;
}
label {
  font-size: 30px;
  color: #35495e;
}
.result {
  font-size: 36px;
  color: blue;
}
.btn {
  background-color: #42b983;
  border: 2px solid #35495e;
  border-radius: 20px;
  width: 80px;
  height: 40px;
  font-size: 24px;
  margin: 5px;
}
.error {
  width: 120px;
  background-color: yellow;
  border: 3px solid red;
}
.cond {
  font-size: 24px;
  color: #35495e;
}
.numbers {
  font-size: 24px;
  color: #35495e;
}
.logs,
.fibo {
  border: 1px solid #35495e;
  margin: 20px 0;
  padding: 10px;
}
</style>
