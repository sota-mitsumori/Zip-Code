var input = document.querySelector('#zipcode');
var indicator = document.querySelector('.indicator i');
var info = document.querySelector('.info');
var codelength = /^\d{7}$/;

input.addEventListener('keyup', ()=>{
    if(input.value.match(codelength)){
        console.log("valid Zip");
        $.ajax({
            type: "GET",
            url: "https://zipcloud.ibsnet.co.jp/api/search?zipcode=" + input.value,
            dataType: "json",

            success: (response) => {
                if (response.results && response.results.length > 0) {
                    let result = response.results[0];
                    info.innerHTML = `${result.address1} ${result.address2} ${result.address3}`;

                    indicator.classList.remove('fa-circle-xmark');
                    indicator.classList.add('fa-check');
                    indicator.style.color = 'green'; //change color to show success
                }else{
                    info.innerHTML = "No results found."; 
                }
                
            },
            error: () => {
                info.innerHTML = "An error occured while fetching the data."
                indicator.classList.remove('fa-check');
                indicator.classList.add('fa-circle-xmark');
                indicator.style.color = 'red'; //chnage color to show failure
            }
        });
    }else{
        info.innerHTML = "Type a valid zipcode";
        indicator.classList.remove('fa-check');
        indicator.classList.add('fa-circle-xmark');
        indicator.style.color = 'red'; //chnage color to show failure
    }
});