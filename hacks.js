var app = new Vue({
	el:'#app',	
	data: {
		buscador: '',
		razas: [],
		cont: '0',
		url: [],
		filtrofavs: true,
		filtroaumentar: false,
		imagenaumentada: '',
		favs: localStorage.getItem('perros') ? JSON.parse(localStorage.getItem('perros')) : []
	},
	mounted() {
    	axios.get("https://dog.ceo/api/breeds/list")
    	.then(response => {this.razas = response.data.message})
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
		},
		togglefav: function(){
			if(!this.filtrofavs){
				return 'chosen';
			}else{
				return '';
			}
		}
	},
	methods: {
		boton: function(){
			console.log(this.filtroraza);
			this.url=[];
			do{
				if(this.filtroraza.length<5){
					for (var i = 0; i < 5; i++) {
						axios.get("https://dog.ceo/api/breed/"+this.filtroraza[this.cont]+"/images/random").then(response =>{this.url.push(response.data.message)});
					}
				}else if(this.filtroraza.length<10){
					for (var i = 0; i < 3; i++) {
						axios.get("https://dog.ceo/api/breed/"+this.filtroraza[this.cont]+"/images/random").then(response =>{this.url.push(response.data.message)});
					}
				}else{
					axios.get("https://dog.ceo/api/breed/"+this.filtroraza[this.cont]+"/images/random").then(response =>{this.url.push(response.data.message)});
				}
				this.cont++;
			}while(this.cont<this.filtroraza.length);
			this.cont='0';
			console.log(this.url);
		},
		limpiar: function(){
			this.url=[];
		},
		descargar: function(uri, name) {
		    var link = document.createElement("a");
		    link.download = name;
		    link.href = uri;
		    link.click();
		},
		favoritos: function(uri) {
			var found=false;
			for (var i = 0; i < this.favs.length; i++) {
				if(this.favs[i][0]==uri){
					found=true;
					console.log("valor encontrado"+this.favs[i][0]+" toma: "+uri);
					this.favs.splice(i,1);
					localStorage.setItem('perros', JSON.stringify(this.favs));
				}
			}
			if(!found){
				var perrazo=[uri,true];
				this.favs.push(perrazo);
				localStorage.setItem('perros', JSON.stringify(this.favs));
				const data = JSON.parse(localStorage.getItem('perros'));
				console.log(this.favs);
			}
		},
		favos: function(){
			this.filtrofavs= !this.filtrofavs;
		},
		limpiarfavs: function(){
			this.favs=[];
			localStorage.clear();
		},
		chosen: function(urlfot, valorfav){
			if(valorfav){
				return 'chosen';
			}else{
				for (var i = 0; i < this.favs.length; i++) {
				if(this.favs[i][0]==urlfot){
					console.log(this.favs[i][0]+" "+urlfot);
					return 'chosen';
				}
			}
				return '';
			}
		},
		aumentar: function(urlimg){
			this.filtroaumentar= !this.filtroaumentar;
			this.imagenaumentada=urlimg;
		}
	}
});
