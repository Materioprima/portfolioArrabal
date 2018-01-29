var app = new Vue({
	el:'#app',	
	data: {
		buscador: '',
		razas: []
	},
	computed: {
		filtroraza: function(){
			var razasdat = this.razas,
            buscador = this.buscador;

            if(!buscador){
                return razasdat;
            }

            buscador = buscador.trim().toLowerCase();

            razasdat = razasdat.filter(function(item){
                if(item.toLowerCase().indexOf(buscador) !== -1){
                    return item;
                }
            })

            // Return an array with the filtered data.
            return razasdat;
		}
	},
	methods: {
		boton: function(){
			console.log(this.razas);
			var hola="k tal";
			this.razas.push(hola);
		}
	}
});