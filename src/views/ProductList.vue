<template>
  <div class="container fade-in">
      <header>
          <div>
              <h2>Product List</h2>
          </div>
         <div class="btns-header">
              <button class="btn"><router-link to="addproduct">ADD</router-link></button>
              <button class="btn" id="delete-product-btn" value="MASS DELETE" @click="$store.commit('massDelete')">MASS DELETE</button>
         </div>
      </header>    
      <br>  
      <div class="line"></div>
      <transition name="fadeP">
        <div class="con" v-on:enter="$store.commit('enterP')" v-if="$store.state.showP">
            <div class="card"  v-bind:key="objData.id" v-for="objData in $store.state.products">
                <div class="grid">
                  <label class="checkbox path">
                    <input type="checkbox" class="delete-checkbox" :id="objData.id">
                    <svg viewBox="0 0 21 21">
                    <path d="M5,10.75 L8.5,14.25 L19.4,2.3 C18.8333333,1.43333333 18.0333333,1 17,1 L4,1 C2.35,1 1,2.35 1,4 L1,17 C1,18.65 2.35,20 4,20 L17,20 C18.65,20 20,18.65 20,17 L20,7.99769186"></path>
                    </svg>
                  </label>
                </div>
                <ul>
                    <li>{{objData.sku}}</li>
                    <li>{{objData.name}}</li>
                    <li>{{objData.price}}$</li>
                    <li>{{objData.front_end}}</li>

                </ul>
            </div>
          </div>
        </transition>
  </div>
</template>

<script>
import AddProduct from './AddProduct';
export default {
  name: 'ProductList',
  components: {AddProduct},
  mounted () {
    this.$store.commit("getAllData");
  },

}
</script>



<style  scoped lang="scss">



.fadeP-enter-active,
.fadeP-leave-active {
  transition: all 1s ease-in-out
}

.fadeP-enter {
  opacity: 0;
  transform: scale(0.9);
  transform: translateX(10px);
}
// .fadeP-leave-to
// {
//   transform: translateX(50px);
// }
/*  */



.checkbox {
    --background: #fff;
    --border: #D1D6EE;
    --border-hover: #BBC1E1;
    --border-active: #1E2235;
    --tick: #fff;
    position: relative;
    input,
    svg {
        width: 21px;
        height: 21px;
        display: block;
    }
    input {
        -webkit-appearance: none;
        -moz-appearance: none;
        position: relative;
        outline: none;
        background: var(--background);
        border: none;
        margin: 0;
        padding: 0;
        cursor: pointer;
        border-radius: 4px;
        transition: box-shadow .3s;
        box-shadow: inset 0 0 0 var(--s, 1px) var(--b, var(--border));
        &:hover {
            --s: 2px;
            --b: var(--border-hover);
        }
        &:checked {
            --b: var(--border-active);
        }
    }
    svg {
        pointer-events: none;
        fill: none;
        stroke-width: 2px;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke: var(--stroke, var(--border-active));
        position: absolute;
        top: 0;
        left: 0;
        width: 21px;
        height: 21px;
        transform: scale(var(--scale, 1)) translateZ(0);
    }
    &.path {
        input {
            &:checked {
                --s: 2px;
                transition-delay: .4s;
                & + svg {
                    --a: 16.1 86.12;
                    --o: 102.22;
                }
            }
        }
        svg {
            stroke-dasharray: var(--a, 86.12);
            stroke-dashoffset: var(--o, 86.12);
            transition: stroke-dasharray .6s, stroke-dashoffset .6s;
        }
    }

}




/*  */



.line {
  border-radius: 25%;
  margin-left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 600px;
  background-color: #eee;
}
.container {
  /* position: relative; */
  margin-left: 50%;
  transform: translateX(-50%);
  height:100%;
  width: 700px;
  overflow: hidden;
}
header{
  color: #504e47;
  margin-top: 50px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: default;
}
.btns-header {
  margin-right: 50px;
  width: 40%;
  display: flex;
  justify-content: flex-end;
}
.btn {
  color: #fff;
  border: none;
  margin-left: 10px;
  background-color: #817F75;
  border-radius: 5px;
  padding: 5px 15px;
  cursor: pointer;
  transition: transform 0.3s;
}
.btn a {
  text-decoration: none;
  color: #fff;
}
.btn:hover{
  transform: scale(1.1);
}
header h2 {
  margin-left: 20px; 
}

ul {
  list-style: none;
}
.con {
  margin-top: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
.card {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
  width: 200px;
  padding: 5px;
  margin: 10px;
  border-radius: 8px 0;
  background-color: #C5D9E2;
}

.card ul {
  margin-left: 50%;
  margin-bottom: 10px;
  transform: translateX(-50%);
  text-align: center;
  color: #000 ;
}

.fade-in { animation: fadeIn 1s; }

@keyframes fadeIn {
  0% { opacity: 0.5;transform: translateX(-47%); }
  100% { opacity: 1;transform: translateX(-50%); }
}

</style>