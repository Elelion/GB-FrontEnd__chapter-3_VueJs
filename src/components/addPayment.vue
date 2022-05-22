<template>
  <div class="add-wrapper">
    <div class="add-info">
      <label
        class="add-info__label"
        for=""
      >Date</label>
      <input
        v-model.trim="date"
        class="add-info__input"
        placeholder="insert date"
      >
    </div>
    <div class="add-info">
      <label
        class="add-info__label"
        for=""
      >Category</label>

      <select-list :dictionary-list="getCategorylist" />

      <!-- <input class="add-info__input" placeholder="insert category" v-model.trim="category"> -->
    </div>
    <div class="add-info">
      <label
        class="add-info__label"
        for=""
      >Value</label>
      <input
        v-model="value"
        class="add-info__input"
        placeholder="insert price"
      >
    </div>
    <div class="add-btns">
      <button
        class="add-btn__cancel"
        @click="onCancel"
      >
        Cancel
      </button>
      <button
        class="add-btn__save"
        @click="onSave"
      >
        Save
      </button>
    </div>
  </div>
</template>

<script>
import SelectList from "./SelectList.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  name: "AddPayment",
  components: { SelectList },
  emits: ["saveEmit", "cancelEmit"],
  data() {
    return {
      date: "",
      category: "",
      value: 0
    };
  },
   computed: {
    ...mapGetters(["getCategorylist"]),
    getCurrentDate() {
      const date = new Date();
      const d = date.getDate();
      const m = date.getMonth();
      const y = date.getFullYear();
      return `${d}.${m}.${y}`;
    }
  },
  actions: {
    ...mapActions(["loadCategories"])
  },

  mounted() {
    this.$store.dispatch("loadCategories");
  },
  methods: {
    onSave() {
      // const {  value } = this;
      // const randomCat=this.getCategorylist[Math.floor(Math.random()*this.getCategorylist.length)];
      // const data = {
      // 	date: this.date || this.getCurrentDate,
      // 	category: randomCat,
      // 	value,
      // };
      const { category, value } = this;
      // if (!category || !value) return;
      const data = {
        date: this.date || this.getCurrentDate,
        category,
        value
      };
      this.$emit("saveEmit", data); //данные из инпутов передаются в родитель для сохранения
    },
    onCancel() {
      this.$emit("cancelEmit");
    }
  }

};
</script>

<style scoped>
.add-wrapper {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
}
.add-info {
  width: 70%;
  margin: 5px auto;
  display: flex;
  justify-content: space-evenly;
}
.add-info__label {
  color: #8e5ea2;
}
.add-info__input {
  color: #0852a7;
  outline: #3f95cd;
}
.add-info__input::placeholder {
  color: #e8c3b9;
}
.add-btns {
  width: 70%;
  margin: 20px auto 10px;
  display: flex;
  justify-content: space-evenly;
}
.add-btn__save {
  width: 100px;
  height: 30px;
  background-color: #3bba9f;
  border: 1px solid #3f95cd;
  border-radius: 3px;
}
.add-btn__cancel {
  background-color: yellow;
  border: 1px solid red;
  width: 100px;
  height: 30px;
  border-radius: 3px;
}
</style>
