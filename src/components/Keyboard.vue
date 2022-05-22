<template>
  <div>
    <div class="key-btns">
      <button
        v-for="(btn, index) in keyBtns"
        :key="index"
        class="btn key__btn"
        @click="addNum(btn.value)"
      >
        {{ btn.value }}
      </button>
    </div>
    <div class="key-action">
      <div class="key-action__inputs">
        <input
          id="op1"
          v-model="picked"
          class="key-action__input"
          type="radio"
          value="1"
        >
        <label for="op1">Операнд A</label>
        <input
          id="op2"
          v-model="picked"
          class="key-action__input"
          type="radio"
          value="2"
        >
        <label for="op2">Операнд B</label>
      </div>
      <button
        class="btn error"
        @click="delNum()"
      >
        Delete
      </button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keyBtns: {
        0: {
          name: "0",
          value: 0
        },
        1: {
          name: "1",
          value: 1
        },
        2: {
          name: "2",
          value: 2
        },
        3: {
          name: "3",
          value: 3
        },
        4: {
          name: "4",
          value: 4
        },
        5: {
          name: "5",
          value: 5
        },
        6: {
          name: "6",
          value: 6
        },
        7: {
          name: "7",
          value: 7
        },
        8: {
          name: "8",
          value: 8
        },
        9: {
          name: "9",
          value: 9
        }
      },
      picked: 1
    };
  },
  methods: {
    addNum(value) {
      this.$emit("addNum", value, this.picked);
    },
    delNum() {
      this.$emit("delNum", this.picked);
    }
  }
};
</script>

<style scoped>
.del__btn {
  width: 120px;
}
.key-btns {
  margin: 50px;
}
.key__btn {
  width: 50px;
}
.key-action {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px auto;
}
.key-action__input {
  width: 50px;
  height: 20px;
  margin: 20px;
}
</style>
