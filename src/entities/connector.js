class Connector
{
    static create(){
        var cp = [];

        for(var i = 0; i < 8; i++){
            cp.push({uuid: uuid, x:0, y:0, r:5});
        }
        return cp;
    }
}
module.exports = Connector;
