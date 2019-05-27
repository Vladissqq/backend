function onSignin(googleUser){
    let profile = googleUser.getBasicProfile();
}

// let loginWithFacebook = (response) => {
//     FB.login(response => {
//         console.log(response)
//     })
// }
let loginWithFacebook = _ => _

function fbSDKLoaded() {
    FB.getLoginStatus(response => {
        console.log(response)
        if(response.status == "not_authorized" || response.status =="unknown") {
            loginWithFacebook =_ => {
                FB.login(response => {
                    console.log(response)
                },{scope: 'public_profile,email'})
            }
        }
    })
}