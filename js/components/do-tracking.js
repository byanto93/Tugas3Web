fetch('templates/do-tracking.html')

.then(res=>res.text())

.then(template=>{

Vue.component('do-tracking',{

    props:[
        'tracking',
        'paket',
        'pengiriman'
    ],

    data(){

        return {

            keyword:"",

            hasil:null,

            showForm:false,

            progressBaru:"",

            form:{

                nim:"",

                nama:"",

                ekspedisi:"",

                paket:""

            }

        }

    },

    computed:{

        selectedPaket(){

            return this.paket.find(p=>

                p.kode ==
                this.form.paket

            );

        }

    },

    watch:{

        keyword(value){

            this.keyword =
                value.toUpperCase();

        },

        'form.nim'(value){

            this.form.nim =
                value.replace(/[^0-9]/g,'');

        }

    },

    methods:{

        cariData(){

            this.hasil = null;

            this.tracking.forEach(item=>{

                const key =

                    Object.keys(item)[0];

                const data =

                    item[key];

                if(

                    key.includes(
                        this.keyword
                    ) ||

                    data.nim.includes(
                        this.keyword
                    )

                ){

                    this.hasil = {

                        nomor:key,

                        ...data

                    };

                }

            });

        },

        resetCari(){

            this.keyword="";

            this.hasil=null;

        },

        tambahDO(){

            if(

                !this.form.nim ||

                !this.form.nama ||

                !this.form.ekspedisi ||

                !this.form.paket

            ){

                alert(
                    'Data belum lengkap'
                );

                return;

            }

            const nomorBaru =

                'DO2025-' +

                String(

                    this.tracking.length + 1

                ).padStart(3,'0');

            const dataBaru = {};

            dataBaru[nomorBaru] = {

                nim:this.form.nim,

                nama:this.form.nama,

                status:'Diproses',

                ekspedisi:
                    this.form.ekspedisi,

                paket:
                    this.form.paket,

                tanggalKirim:
                    new Date()
                    .toLocaleDateString(
                        'id-ID',
                        {

                            day:'numeric',

                            month:'long',

                            year:'numeric'

                        }

                    ),

                total:
                    this.selectedPaket.harga,

                perjalanan:[

                    {

                        waktu:
                        new Date()
                        .toLocaleString(
                            'id-ID'
                        ),

                        keterangan:
                        'Pesanan dibuat'

                    }

                ]

            };

            this.tracking.push(
                dataBaru
            );

            alert(

                'DO berhasil dibuat: ' +

                nomorBaru

            );

            this.closeForm();

        },

        tambahProgress(){

            if(

                !this.progressBaru ||

                !this.hasil

            ){

                return;

            }

            this.hasil.perjalanan.push({

                waktu:
                new Date()
                .toLocaleString(
                    'id-ID'
                ),

                keterangan:
                this.progressBaru

            });

            this.progressBaru="";

            this.hasil.status =
                'Dikirim';

        },

        closeForm(){

            this.showForm=false;

            this.form={

                nim:"",

                nama:"",

                ekspedisi:"",

                paket:""

            };

        }

    },

    template:template

});

});