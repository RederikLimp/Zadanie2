let eventBus = new Vue()



Vue.component("board", {
    template: `
<div class="board">
<ul>
<li><column></column></li>
<li><column></column></li>
<li><column></column></li>
</ul>
</div>
    `,
    data() {
        return{
            name:null
        }
    }
});
Vue.component("column", {
    template: `
<div class="column">qweqwe</div>
    `,
    data() {
        return{
            name:null
        }
    }
});


Vue.component("task", {
    template: `
<div class="column">task</div>
    `,
    data() {
        return{
            name:null
        }
    }
});




let app = new Vue({
    el: "#app",
    data: {
        product: "Tabl"
    },
    methods: {

    },
});