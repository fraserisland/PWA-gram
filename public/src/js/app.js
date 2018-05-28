let deferredPrompt

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceworker.js')
  .then(function() {
    console.log('service worker registered!')
  })
  .catch(function(err){
    console.log(err)
  })
}

window.addEventListener('beforeinstallation', function(event){
  console.log('beforeinstallprompt fired')
  event.preventDefault()
  defferedPrompt = event
  return false
})

var promise = new Promise(function(resolve, reject){
  setTimeout(function(){
    reject({code: 500, message: 'an error occurred'})
    // console.log('this is executed after timer.')
  }, 3000)
})

//OLD AJAX LOGIC
// var xhr = new XMLHttpRequest()
// xhr.open('GET', "https://httpbin.org/ip")
// xhr.responseType = 'json'
//
// xhr.onload = function(){
//   console.log(xhr.response)
// }
//
// xhr.onerror = function(){
//   console.log('Error!')
// }
//
// xhr.send()


fetch("https://httpbin.org/ip")
.then(function(response){
  console.log(response)
  return response.json()
})
.then(function(data){
  console.log(data)
})
.catch(function(err){
  console.log(err)
})

fetch("https://httpbin.org/post", {
  method: "POST",
  headers: {
    'Content-Type': 'application/json',
    'Accept' : 'application/json'
  },
  body: JSON.stringify({message: 'Does this work?'})
})
.then(function(response){
  console.log(response)
  return response.json()
})
.then(function(data){
  console.log(data)
})
.catch(function(err){
  console.log(err)
})


// promise.then(function(text){
//   return text
// },function(err){
//   console.log(err.code, err.message)
// }).then(function(newText){
//   console.log(newText)
// })

promise.then(function(text){
  return text
}).then(function(newText){
  console.log(newText)
}).catch(function(err){
  console.log(err.code, err.message)
})

console.log('this is exectuted after set timeout.')
