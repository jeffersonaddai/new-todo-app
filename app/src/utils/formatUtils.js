module.exports = {
    formatDate: function(date){
        let month = date.getMonth() + 1 ;
        month = month < 10 ? "0" + month : month;
        return `${date.getFullYear()}-${month}-${date.getDate()}`
    }
}