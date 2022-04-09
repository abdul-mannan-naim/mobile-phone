const main = document.getElementById('main')
const errorMessage = document.getElementById('errorMessage')
const inputField = document.getElementById('input-field');

const phoneLoad = () => {
  const searchText = inputField.value;
  if (!searchText) {
    errorMessage.innerText = "Write a brand name"
    main.innerHTML=''
    inputField.value = ''
  }
 else{
  const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
  fetch(url)
    .then(res => res.json())
    .then(data => phoneDisplay(data.data))
  main.innerHTML = ''
  inputField.value = ''
  errorMessage.innerHTML =''
 }
}

const phoneDisplay = (data) => {
  console.log(data)
const first30phone =data.slice(0,30)
if(data.length===0){
  errorMessage.innerText = "Please Try another phone..."
  main.innerHTML=''
  inputField.value = ''
}
else{
  for (const phone of first30phone) {
    const div = document.createElement('div');
    // div.classList.add("col-lg-4")
    div.classList.add("col-lg-3")
    div.classList.add("mb-5")
    div.innerHTML = `
<div class="card mx-auto mt-5 p-3 " style="width: 18rem; background-color: rgba(0,0,255,.1)">
  <img src="${phone.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title text-center">${phone.brand}</h5>
    <p class="card-text text-center">${phone.phone_name}</p>
    <p class="card-text text-center">${phone.slug}</p>
    <button onclick="phoneDetails('${phone.slug}')" class="btn btn-primary">Details</button>
  </div>
</div>
`
    main.appendChild(div)
  }
}
}
const phoneDetails = (slug) => {
  const url = ` https://openapi.programming-hero.com/api/phone/${slug}`
  fetch(url)
    .then(res => res.json())
    .then(data => individualDelails(data.data))
}
const individualDelails = (data) => {
  console.log(data)
  const div = document.createElement('div');
  main.innerHTML = ''
  div.innerHTML = `
<div class="card mx-auto mt-5 p-3 " style="width: 18rem; background-color: rgba(0,0,255,.1)">
  <img src="${data.image}" class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title text-center">${data.brand}</h5>
    <h5 class="text-center">${data.mainFeatures.storage}</h5>
    <h5 class="text-center">${data.mainFeatures.displaySize}</h5>
    <h5 class="text-center">${data.others.USB}</h5>
    <h5 class="text-center">${data.others.WLAN}</h5>
    <p class="card-text text-center">${data.releaseDate}</p>  
  </div>
</div>
`
  main.appendChild(div)
}