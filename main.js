Vue.component("detail-product",{
  template:"#template-detail",
  props:{
    details:{
      type: Array,
      required:true
    }
  }




})


Vue.component("review-send", {
    template:"#template-send",
    props:{
        send: {
            type: String,
            required: true
        }
    }    
})

Vue.component("review-list", {
    template:"#template-list",
    props:{
        reviews: {
            type: Array,
            required: true
        }
    }
})

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

Vue.component("reviews-form", {
    template: '#template-form',
    data(){
        return {
            email: null,
            review: null,
            rating: null,
            errors: {}
        }
    },
    methods: {
        saveReview(){           
                if(this.review && this.rating && this.email){
                    let productReview = {
                email: this.email,
                review: this.review,
                rating: this.rating
            }
            eventBus.$emit("review-added", productReview)
            this.email = null
            this.review = null
            this.rating = null
           
        }else{

            error.push("ocurrio un error")
            console.log("datos inválidos")
        }
    }




    }
})

Vue.component ("product", { //primero dos argumentos el nombre del componente y obejeto (vacio) segundo argumento
props:{
  premium: {/*el que define el props es quién lo recibe, informacion que se enviará del padre al hijo con props*/
    type: Boolean,
    required: true,    
  },
  cart: {
      type: Array,
      required: true
  }

},
  data() {
    return{
          description:'loren ipsum',
          product: 'Longaniza de Brocolli',
          selectedVariant: {},
          link:'./longaniza.html',
          details: ["500 gr", "organica", "libre de colesterol"],
          variants:[{
              id:5,
              type:'red',
              img: 'assets/roja.jpeg',
              stock:10,
              default: true
          },
          {
              id:4,
              type:'white',
              img: 'assets/blanca.png',
              stock: 0
            },
            
        ],
        reviews: [] 

      }
  },
  methods: {//hijo
          updateProduct(variant) {
            this.selectedVariant=variant;
        },
        addToCart(){
         this.$emit("add-to-cart", this.selectedVariant)
          this.selectedVariant.stock-=1
        },
        removeFromCart(){   
            var variantInCart = this.cart.find(product => product== this.selectedVariant)        
            
            if(variantInCart){
              this.$emit("remove-from-cart", this.selectedVariant)
            this.selectedVariant.stock+=1    
             }     
        },
        /*
        addReview(review){ //se recibe informacion de los review del hijo (product nuevo padre de reviews)
            this.reviews.push(review)
        }*/
      },


  computed: {
        inStock(){
           return this.stock>0 ? true :false //retornar el stock >0 ? (if) es verdadero : (si no)  es falso 
        },
        img(){
          return this.selectedVariant.img
        },
        stock(){
          return this.selectedVariant.stock
        },

        shipping(){
            
            return this.premium == true ? "Gratis" : "2.000"
        }
      },

      created() {
        
        this.selectedVariant= this.variants.find(item => item.default ==true)
        
      },

      mounted() {// evento que ocurre dentro del ccilo de vida del componente
        eventBus.$on("review-added", review =>this.reviews.push(review))
          
      },
      

  template: '#template-product'  
  })

var eventBus= new Vue() //evento global que se usará como bs para comnicar componentes entre si

    var app = new Vue({
        el: '#app',
        data:{
          cart:[],
          premium: true,
          showStyle: {
            display: "block",
            "padding-right": "16px",
            "padding-top": "20px"
            },
          displayCart: false
        },
        methods: {//los metodos se pueden separar con mayusculas
          addToCart(variant){
            this.cart.push(variant);
          },

          removeFromCart(variant){
            var index = this.cart.indexOf(variant)//indexOff devuelve la posicion del objeto dentro del arreglo
            if(index>-1){
              this.cart.splice(index, 1)//splice elimina el objeto con ese indice (index) y borra 1 de los objetos por posicion
            }
          }
        },
        computed:{
          modalStyle(){
            if(this.displayCart){
              return this.showStyle
            }
            else{
              return {}
            }
          }
        }
    })