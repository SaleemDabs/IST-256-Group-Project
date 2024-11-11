function getSongsList() {
    $.get("/getList", {}, updateSongs)
}

// function updateImages(jsonList) {
//     console.log('jsonList', jsonList)   
// }