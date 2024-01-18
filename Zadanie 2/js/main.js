let eventBus = new Vue()
Vue.component("board", {
    template: `
<div class="board">
<h1>Таблица</h1>
<ul id="columns">
<li class="column">
<form @submit.prevent="onSubmit">
<label for="name">Заголовок</label> <input type="text" id="name" v-model="name"> 
<label for="point1">Пункт1</label> <input type="text" id="point1" v-model="point1"> 
<label for="point2">Пункт2</label> <input type="text" id="point2" v-model="point2"> 
<label for="point3">Пункт3</label> <input type="text" id="point3" v-model="point3"> 
<label for="point4">Пункт4</label> <input type="text" id="point4" v-model="point4"> 
<label for="point5">Пункт5</label> <input type="text" id="point5" v-model="point5"> 
<button type="submit" value="Submit">Создать</button>
</form>
</li>
</ul>
</div>
    `,
    data() {
        
        return{
            column1:[],
            column2:[],
            column3:[],

            name:null,
            point1:null,
            point2:null,
            point3:null,
            point4:null,
            point5:null,

            points:[],

            error:[]

        }
    },
    methods:{
        onSubmit(){
            this.points=[]
            if(this.point1){
                this.points.push(this.point1)
            }
            if(this.point2){
                this.points.push(this.point2)
            }
            if(this.point3){
                this.points.push(this.point3)
            }
            if(this.point4){
                this.points.push(this.point4)
            }
            if(this.point5){
                this.points.push(this.point5)
            }


            console.log(this.points)
        }
    }
});





Vue.component("task", {
    template: `
<div class="column">task</div>
    `,
    data() {
        return{
            name:null,
            points:[],

        }
    }
});
let app = new Vue({
    el: "#app",
    data: {
    },
    methods: {
    },
});