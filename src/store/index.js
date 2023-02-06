import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from '../router'





Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    host: "https://scandi-task-api.000webhostapp.com/",
    // product list data
    checks: document.getElementsByClassName("delete-checkbox"),
    products: [],
    toDelete:[],
    // add product data
    name:'',
    sku:'',
    price: '',
    type: '0',
    errors: [],
    attributes: [],
    show: false,
    showP: false,
    type_value: 'Type',
    types: [],
    err: [],
  },
  getters: {
  },
  mutations: {
    // delete data
    massDelete(state){
      state.showP = false;
      for(let i=0;i<state.checks.length;i++){
      if(state.checks[i].checked == true){
          state.toDelete.push(state.checks[i].id);
          }
      }
      var data = new FormData();
      data.append("toDeleteArray", state.toDelete);
      axios
        .post(
          state.host+"back_end/public/home/delete",data
        ).then(res => {
            if (res.data.error) {
              console.log("Error", res);
  
            } else {
                this.commit('getAllData');
            }
          })
          .catch(err => {
            console.log("Error", err);
          });
      },
      //

  // get data 
    getAllData(state){
      state.showP = false;
      this.commit('enterP');
      axios
       .get(state.host+'back_end/public/home/getData')
         .then(res => (state.products = res.data))
         .catch(err => {
           console.log("Error", err);
         });
   },
   //
   //get types
    getTypes(state){      
      axios
      .get(state.host+'back_end/public/home/getTypes')
      .then(res => {
          state.types = res.data;
      })
      .catch(err => {console.log("Error", err);});
    },
    enter(state) {
      setTimeout(function() {
        state.show = false;
      }, 3000); // hide the message after 3 seconds
    },
    enterP(state) {
        state.showP = true;
    },
    // 
  // add product
    addProduct(state){
      if (state.errors != []) {
        state.show = true;
        state.errors = []
      }
      var data = new FormData();
      data.append("sku", state.sku);
      data.append("name", state.name);
      data.append("price", state.price);
      data.append("type", state.type_value);
      data.append("attributes", JSON.stringify(state.attributes));
      for (let key in state.attributes) {
              data.append(state.attributes[key].name,state.attributes[key].value);
          }
      axios
      .post(state.host+'back_end/public/home/addProduct',data)
      .then(res => { 
          if(res.data.errors){
              state.errors = res.data.errors;
          }else{
            state.name = '',
            state.sku = '',
            state.price = '',
            state.type = '0',
            state.errors = [],
            state.attributes = [],
            state.type_value = 'Type',
            this.commit('back');
          }
      })
      .catch(err => (state.err = err.data))
    },
    // 
    // get attributes
    getAttributes(state,event){
      let type_id = event.target.value;
      state.type_value = event.target.options[event.target.options.selectedIndex].text;
      axios
      .get(state.host+'back_end/public/home/getAttributes&type_id='+type_id)
      .then(res =>{
          (state.attributes = res.data)
          })
      .catch(err => {console.log("Error", err);});      
  },
  // 
  // go back
    back(state){
      state.showP = false;
      router.push('/')
    },
   
  },
  actions: {

  },
  modules: {
  }
})
