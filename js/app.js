Vue.filter('rupiah',function(value){

    return 'Rp ' +

    Number(value)
    .toLocaleString('id-ID');

});

Vue.filter('buah',function(value){

    return value + ' buah';

});

new Vue({

    el:'#app',

    data:{

        tab:'stok',

        state:{

            stok:[],

            tracking:[],

            paket:[],

            pengirimanList:[],

            upbjjList:[],

            kategoriList:[]

        }

    },

    async created(){

        this.state =

        await apiService.getData();

    }

});