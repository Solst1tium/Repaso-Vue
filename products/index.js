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