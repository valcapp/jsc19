/*
This module has 2 classes:
jsonForm transform an object of any architecure into an array of strings
jsonRead read that array and rebuild the original object, it can be useful to send forms from web pages
 */

class jsonForm{
    constructor(start, prefix=''){
        this.data = {}
        this.collapse(start,prefix);
        return this.data;
    }

    collapse(next,prev){
        if ( next instanceof Array ){
            next.forEach((item,i)=>{
                this.collapse(item,prev+`[${i}:`);
            });
        } else if ( next instanceof Object ) {
            for( let key in next ){
                this.collapse(next[key],prev+`{${key}:`);
            }
        } else if (typeof(next)==='string'||next instanceof String){
            this.data[prev]=next;
        }
    }
}

class jsonRead{
    constructor(start,prefix=''){
        this.data = {};
        Object.keys(start).forEach(name=>{
            const next = name.substring(prefix.length);
            this.read(next,this,'data',start[name]);
        });
        return this.data;
    }

    read(next,prev,parent,value){
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
                obj[key]=value;
                return;
            }
            // console.log('KEY:: ',key)
            // console.log('PREV[PARENT][KEY]:: ', prev[parent][key])
            this.read(next,obj,key,value);
        }
    }
}

function testJsonForm(testObj=null,prefix=''){
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

    const collapsed = new jsonForm(testObj,prefix);

    console.log('\ncollapsed object:\n',collapsed);

    const rebuilt = new jsonRead(collapsed,prefix);

    console.log('\nrebuilt object:\n',rebuilt);

    const recollapsed = new jsonForm(rebuilt,prefix);

    console.log('\nrecollapsed object:\n',recollapsed);

    const check = Object.keys(collapsed).filter(
        key=>{
            if ( key in recollapsed ){
                return !collapsed[key]===recollapsed[key];
            } else return true;
        }
    ).length<1;
    

    console.log('\nIs the original object the same as the rebuilt one?\n',check)

}
// testJsonForm();

if (typeof module === 'object' && module.exports){
    exports.write = (obj,prefix) => new jsonForm(obj,prefix);
    exports.read = (obj,prefix) => new jsonRead(obj,prefix);
}

// testObj = { 
//     "tabs":[
//         {
//             "name":"main",
//             "inputs":[
//                 {
//                     "question":"what is the g factor?",
//                     "variable":"g factor"
//                 },
//                 {
//                     "question":"what is the many subscript variable?",
//                     "variable":"many subs var[a,i3,x1]"
//                 },
//                 {
//                     "variable":"many subs var[b,i3,x1]"
//                 }
//             ]
//         },
//         {
//             "name":"random Name"
//         }
//     ]
// };
// testJsonForm(testObj,'setupForm');