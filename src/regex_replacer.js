async function regex(result){
    var sumber = new RegExp('Sumber:(.*)');
    var lirik = new RegExp('Lirik(.*)');
    var Penulis = new RegExp('Penulis lagu:(.*)')
    var p = await result.replace(result.match(sumber)[0],'')
    var q = await p.replace(p.match(lirik)[0],'')
    var r = await q.replace(q.match(Penulis)[0],'')
    return await r;
}
module.exports = { regex };