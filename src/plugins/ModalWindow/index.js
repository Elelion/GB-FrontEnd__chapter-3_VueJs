export default {
  install(Vue) {
    if(this.installed) {
       return
    }

  this.installed = true

  Vue.prototype.$modal = {
      EventBus: new Vue(),

      show(name, headerName) {
          this.EventBus.$emit('show', {name, headerName})
      },
      hide() {
          this.EventBus.$emit('hide')
      }
  }
}
}
