fetch('templates/status-badge.html')

.then(res=>res.text())

.then(template=>{

    Vue.component('status-badge',{

        props:[
            'qty',
            'safety',
            'catatan'
        ],

        template:template

    });

});