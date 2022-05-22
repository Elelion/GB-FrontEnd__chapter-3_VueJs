<template>
  <div
    v-if="shown"
    class="context-menu"
    :style="styles"
  >
    <div
      v-for="item in items"
      :key="idx"
      @click="onItemClick(item)"
    >
      {{ item.text }}
    </div>
  </div>
</template>

<script>
export default {
  name: "ContextMenu",
  data() {
    return {
      items: [],
      shown: true,
      xPos: 0,
      yPos: 0
    };
  },
  computed: {
    styles() {
      return {
        top: `${this.yPos}px`,
        left: `${this.xPos + 20}px`
      };
    }
  },
  mounted() {
    this.$contextMenu.EventBus.$on("shown", this.onShow());
    this.$contextMenu.EventBus.$on("hide", this.onHide());
  },
  beforeDestroy() {
    this.$contextMenu.EventBus.$off("shown", this.onShow());
    this.$contextMenu.EventBus.$off("hide", this.onHide());
  },
  methods: {
    onItemClick(item) {
      item.action();
    },
    onShow({ items, caller }) {
      this.shown = true;
      this.items = items;
      this.setPosition(caller);
      window.addEventListener('click', e => {
          let target = e.current.target
          while(target.parentNode&&target.parentNode !==this.$el) {
              target = target.parentNode
          }
          if (!target || !target.parentNode) {
              this.onClose ()
          }
      } )
    },
    onHide() {
      this.shown = false;
      this.items = [];
    },
    setPosition(caller) {
      const computed = caller.getBoundingClientRect();
      this.xPos = computed.left;
      this.yPos = computed.top;
    }
  }
};
</script>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  background: rgb(149, 189, 235);
}
</style>
