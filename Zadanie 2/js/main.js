let eventBus = new Vue();

Vue.component("board", {
    template: `
        <div class="board">
            <h1>Таблица</h1>
            <button class="clean" v-if="column1.length > 0" @click="Clean()">clean</button>
            <ul  id="columns">
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
                            <card :name="card.name" :card_id="card.card_id" :count_of_checked="0" :points="card.points" @to-two="toColumnTwo"></card>
                        </li>
                    </ul>
                </li>
                <li class="column">
                    <ul>
                        <li v-for="card in column2">
                            <card :name="card.name" :card_id="card.card_id" :count_of_checked="card.count_of_checked" :points="card.points" @to-three="toColumnThree"></card>
                        </li>
                    </ul>
                </li>
                <li class="column">
                    <ul>
                        <li v-for="card in column3">
                            <card :name="card.name" :card_id="card.card_id" :points="card.points" :dat="card.dat"></card>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    `,
    data() {
        return {
            column1: [],
            column2: [],
            column3: [],

            allColumns:[],
            name: null,
            point1: null,
            point2: null,
            point3: null,
            point4: null,
            point5: null,

            errors: [],
            card_id: 0,
            blockOne:false,
        };
    },
    mounted(){
        if (localStorage.getItem('allColumns')) {
              try {
                this.allColumns = JSON.parse(localStorage.getItem('allColumns'));
                this.column1 = this.allColumns[0]
                this.column2 = this.allColumns[1]
                this.column3 = this.allColumns[2]
                this.blockOne = this.allColumns[3]
              } catch(e) {
                localStorage.removeItem('allColumns');
              }
        }
},
watch:{
    column1(){
          this.allColumns = [this.column1,this.column2,this.column3, this.blockOne]





          const parsed = JSON.stringify(this.allColumns);
          localStorage.setItem('allColumns', parsed);


    },
    column2(){
          allColumns = [this.column1, this.column2, this.column3, this.blockOne]


          const parsed = JSON.stringify(this.allColumns);
          localStorage.setItem('allColumns', parsed);

    },
    column3(){
          allColumns = [this.column1, this.column2, this.column3, this.blockOne]


          const parsed = JSON.stringify(this.allColumns);
          localStorage.setItem('allColumns', parsed);


    },
},  
    methods: {
        onSubmit() {
            this.errors = [];
            let points = [];

            if (this.point1) {
                points.push([this.point1, false]);
            }
            if (this.point2) {
                points.push([this.point2, false]);
            }
            if (this.point3) {
                points.push([this.point3, false]);
            }
            if (this.point4) {
                points.push([this.point4, false]);
            }
            if (this.point5) {
                points.push([this.point5, false]);
            }

            if (points.length < 3) {
                this.errors.push("Должно быть заполнено от 3 пунктов");
            }
            if (!this.name) {
                this.errors.push("Не введён заголовок");
            }
            if (this.column1.length >= 3) {
                this.errors.push("Достигнуто максимальное число карточек");
            }

            if (this.errors.length === 0) {
                let info = {
                    name: this.name,
                    points: points,
                    card_id: this.card_id,
                };
                this.card_id += 1;

                this.column1.push(info);

                this.name = null;
                this.point1 = null;
                this.point2 = null;
                this.point3 = null;
                this.point4 = null;
                this.point5 = null;
            }
        },
        toColumnTwo(name, points, card_id, count_of_checked) {
            let info = {
                name: name,
                points: points,
                card_id: card_id,
                count_of_checked: count_of_checked,
            };

            for (let i in this.column1) {
                if (this.column1[i].card_id === card_id) {
                    this.column1.splice(i, 1);
                    break;
                }
            }

            this.column2.push(info);
            if (this.column2.length == 5 && this.column1.length < 3) {
                this.blockOne = true;
            }
        },
        toColumnThree(name, points, card_id) {
            let info = {
                name: name,
                points: points,
                card_id: card_id,
                dat: new Date(),
            };

            for (let i in this.column2) {
                if (this.column2[i].card_id === card_id) {
                    this.column2.splice(i, 1);
                    break;
                }
            }

            this.column3.push(info);
            if(this.column2.length!=5){
                this.blockOne =false;
            }
                },
        Clean(){
            this.column1=[],
            this.column2=[],
            this.column3=[],
            this.dat=[],
            this.blockOne= false

      },
    },
});

Vue.component("card", {
    template: `
        <div class="card">
            <h3>{{ name }}</h3>
            <ul>
                <li v-for="point in points">
                    <task :point="point[0]" :done="point[1]" @checked="updatechecked"></task>
                </li>
            </ul>
            <p v-if="dat">{{ dat }}</p>
        </div>
    `,
    data() {
        return {
            name: null,
            points: [],
        };
    },
    methods: {
        updatechecked(point) {
            for (let i in this.points) {
                if (this.points[i][0] === point && !this.points[i][1]) {
                    this.points[i][1] = true;
                    break;
                }
            }

            let count_of_checked = this.points.filter((point) => point[1]).length;

            if (count_of_checked === this.points.length) {
                this.$emit("to-three", this.name, this.points, this.card_id);
            } else if (count_of_checked >= this.points.length / 2) {
                this.$emit("to-two", this.name, this.points, this.card_id, count_of_checked);
            }
        },
    },
    props: {
        name: {
            type: String,
            required: true,
        },
        points: {
            type: Array,
            required: true,
        },
        card_id: {
            type: Number,
            required: true,
        },
        count_of_checked: {
            type: Number,
            required: true,
        },
        dat: {
            type: String,
            required: false,
        },
    },
});

Vue.component("task", {
    template: `
        <div class="task" 
            @click="check"
            :class="{done: done}">{{ point }}</div>
    `,
    data() {
        return {};
    },
    props: {
        point: {
            type: String,
            required: true,
        },
        done: {
            type: Boolean,
            required: false,
        },
    },
    methods: {
        check() {
            if (!this.done) {
                this.done = true;
                this.$emit("checked", this.point);
            }
        },
    },
});

let app = new Vue({
    el: "#app",
    data: {},
    methods: {},
});