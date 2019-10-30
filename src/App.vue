<template>
  <div id="app">
  
    <input class="input" type="text" v-model="evaluateTarget"/>

    <button class="button" @click="click">Execute</button>

    <h5>{{result}}</h5>
  </div>
</template>

<script>
import { evaluate } from './utils/evalulate2.js'

function runSlow(){
  let i=0
  while (i !== 200000000) {
    ++i
  }
}

export default {
  name: 'app',

  methods: {

    click: function() {
      //this.result = evaluate(this.evaluateTarget);
      runSlow();

      let i=0
      while (i !== 20000000) {
        ++i
      }
    }
  },
  data(){
    return {
      result: '',
      evaluateTarget: '',
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin: 20px 20px;
  color: #2c3e50;
  margin-top: 60px;
}

.input {
  width: 400px;
  height: 40px;
  display: block;
}
.button {
  background-color:#aba;
  width: 200px;
  height: 40px;
  color: white;
  margin-top: 10px;
}
</style>
