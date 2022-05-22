<template>
  <button
    class="add-coast__btn"
    @click="addCoast"
  />
</template>

<script>
	export default {
		name: 'AddCoast',
		data() {
			return {
            };
		},
		methods: {
			addCoast() {
				console.log('addCoast');
			},
		},
	};
</script>

<style scoped>
.add-coast__btn{
	width: 100px;
    height: 30px;
    background-color: #3bba9f;
    border: 1px solid #3f95cd;
    border-radius: 20px;
}
</style>
