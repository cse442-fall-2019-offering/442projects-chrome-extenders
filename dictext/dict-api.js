function get_api_data(){
   word = "data"
   const Url = "http://127.0.0.1:5000/api/" + word
   $.get(Url, function(data, status){
       console.log('${data}')
   })
}