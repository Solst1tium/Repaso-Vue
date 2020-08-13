Vue.component("product-tabs", {
    template:"#template-tabs",
    props:{
        reviews: {
            type: Array,
            required: true
        },
        send:{
            type:String,
            required:true
        },

        details:{
          type: Array,
          required:true
        }
    }, 
    data(){
        return {
            tabs: ["agregar review", "ver review", "envio", "detalles"],
            selectedTab: "agregar review",
        }
    },
})