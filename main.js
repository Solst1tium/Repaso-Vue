
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