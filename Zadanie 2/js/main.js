let eventBus = new Vue();

Vue.component("board", {
    template: `
        <div class="board">
        <h1>Таблица</h1>
        <ul id="columns">
            <li class="column">
            <div class="form">
                <form @submit.prevent="onSubmit">
                <label for="name">Заголовок</label>
                <input type="text" id="name" v-model="name">
                <label for="point1">Пункт1</label>
                <input type="text" id="point1" v-model="point1">
                <label for="point2">Пункт2</label>
                <input type="text" id="point2" v-model="point2">
                <label for="point3">Пункт3</label>
                <input type="text" id="point3" v-model="point3">
                <label for="point4">Пункт4</label>
                <input type="text" id="point4" v-model="point4">
                <label for="point5">Пункт5</label>
                <input type="text" id="point5" v-model="point5">
                <button type="submit" value="Submit">Создать</button>
                <ul class="error_tabl">
                    <li class="error" v-for="error in errors">{{ error }}</li>
                </ul>
                </form>
            </div>
            <ul class="too-tabl">
                <li v-for="card in column1">
                <li v-for="card in column1"><card :name="card.name" :card_id="card.card_id" :points="card.points" @to-two="toColumnTwo" >   </card></li>
                </li>
            </ul>
            </li>
            <li class="column">
            <ul>
            <li v-for="card in column2"><card :name="card.name"  :points="card.points"></card></li> 
        </ul>
        </li>
            <li class="column"></li>
        </ul>
        </div>
    `,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],

            cards: [],

            name: null,
            point1: null,
            point2: null,
            point3: null,
            point4: null,
            point5: null,

            points: [],

            errors: [],
            card_id: 0,

        };
    },
    methods: {
        onSubmit() {
            this.errors = [];
            this.points = [];
            if (this.point1) {
                this.points.push([this.point1,false])
            }
            if (this.point2) {
                this.points.push([this.point2,false])
            }
            if (this.point3) {
                this.points.push([this.point3,false])
            }
            if (this.point4) {
                this.points.push([this.point4,false])
            }
            if (this.point5) {
                this.points.push([this.point5,false])
            }
            if (this.points.length < 3) {
                this.errors.push("Должно быть заполнено от 3 пунктов");
            }
            if (!this.name) {
                this.errors.push("Не введён заголовок");
                
            if(this.column1.length >=3){
                 this.errors.push("Достигнуто максимальное число карточек")                
                }
            }
            if (this.errors.length == 0) {
                let info = {
                    name: this.name,
                    points: this.points,
                    card_id: this.card_id
                };
                this.card_id +=1;   
                this.column1.push(info);
                
            }
        },
        toColumnTwo(name,points, card_id){
            let info = {
                name:name,
                points:points,
                card_id:card_id
            }

            for(i in this.column1){
                if(this.column1[i].card_id==card_id){
                    this.column1.splice(i, 1)
                    break
                }


            }

            this.column2.push(info)
        },
    },
});

Vue.component("card", {
    template: `
        <div class="card">
        <h3>{{ name }}</h3>
        <ul>
        <li v-for="point in points"><task :point="point[0]" :done="point[1]" @checked="updatechecked"></task></li>
        </ul>
        </div>
    `,
    data() {
        return {
            count_of_checked:0,
            name: null,
            points: [],
        };
    },
    methods: {
        updatechecked(point) {
        this.count_of_checked+=1;
        for(i in this.points){
            if(this.points[i][0]==point && this.points[i][1] != true){
                this.points[i][1] = true
                break
            }
        }    

        if ((this.count_of_tasks/2) <= (this.count_of_checked)){

            console.log(this.count_of_tasks)
            console.log(this.count_of_checked)
        this.$emit("to-two",this.name,this.points,this.card_id);

        }
    }
    },
    mounted() {

    },
    props: {
        name: {
            type: String,
            required: false,
        },
        points: {
            type: Array,
            required: false,
        },

    },
    computed: {
        count_of_tasks() {
          return this.points.length;
        },
    },
});

Vue.component("task", {
    template: `
    <div class="task" 
    @click="check"
    :class="{done:done}">{{point}}</div>
    `,
    data() {
        return {
            
        };
    },
    props:{
        point:{
            type: String,
            required:false,
        },
        done:{
            type: Boolean,
            required:false,
        },
        card_id:{
            type:Number,
            required:false,
        }
    },
    methods:{
        check(){
            if(!this.done){
                this.done=true
                this.$emit("checked",this.point);
            }

        }
    },
});

let app = new Vue({
    el: "#app",
    data: {},
    methods: {},
});