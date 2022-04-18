<template>
  <div>
    <div class="display">
      <h1>{{ msg }}</h1>

      <p>Число 1</p>
      <input v-model="operand1" type="number"/>

      <p>Число 2</p>
      <input v-model="operand2" type="number"/>

      <p>Результат в степень</p>
      <input v-model="operand3"/>

      <p>Результат: = {{result}} </p>
      <p>fib: = {{resultFib}}</p>
    </div>

    <div class="error" v-if="error">
      {{error}}
    </div>

    <br>
    <div class="messages">
      <template v-if="result === 0"></template>
      <template v-else-if="result < 0">Получилось отрицательное число</template>
      <template v-else-if="result < 100">Результат в первой сотне</template>
      <template v-else>Получилось слишком большое число</template>
    </div>

    <br>
    <div class="displayKeyboard">
      <input type="checkbox" id="checkboxDisplayKeyboard" name="checkboxDisplayKeyboard" v-model="checkedKeyboard">
      <label for="checkboxDisplayKeyboard">Отобразить экранную клавиатуру</label>

      <div class="keyboards" v-if="checkedKeyboard === true">
        <button
          v-for="(item) in myCollection"
          @click="keyboardAdd(item)"
          :key="item"
        >
          {{item}}
        </button>

        <br>
        <br>
        <input type="radio" id="operand-one" value="operand-one" v-model="pickedOperand">
        <label for="operand-one">Операнд 1</label>
        <input type="radio" id="operand-two" value="operand-two" v-model="pickedOperand">
        <label for="operand-two">Операнд 2</label>
        <br>
      </div>
    </div>
    <br>
    <hr>

    <div class="keyboard">
      <MyButton>
        <template #icon="count">
          + {{count}}
        </template>
        Нажать
      </MyButton>
      <MyButton />
      <br>
      <br>
      <button
        v-for="operand in operands"
        v-on:click="calculate(operand)"
        :key="operand"
        :title="operand"
      >{{ operand }}</button>

      <button v-on:click="result = Math.pow(result, operand3)">pow</button>
    </div>
    <br>
    <hr>

    <!-- :key - обязателен -->
    <p>Collections:</p>
    <div class="item" v-for="(item, index) in myCollection" :key="index">
      {{index}}-{{item}}
    </div>

    <p>Logs:</p>
    <div class="logs">
      <div class="log" v-for="(item, index) in logs" :key="index">
        {{index}}: {{item}}
      </div>
    </div>
  </div>
</template>

<script>
import MyButton from "@/components/myButton";
export default {
  name: 'CalculatorApp',
  components: {MyButton},
  props: {
    msg: {
      type: String,
      default: 'Калькулятор'
    },
  },

  // по сути это объект для хранения данных, а если точнее это св-ва
  data(){
    return {
      text: 'default text from - Calculator.vue',
      operand1: 0,
      operand2: 0,
      operand3: 1,
      result: 0,
      resultFib: 0,
      error: '',
      myCollection: [0,1,2,3,4,5,6,7,8,9, '←'],
      operands: ['+', '-', '*', '/'],
      logs: {},
      checkedKeyboard: false,
      pickedOperand: false,
    }
  },

  methods: {
    calculate(operation = '+') {
      this.error = '';

      switch (operation) {
        case '+':
          this.addition();
          break;
        case '-':
          this.subtraction();
          break;
        case '*':
          this.multiplication();
          break;
        case '/':
          this.division();
          break;
      }

      // запись БЕЗ this.$set:
      /*
      let dateCurrent = new Date;
      this.logs[dateCurrent.toLocaleString()] =
          `${this.operand1} ${operation} ${this.operand2} = ${this.result}`;
      */

      /**
       * $set(obj, propertyName, val) - сообщает о том, что мы хотим добавить
       * или заменить какие то св-ва существующего массива или объекта
       *
       * !Важно!
       * Используется когда мы НЕ знаем какие св-ва будут у объекта
       *
       * формат:
       * объект, ключ, значение
       */
      const key = new Date;
      const value = `${this.operand1} ${operation} ${this.operand2} = ${this.result}`;
      this.$set(this.logs, key.toLocaleString(), value);
    },

    addition() {
      this.result = Number(this.operand1) + Number(this.operand2);
      this.resultFib = this.fib1 + this.fib2;
    },

    subtraction() {
      this.result = Number(this.operand1) - Number(this.operand2);
    },

    division() {
      if (this.operand2 === '0' || this.operand2 === 0) {
        this.result = 0;
        this.error = 'Делить на 0 - НЕльзя';
        return;
      }

      this.result = Math.floor(Number(this.operand1) / Number(this.operand2));
    },

    multiplication() {
      this.result = Number(this.operand1) * Number(this.operand2);
    },

    /**/

    fib(n) {
      return n <= 1
        ? n
        : this.fib(n - 1) + this.fib(n - 2);
    },

    /**/

    keyboardPush(target, value) {
      let arr = Array.from(target);
      arr.push(value);

      return arr.join('');
    },

    keyboardPop(target) {
      let arr = Array.from(target);
      arr.pop();

      return arr.join('');
    },

    keyboardAdd(value) {
      if (this.pickedOperand === 'operand-one' && value !== '←') {
        // оставляем для примера на всякий случай
        // let arr = Array.from(this.operand1);
        // arr.push(value);
        // this.operand1 = arr.join('');

        this.operand1 = this.keyboardPush(this.operand1, value)
      }

      if (this.pickedOperand === 'operand-two' && value !== '←') {
        this.operand2 = this.keyboardPush(this.operand2, value)
      }

      if (this.pickedOperand === 'operand-one' && value === '←') {
        // let arr = Array.from(this.operand1);
        // arr.pop();
        // this.operand1 = arr.join('');

        this.operand1 = this.keyboardPop(this.operand1);
      }

      if (this.pickedOperand === 'operand-two' && value === '←') {
        this.operand2 = this.keyboardPop(this.operand2);
      }
    },
  },

  /**
   * вычисляемые св-ва не изменяемы
   * вычисляемые св-ва должны ВСЕГДА что то возвращать
   *
   * Отличие от метода в том, что метод что-то сделает и все, если вынести в
   * комьютед, он всегда будет вычислен , даже если не будет использоваться
   *
   * Это свойство вычисляется 1 раз , потом кэшируется и ждёт изменений
   *
   * например массив вам надо преобразовать в объект и передать этот объект
   * в компонент
   */
  computed: {
    fib1() {
      // берем значение из operand1 и засовываем в наш метод fib, вернет результат
      return this.fib(this.operand1);
    },

    fib2() {
      return this.fib(this.operand2);
    },

    /**/


  },

  /**
   * следит за нашими переменными, пропасами, прочие переменные итп
   *
   * handler + immediate - говорит, что коллбэк будет вызван сразу же после
   * начала наблюдения
   */
  watch: {
    // раскоментировать для просмотра примера
    // operand1: {
    result: {
      handler: function (newValue, oldValue) {
        console.log('result watch:');
        console.log(newValue, oldValue);
      },
      immediate: true,
    },

    /*
    logs: function (newValue, oldValue) {
      console.log('logs watch:');
      console.log(newValue, oldValue);
    }
    */
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.display {
  border: 1px solid gray;
}

.keyboards {
  width: 300px;
  margin: 0 auto 0 auto;
}

</style>
