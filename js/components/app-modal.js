fetch('templates/app-modal.html')

.then(res=>res.text())

.then(template=>{

    Vue.component('app-modal',{

        props:[
            'show'
        ],

        template:template

    });

});