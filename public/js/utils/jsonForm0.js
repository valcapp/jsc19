/*
This module has 2 classes:
jsonForm transform an object of any architecure into an array of strings
jsonRead read that array and rebuild the original object, it can be useful to send forms from web pages
 */

class jsonForm{
    constructor(start){
        this.data = []
        this.collapse(start);
        return this.data;
    }

    collapse(next,prev=''){
        if ( next instanceof Array ){
            next.forEach((item,i)=>{
                this.collapse(item,prev+`[${i}:`);
            });
        } else if ( next instanceof Object ) {
            for( let key in next ){
                this.collapse(next[key],prev+`{${key}:`);
            }
        } else if (typeof(next)==='string'||next instanceof String){
            this.data.push(prev+next);
        }
    }
}

class jsonRead{
    constructor(names){
        this.data = {};
        names.forEach(name=>this.read(name,this,'data'));
        return this.data;
    }

    read(next,prev,parent){
        // console.log('\nNEXT:: ',next)
        // console.log('PREV:: ',prev)
        // console.log('PARENT:: ',parent)
        // console.log('PREV[PARENT]:: ', prev[parent])
        let obj = prev[parent],
            sep = next.indexOf(':');
        if (sep>0){
            let key = next.substring(1,sep);
            next = next.substring(sep+1);
            if(!obj[key]){
                obj[key] =
                    next[0]==='[' ? [] :
                    next[0]==='{' ? {} :
                    null;
            }
            if (obj[key]===null){
                obj[key]=next;
                return;
            }
            // console.log('KEY:: ',key)
            // console.log('PREV[PARENT][KEY]:: ', prev[parent][key])
            this.read(next,obj,key);
        }
    }
}

function testJsonForm(testObj=null){
    testObj = testObj? testObj :
        {
            'hello':[
                'something',
                'something else',
                'whatherver'
            ],
            'hello2':{
                'key-in-hello2':'someContent',
                'another-key':"someOther Content"
            },
            "not very structured":"ImeanContent"
        };

    console.log('\noriginal object:\n',testObj)

    const collapsed = new jsonForm(testObj);

    console.log('\ncollapsed object:\n',collapsed);

    const rebuilt = new jsonRead(collapsed);

    console.log('\nrebuilt object:\n',rebuilt);

    const recollapsed = new jsonForm(rebuilt);

    console.log('\nrecollapsed object:\n',recollapsed);

    const check = collapsed.filter(
        (line,i)=>!(line===recollapsed[i])
    ).length<1

    console.log('\nIs the original object the same as the rebuilt one?\n',check)

}
// testJsonForm();

exports.write = (obj) => new jsonForm(obj);
exports.read = (obj) => new jsonRead(obj);
