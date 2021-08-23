<template>
 <v-container :fluid="true">
   <div class="text-center">
    <h2>Registro Imágenes</h2>
    <h3>Fecha:15/04/2021</h3>
   </div>
    <v-form @submit.prevent="Guardar" ref="formularioImagenes">
   <v-row>
        <v-col  cols="12" sm="6" md="3" >
           <v-row no-gutters>
           <v-col cols="10" >
              <v-text-field :autofocus="true" :rules="dniRules" v-model="dni" type="number" color="red darken-4"  label="DNI" dense outlined background-color="red lighten-4" ></v-text-field>
           </v-col>
           <v-col cols="2">
             <v-btn :disabled="dni.length!==8" class="py-1" block dark color="red darken-4" @click="obtenerPacienteImagenes">
                <v-icon>
                  search
                </v-icon>
             </v-btn>
           </v-col>
          </v-row>
         <v-text-field :rules="requeridoRules" v-model="nombres"  color="red darken-4" label="Nombres" dense outlined background-color="red lighten-4" ></v-text-field>
          <v-text-field :rules="requeridoRules" v-model="apellidos"  color="red darken-4" label="Apellidos" dense outlined background-color="red lighten-4" ></v-text-field>
          <v-text-field type="date" v-model="fechaNacimiento" color="red darken-4" label="Fecha de Nacimiento" dense outlined background-color="red lighten-4" ></v-text-field>
        </v-col>
         <v-col cols="12" sm="6" md="5" >
          <!-- El item-text es el valor del nombre del objeto con el que se buscara en el array object  
          ES decir si pongo group o apellido buscara por grupo o apellido pero no recnocera nombre
           sino por el valor que ponga ahi
          -->
          <!-- item-value es el valor que ingresara al array del v-model si es que pongo que sea multiple -->
         <v-row no-gutters>
           <v-col cols="3">
              <v-text-field :rules="requeridoRules" v-model="serie"  color="red darken-4" label="Serie" dense outlined background-color="red lighten-4" ></v-text-field>
           </v-col>
           <v-col cols="9">
             <v-text-field :rules="requeridoRules" v-model="voucher"  color="red darken-4" label="Nro Voucher" dense outlined background-color="red lighten-4" ></v-text-field>
           </v-col>      
         </v-row>
         <v-row no-gutters>
              <v-col cols="6">
                <v-select :items="itemsTipoAtencion" 
                item-color="red darken-4" 
                class="red--text text-lighten-4" 
                label="Tipo de Atencion" 
                color="red darken-4" 
                background-color="red lighten-4"  
                item-text="descripcion"
                item-value="idTipoAtencion"
                v-model="idTipoAtencionSeleccionado"
                dense  
                outlined>
                </v-select>
              </v-col>
              <v-col cols="6">
                <v-select :items="itemsTipoPlaca" 
                item-color="red darken-4" 
                class="red--text text-lighten-4" 
                label="Tipo de Placa" 
                color="red darken-4" 
                background-color="red lighten-4"  
                item-text="descripcion"
                item-value="idTipoPlaca"
                v-model="idTipoPlacaSeleccionada"
                dense 
                outlined>
                </v-select>
            </v-col>
         </v-row>
          
         <v-select :items="itemsEspecialidad" 
              item-color="red darken-4" 
              class="red--text text-lighten-4" 
              label="Especialidad" 
              color="red darken-4" 
              background-color="red lighten-4"  
              item-text="descripcion"
              item-value="idEspecialidad"
              v-model="idEspecialidadSeleccionado"
              dense 
              outlined>
              </v-select>
          <v-row no-gutters>
             <v-col cols="6">
              <v-select :items="itemsMedico" 
              item-color="red darken-4" 
              class="red--text text-lighten-4" 
              label="Med.Informante" 
              color="red darken-4" 
              background-color="red lighten-4"  
              item-text="descripcion"
              item-value="idMedico"
              v-model="idMedicoInformanteSeleccionado"
              dense 
              outlined>
              </v-select>
            </v-col>
              <v-col cols="6">
              <v-select :items="itemsMedico" 
              item-color="red darken-4" 
              class="red--text text-lighten-4" 
              label="Med.Seguimiento" 
              color="red darken-4" 
              background-color="red lighten-4"  
              item-text="descripcion"
              item-value="idMedico"
              v-model="idMedicoSeguimientoSeleccionado"
              dense 
              outlined>
              </v-select>
             </v-col>
           </v-row>
        </v-col>
         <v-col cols="12" sm="6" md="4" >
          
         
         <v-select :items="itemsTipoMuestraImagen" 
              item-color="red darken-4" 
              class="red--text text-lighten-4" 
              label="Tipo Muestra" 
              color="red darken-4" 
              background-color="red lighten-4"  
              item-text="descripcion"
              item-value="idTipoMuestraImagen"
              v-model="idTipoMuestraImagenSeleccionado"
              dense 
              outlined>
              </v-select>
         <div class="d-flex flex-row "  v-if="idTipoMuestraImagenSeleccionado>0" >      
            <v-autocomplete
                  dense
                  v-model="idMuestraImagenSeleccionado"  
                  :items="itemsMuestraImagen"
                  outlined
                  chips
                  deletable-chips
                  color="red darken-4"
                  label="Muestra"
                  item-text="descripcion"
                  item-value="idMuestraImagen"
                background-color="red lighten-4"  >
                  <!-- <template v-slot:item="data">
                      <v-list-item-content active-class="green--text" :disabled="true" >
                        <v-list-item-title @click="saludar()" class="red--text text-lighten-4" v-html="data.item.muestra"></v-list-item-title>
                      </v-list-item-content> 
                  </template> -->
                </v-autocomplete>
            <v-btn :disabled="idMuestraImagenSeleccionado?false:true" icon color="white" class="red darken-4 flex-row mx-2" @click="agregarExamenImagen(idMuestraImagenSeleccionado)" ><v-icon>add</v-icon></v-btn>
  
         </div>   
        </v-col>
      
   </v-row>

   {{examenesImg}}
  <v-row class="ma-0 pa-0" >              
              <v-col cols="12" sm="6" md="6 mb-2" class="ma-0 pa-0" v-for="(item,index) in examenesImg" :key ="index" >
                <v-card  outlined  class="pt-3 mx-1 px-1 red lighten-3" >
                  <v-btn @click="eliminarExamen(examenesImg[index].id)" class="float-right red" :x-small="true" color="white"  icon> <v-icon>close</v-icon></v-btn>
                  <v-row class="ma-0 pa-0">
                <v-col class="ma-0 pa-0  "  cols="11">
                 <h5 class="text-center">{{examenesImg[index].descripcionTipoMuestraCard}} ({{examenesImg[index].descripcionMuestraCard}})</h5> 
              </v-col>
               
               </v-row>           
                  <v-row  justify="center" class="ma-0 pa-0">
                    <v-col  cols="12" sm="12" md="5" class="ma-0  d-flex flex-column justify-space-between align-center"> 
                      <v-img v-if="examenesImg[index].urlVistaPrevia"
                       lazy-src="https://p4.wallpaperbetter.com/wallpaper/741/165/184/glare-light-blurry-dark-wallpaper-preview.jpg"
                        max-height="200"
                        max-width="170"
                        :src="examenesImg[index].urlVistaPrevia"
                      ></v-img>     
                     </v-col>
                      <v-col class="ma-0 pa-0" cols="12" sm="12" md="7">
                       <!-- enctype="multipart/form-data" -->
                          <v-file-input
                                @change="mostrarImagen($event,index)"
                                label="Subir Imagen"
                                background-color="red lighten-4" 
                                v-model="examenesImg[index].archivo"
                                outlined
                                dense
                                :rules="archivoRequerido"
                                show-size
                                counter
                                color="red darken-4"
                           ></v-file-input>
                        <v-row  justify="center" class="ma-0 pa-0">
                          <v-col  cols="5" class="ma-0 pa-0">
                            <v-text-field class="ma-0 pa-0" v-model="examenesImg[index].nroFallas" type="number"  color="red darken-4" label="Fallas" dense outlined background-color="red lighten-4"  ></v-text-field>
                           </v-col>
                          <v-col  cols="7" class="ma-0 pa-0">
                            <v-text-field class="ma-0 pa-0" v-model="examenesImg[index].importe" type="number"  color="red darken-4" label="Importe" dense outlined background-color="red lighten-4"  ></v-text-field>
                           </v-col>
                        </v-row>
                      <v-text-field  v-model="examenesImg[index].fechaAtencion" type="date"  color="red darken-4" label="Fecha Atencion" dense  outlined background-color="red lighten-4"  ></v-text-field>
                      <v-text-field v-model="examenesImg[index].fechaResultado" type="date"  color="red darken-4" label="Entrega del Resultado" dense  outlined background-color="red lighten-4"  ></v-text-field>
                    </v-col>            
                  </v-row>                   
                </v-card>
              </v-col>
      </v-row>

  <v-row justify="center" class="ma-0 pa-0">
    <v-col cols="6">
     <v-btn class="px-5" block dark color="red darken-4" type="submit">Guardar</v-btn>
    </v-col>
  </v-row>
  </v-form>
  <v-row>
     <v-col cols="12"  class="mx-auto">
      <Tabla @fechaActual="obtenerFecha"  ref="tabla"></Tabla >
      </v-col>
  </v-row>
 </v-container>
</template>
<script>
import Tabla from '../components/TablaImagenes.vue'
import {mapState} from 'vuex'
export default {
  name:'ModuloImagenes',
  components:{Tabla},
  data() {
    
    return {  
        dniRules: [(v) => (!!v && (v.length==8) )|| "8 Numeros"],
        requeridoRules: [(v) => !!v || "es requerido"],
        archivoRequerido:[(v)=> (!!v && (v.size>0)) || 'Se requiere Archivo'],
        examenesImg: [],
        itemsEspecialidad:[],
        itemsMedico: [],
        itemsTipoMuestraImagen:[],
        itemsMuestraImagen:[],
        itemsTipoPlaca:[ ],
        itemsTipoAtencion :[],
        idEspecialidad:0,
        idMedicoInformanteSeleccionado:0,
        idMedicoSeguimientoSeleccionado:0,
        idEspecialidadSeleccionado:0,
        idTipoAtencionSeleccionado:0,
        idTipoPlacaSeleccionada:0,
        idTipoMuestraImagenSeleccionado:0,
        idMuestraImagenSeleccionado:0,
        TipoMuestraImagen:'',
        dni:'',
        nombres:'',
        apellidos:'',
        fechaNacimiento:'',
        serie:'',
        voucher:'',
        urlVistaPrevia:'',
        
     }
  },
   mounted(){
    this.listarTipoAtencion();
    this.listarMedico();
    this.listarTipoPlaca();
    this.listarEspecialidad();
    this.listartTipoMuestraImagen();
  },
  computed:{
    ...mapState(['token']),
   
  },
  watch:{
     idTipoMuestraImagenSeleccionado:function(val){
              if(val>0) this.listarMuestraImagen(val)
          }
  },
  methods: {
    obtenerFecha(i){
          const hoy = new Date();
          var año=hoy.getFullYear()
          var mes=(hoy.getMonth() + 1)
              mes=(mes<10)?('0'+mes):mes;
          var dia=hoy.getDate()
              dia=(dia<10)?('0'+dia):dia;
            if(i==0){ return año+'-'+mes+'-'+dia;}
            else{
                  if(hoy.getDay()==6){
                     dia =Number(dia)+2
                     dia=dia<10?('0'+dia):dia;
                     return año+'-'+mes+'-'+dia;
                  }
                  else{
                     dia =(Number(dia)+1);
                     dia=dia<10?('0'+dia):dia;
                     return año+'-'+mes+'-'+dia;
                  }
              }
      },
    agregarExamenImagen(idMuestra){
       var desc='';
       var descMuestra='';
       var existe=false;
       var registroImagenes = this.$refs.formularioImagenes.validate();
      if(idMuestra  && registroImagenes){
        //comprobando si existe el examen
          this.examenesImg.filter(e=> {if(e.id==idMuestra){existe=true}})
         if(!existe){
              this.itemsMuestraImagen.filter(e=>{
                if(e.idMuestraImagen==idMuestra) desc=e.descripcion
                return
              })
              this.itemsTipoMuestraImagen.filter(e=>{
                if(e.idTipoMuestraImagen==this.idTipoMuestraImagenSeleccionado) descMuestra=e.descripcion
                return
              })
                this.examenesImg.push({
                            id:idMuestra,
                            descripcionMuestraCard:desc,
                            descripcionTipoMuestraCard:descMuestra,
                            urlVistaPrevia:'',
                            fechaRegistroExamen:this.obtenerFecha(0),
                            fechaAtencion:this.obtenerFecha(0),
                            fechaResultado:this.obtenerFecha(1),
                            nroVoucher:this.serie+'-'+this.voucher,
                            importe:0,
                            archivo:[],
                            idEspecialidad:this.idEspecialidadSeleccionado,
                            idTipoAtencion:this.idTipoAtencionSeleccionado,
                            idMuestraImagen:this.idMuestraImagenSeleccionado,
                            idTipoPlaca:this.idTipoPlacaSeleccionada,
                            nroFallas:0,
                            detalleRolMedico:[{
                              idMedico:this.idMedicoSeguimientoSeleccionado,
                              idRolMedico:1 //ID  SEGUIMIENTO
                              },{
                              idMedico:this.idMedicoInformanteSeleccionado,
                              idRolMedico:2 //ID INFORMANTE
                              }]
                          })
                  this.idMuestraImagenSeleccionado='';
                  desc='';
                  descMuestra='';
                }else{
                    this.idMuestraImagenSeleccionado='';
                } 
         }
    },
      
    eliminarExamen(i){
     this.examenesImg=this.examenesImg.filter(e=>{ if(e.id!=i) return e})
    },
  
     async mostrarImagen(evt,i){
       console.log(evt)
       //crea una url pequeña a diferencia de FileReader();             
         if(evt)
          this.examenesImg[i].urlVistaPrevia=URL.createObjectURL(evt);
         else
          this.examenesImg[i].urlVistaPrevia=""    
          //FileReader ayuda a crear un blob mas grande para descargar o mostrarla en otra pagina 
        //       let reader= new FileReader();
        //       reader.readAsDataURL(evt)
        //       reader.onload=(event)=>{
        //       this.examenesImg[i].urlVistaPrevia=event.target.result;
        //     }
          
     },
    obtenerPacienteImagenes(){

    },
    obtenerDescripcionMuestra(id){
        this.itemsMuestraImagen.filter(e=> {return  e.idMuestraImagen==id? e.descripcion:''})
    },
    Guardar(){
      let formData = new FormData();
      let archivos=[];
      for (let i=0; this.examenesImg.length>i; i++) {
        //es necesaro enviar un paramatro mas el nombre del archivo cuando es multiple
         formData.append("images", this.examenesImg[i].archivo,this.examenesImg[i].archivo.name);  }
  
        //too large un error del servidor porque el dato de la url es muy larga, por ello lo ponemos vacio
    //  let examenesImgTemp=this.examenesImg.filter(e=> {e.urlVistaPrevia=''; return e})
      formData.append("dni",this.dni);
      formData.append("nombres",this.nombres);
      formData.append("apellidos",this.apellidos);
      formData.append("fechaNacimiento",this.fechaNacimiento);
      formData.append("telefono","");
      formData.append("empresa","PAMS");
      //formData pasa todo a string  por eso le paso convertido a string
      //para que el servidor lea todos los datos y no muestr '[OBJECT OBJECT]'
      formData.append("examenes",JSON.stringify(this.examenesImg));

  var headers={
        "Content-Type":"application/json",
        token:this.token
      }
    
        if( this.$refs.formularioImagenes.validate()){
          this.axios.post('/guardarExamImagenes',formData,{headers})
          .then(res=>{
            console.log(res)
            this.$refs.tabla.listarExamenesImagenes();
          })
          .catch(err=>{
            console.log(err);
          })
      }

    },
    obtenerUrlImagen(buffer){
            var arrayBuffer=buffer;       
            var array = new Uint8Array(arrayBuffer);
            var blob = new Blob([array], { type: 'application/pdf' });
            const blobUrl = URL.createObjectURL(blob);
            console.log(blobUrl);
        return blobUrl;        
    },
    Modificar(){

    },

    listartTipoMuestraImagen(){
          this.axios.get('/listarTipoMuestraImagen').then(res=>{ this.itemsTipoMuestraImagen=res.data; })
          .catch(err=>{ console.log(err) })
    },
    listarMuestraImagen(id){
    
        this.axios.post('/listarMuestraImagen',{idTipoMuestraImagen:id}).then(res=>{this.itemsMuestraImagen=res.data})
        .catch(err=>{console.log(err)})
      },
    listarMedico(){
        this.axios.get('/listarMedico').then(res=>{ this.itemsMedico=res.data;
        }).catch(err=>{ console.log(err) })
      },
    listarTipoAtencion(){
        this.axios.get('/listarTipoAtencion').then(res=>{this.itemsTipoAtencion=res.data;
        }) .catch(err=>{ console.log(err)  })
    },
    listarTipoPlaca(){
        this.axios.get('/listarTipoPlaca').then(res=>{this.itemsTipoPlaca=res.data;
        }).catch(err=>{console.log(err)})
    },
    listarEspecialidad(){
        this.axios.get('/listarEspecialidad').then(res=>{this.itemsEspecialidad=res.data;
        }).catch(err=>{console.log(err)})
    }
  },
}
</script>
<style >
.headerStyleLeft{
  border-top-left-radius:4px;
}
.headerStyleRigtht{
  border-top-right-radius:4px;
}
/* Chrome, Safari, Edge, Opera */
input[type=number]::-webkit-outer-spin-button,
input[type=number]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
/* input[type="number"] {
    -moz-appearance: textfield;
} */
</style>
