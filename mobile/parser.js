export default parser = (data) =>{
		var arr = data.split('\'').join('"')
    arr = arr.substr(1, arr.length-2)
    arr = arr.substr(1, arr.length-2)
    arr = arr.split("}, {").map((element)=>{return "{" + element+"}"})
    arr = arr.map((e)=>{ return JSON.parse(e) })
    return arr;
}