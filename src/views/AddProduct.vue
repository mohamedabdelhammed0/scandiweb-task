<template>
    <div class="container fade-in">
        <header>
            <div>
                <h2>Product Add</h2>
            </div>
             <div class="btns-header">                
                <button class="btn" @click="$store.commit('addProduct')" type="Submit">Save</button>

                <button class="btn" @click="$store.commit('back')">Cancel</button>
            </div>
        </header>
        <br>  
      <div class="line"></div>
        <div class="con">
            <div class="form" >
            <form action="" id="product_form" @submit.prevent="$store.commit('addProduct')">
                <div>
                    <!-- sku -->
                    <div class="input-container">
                        <input id="sku" v-model="$store.state.sku" type="text" required=""/>
                        <label for="sku">SKU</label>		
                    </div>
                    <!-- name -->
                    <div class="input-container">
                        <input id="name" v-model="$store.state.name" type="text" required=""/>
                        <label for="name">Name</label>		
                    </div>
                    <!-- price -->
                    <div class="input-container">
                        <input id="price" v-model="$store.state.price" type="text" required=""/>
                        <label for="price">Price ($)</label>		
                    </div>
                    <!-- select type -->

                    <div class="select attributes_field">
                        <select v-model="$store.state.type" name="type" id="productType" @change="$store.commit('getAttributes',$event)" >
                                <option disabled value="0" selected>type</option>
                                <option :key="item.id" v-for="item in $store.state.types" :value="item.id" :id="item.name" >{{item.name}}</option>
                        </select>
                    </div>  

                     <!-- attributes -->
                     <div class="input-container fade-in-attribute" v-for="attribute in $store.state.attributes" :key="attribute.id" :id="attribute.id">
                        <input :id="attribute.name"  class="input-field" name="field1" type="text" v-model="attribute.value" required=""/>
                        <label :for="attribute.name">{{attribute.name}} ({{attribute.unit}}) </label>		
                    </div>
                </div>


               

                
                <p>{{$store.state.type.description}}</p>

            </form>
            </div>
            <transition name="fade" v-on:enter="$store.commit('enter')">
                <div class="errors" v-if="$store.state.show">
                    <span v-for="error in $store.state.errors" :key="error.id">{{error}}<br></span>
                </div>
            </transition>
        </div>
    </div>
</template>




<script>

export default {
  name: "AddProduct",
mounted(){
      this.$store.commit('getTypes');
  },
}

</script>


<style lang="scss" scoped>

.fade-enter-active,
.fade-leave-active {
  transition: all 1s ease;
}

.fade-enter {
    opacity: 0;
    transform: translateX(100px);
}
.fade-leave-to
{
  opacity: 0;
  transform: translateX(100px);
}

/* select */
select {
  /* Reset Select */
  appearance: none;
  outline: 0;
  border: 0;
  box-shadow: none;
  /* Personalize */
  flex: 1;
  padding: 0 1em;
  color: white;
  background-color: #2c3e50;
  background-image: none;
  cursor: pointer;
}
/* Remove IE arrow */
select::-ms-expand {
  display: none;
}
/* Custom Select wrapper */
.select {
  position: relative;
  display: flex;
  width: 10em;
  height: 2em;
  border-radius: .25em;
  overflow: hidden;
}
/* Arrow */
.select::after {
  content: '\2304';
  position: absolute;
  top: -.8em;
  line-height: 50%;
  right: 0;
  padding: 1em 0.5em;
  font-size: 1.5em;
  background-color: #e2e9f0;
  transition: .25s all ease;
  pointer-events: none;
}
/* Transition */
.select:hover::after {
  color: green;
}


/**select */


/* inputs */




.input-container{
	position:relative;
	margin-bottom:25px;
}
.input-container label{
	position:absolute;
	top:0px;
	left:0px;
	font-size:16px;
	transition: all 0.3s ease-in-out;
}
.input-container input{ 
  border:0;
  border-bottom:1px solid #555;  
  background:transparent;
  width:100%;
  padding:8px 0 5px 0;
  font-size:16px;
}
.input-container input:focus{ 
 border:none;	
 outline:none;
 transition: all 0.3s;
 border-bottom:1px solid #2b9dd1;	
}
.input-container input:focus ~ label,
.input-container input:valid ~ label{
	top:-12px;
	font-size:12px;
	
}


input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus,
textarea:-webkit-autofill,
textarea:-webkit-autofill:hover,
textarea:-webkit-autofill:focus,
select:-webkit-autofill,
select:-webkit-autofill:hover,
select:-webkit-autofill:focus {
    transition: background-color 5000s ease-in-out 0s;
}
/* inputs */
.container {
    margin-left: 50%;
    transform: translateX(-50%);
    height:100%;
    width: 700px;
    overflow: hidden;
}
.line {
  border-radius: 25%;
  margin-left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 600px;
  background-color: #eee;
}
.con {
    margin-top: 50px;
    display: flex;
}
header{
  margin-top: 50px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.btns-header {
    margin-right: 50px;
    width: 20%;
    display: flex;
    justify-content: space-around;
}
header h2 {
    margin-left: 20px; 
    color: #504e47;
    cursor: default;
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
.btn:hover{
  transform: scale(1.1);
}
.btn a {
    text-decoration: none;
    color: #fff;
}

.errors {
    display: flex;
    margin-left: 20%;
    flex-direction: column;
    align-items: flex-start;
    color: white;
} 
.errors span {
    padding: 15px;
    background-color: #ff0062;
    border-radius: 10px;
    min-width: 200px;
    max-width: fit-content;
    margin-top: 10px;
    /* margin-bottom: 10px; */
    /* margin-left: 40px; */
    cursor: default;
    box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
}
.attributes_field {
    margin-bottom: 20px;
}
.fade-in { animation: fadeIn 0.5s; }
.fade-in-attribute{ animation: fadeInAttribute 1s; }
@keyframes fadeIn {
  0% { opacity: 0.5; transform: translateX(-53%);}
  100% { opacity: 1; transform: translateX(-50%);}
}
@keyframes fadeInAttribute {
  0% { opacity: 0; }
  100% { opacity: 1; }
}



</style>