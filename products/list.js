Vue.component("review-list", {
    template:"#template-list",
    props:{
        reviews: {
            type: Array,
            required: true
        }
    }
})
