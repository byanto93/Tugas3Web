fetch('templates/stock-table.html')

.then(res=>res.text())

.then(template=>{

Vue.component('ba-stock-table',{

    props:[
        'items',
        'upbjj',
        'kategori'
    ],

    data(){

        return {

            filterUpbjj:"",

            filterKategori:"",

            hanyaWarning:false,

            sortBy:"",

            showForm:false,

            modalShow:false,

            deleteIndex:null,

            editIndex:null,

            form:{

                kode:"",

                judul:"",

                kategori:"",

                upbjj:"",

                lokasiRak:"",

                harga:"",

                qty:"",

                safety:"",

                catatanHTML:""

            }

        }

    },

    computed:{

        filteredStok(){

            let hasil =

            this.items.filter(item=>{

                const cocokUpbjj =

                    !this.filterUpbjj ||

                    item.upbjj ==
                    this.filterUpbjj;

                const cocokKategori =

                    !this.filterKategori ||

                    item.kategori ==
                    this.filterKategori;

                const warning =

                    item.qty <= 0 ||

                    item.qty < item.safety;

                if(this.hanyaWarning){

                    return cocokUpbjj &&
                           cocokKategori &&
                           warning;

                }

                return cocokUpbjj &&
                       cocokKategori;

            });

            if(this.sortBy=='judul'){

                hasil.sort((a,b)=>

                    a.judul.localeCompare(
                        b.judul
                    )

                );

            }

            else if(this.sortBy=='qty'){

                hasil.sort((a,b)=>

                    a.qty - b.qty

                );

            }

            else if(this.sortBy=='harga'){

                hasil.sort((a,b)=>

                    a.harga - b.harga

                );

            }

            return hasil;

        }

    },

    watch:{

        filterUpbjj(){

            this.filterKategori="";

        },

        'form.qty'(value){

            if(value < 0){

                alert(
                    'Qty tidak boleh negatif'
                );

                this.form.qty = 0;

            }

        }

    },

    methods:{

        resetFilter(){

            this.filterUpbjj="";

            this.filterKategori="";

            this.hanyaWarning=false;

            this.sortBy="";

        },

        simpanData(){

            if(

                !this.form.kode ||

                !this.form.judul ||

                !this.form.kategori ||

                !this.form.upbjj ||

                !this.form.qty ||

                !this.form.safety

            ){

                alert(
                    'Data belum lengkap'
                );

                return;

            }

            const data = {

                kode:this.form.kode,

                judul:this.form.judul,

                kategori:this.form.kategori,

                upbjj:this.form.upbjj,

                lokasiRak:
                    this.form.lokasiRak,

                harga:
                    parseInt(this.form.harga),

                qty:
                    parseInt(this.form.qty),

                safety:
                    parseInt(this.form.safety),

                catatanHTML:
                    this.form.catatanHTML ||
                    'Data bahan ajar'

            };

            if(this.editIndex !== null){

                this.items.splice(

                    this.editIndex,

                    1,

                    data

                );

                alert(
                    'Data berhasil diupdate'
                );

            }

            else{

                this.items.push(data);

                alert(
                    'Data berhasil ditambah'
                );

            }

            this.closeForm();

        },

        editData(item,index){

            this.editIndex=index;

            this.form={...item};

            this.showForm=true;

        },

        showDelete(index){

            this.deleteIndex=index;

            this.modalShow=true;

        },

        hapusData(){

            this.items.splice(

                this.deleteIndex,

                1

            );

            this.modalShow=false;

            alert(
                'Data berhasil dihapus'
            );

        },

        closeForm(){

            this.showForm=false;

            this.editIndex=null;

            this.form={

                kode:"",

                judul:"",

                kategori:"",

                upbjj:"",

                lokasiRak:"",

                harga:"",

                qty:"",

                safety:"",

                catatanHTML:""

            };

        }

    },

    template:template

});

});