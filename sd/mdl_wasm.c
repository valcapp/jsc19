/*(Fri May 29 20:20:35 2020) From placeholder.mdl - C equations for the model */

#define _VDFX
#define VDFX

#pragma warning (disable : 4101) //Turn off warning for unreferenced local variable
#pragma warning (disable : 4005) //Turn off warnings for macro redefinition
#pragma warning (disable : 4305) //Turn off warnings for truncation from 'double' to 'REAL'

#define WASM
#define _WASM

typedef unsigned char charutf8;
#define NUM_VARS 278
#define NUM_LEVELS 91
#define NUM_DELAYS 0
#define NUM_AUX 187
#define NUM_LOOKUPS 1


charutf8 *strVarNames[NUM_VARS] = { 
"Time" 	/*0*/
, "stock abc[a,x1]" 	/*1*/
, "stock abc[a,x2]" 	/*2*/
, "stock abc[a,x3]" 	/*3*/
, "stock abc[a,x4]" 	/*4*/
, "stock abc[a,x5]" 	/*5*/
, "stock abc[b,x1]" 	/*6*/
, "stock abc[b,x2]" 	/*7*/
, "stock abc[b,x3]" 	/*8*/
, "stock abc[b,x4]" 	/*9*/
, "stock abc[b,x5]" 	/*10*/
, "stock abc[c,x1]" 	/*11*/
, "stock abc[c,x2]" 	/*12*/
, "stock abc[c,x3]" 	/*13*/
, "stock abc[c,x4]" 	/*14*/
, "stock abc[c,x5]" 	/*15*/
, "stock xyz[x1,i1,x]" 	/*16*/
, "stock xyz[x1,i1,y]" 	/*17*/
, "stock xyz[x1,i1,z]" 	/*18*/
, "stock xyz[x1,i2,x]" 	/*19*/
, "stock xyz[x1,i2,y]" 	/*20*/
, "stock xyz[x1,i2,z]" 	/*21*/
, "stock xyz[x1,i3,x]" 	/*22*/
, "stock xyz[x1,i3,y]" 	/*23*/
, "stock xyz[x1,i3,z]" 	/*24*/
, "stock xyz[x1,i4,x]" 	/*25*/
, "stock xyz[x1,i4,y]" 	/*26*/
, "stock xyz[x1,i4,z]" 	/*27*/
, "stock xyz[x1,i5,x]" 	/*28*/
, "stock xyz[x1,i5,y]" 	/*29*/
, "stock xyz[x1,i5,z]" 	/*30*/
, "stock xyz[x2,i1,x]" 	/*31*/
, "stock xyz[x2,i1,y]" 	/*32*/
, "stock xyz[x2,i1,z]" 	/*33*/
, "stock xyz[x2,i2,x]" 	/*34*/
, "stock xyz[x2,i2,y]" 	/*35*/
, "stock xyz[x2,i2,z]" 	/*36*/
, "stock xyz[x2,i3,x]" 	/*37*/
, "stock xyz[x2,i3,y]" 	/*38*/
, "stock xyz[x2,i3,z]" 	/*39*/
, "stock xyz[x2,i4,x]" 	/*40*/
, "stock xyz[x2,i4,y]" 	/*41*/
, "stock xyz[x2,i4,z]" 	/*42*/
, "stock xyz[x2,i5,x]" 	/*43*/
, "stock xyz[x2,i5,y]" 	/*44*/
, "stock xyz[x2,i5,z]" 	/*45*/
, "stock xyz[x3,i1,x]" 	/*46*/
, "stock xyz[x3,i1,y]" 	/*47*/
, "stock xyz[x3,i1,z]" 	/*48*/
, "stock xyz[x3,i2,x]" 	/*49*/
, "stock xyz[x3,i2,y]" 	/*50*/
, "stock xyz[x3,i2,z]" 	/*51*/
, "stock xyz[x3,i3,x]" 	/*52*/
, "stock xyz[x3,i3,y]" 	/*53*/
, "stock xyz[x3,i3,z]" 	/*54*/
, "stock xyz[x3,i4,x]" 	/*55*/
, "stock xyz[x3,i4,y]" 	/*56*/
, "stock xyz[x3,i4,z]" 	/*57*/
, "stock xyz[x3,i5,x]" 	/*58*/
, "stock xyz[x3,i5,y]" 	/*59*/
, "stock xyz[x3,i5,z]" 	/*60*/
, "stock xyz[x4,i1,x]" 	/*61*/
, "stock xyz[x4,i1,y]" 	/*62*/
, "stock xyz[x4,i1,z]" 	/*63*/
, "stock xyz[x4,i2,x]" 	/*64*/
, "stock xyz[x4,i2,y]" 	/*65*/
, "stock xyz[x4,i2,z]" 	/*66*/
, "stock xyz[x4,i3,x]" 	/*67*/
, "stock xyz[x4,i3,y]" 	/*68*/
, "stock xyz[x4,i3,z]" 	/*69*/
, "stock xyz[x4,i4,x]" 	/*70*/
, "stock xyz[x4,i4,y]" 	/*71*/
, "stock xyz[x4,i4,z]" 	/*72*/
, "stock xyz[x4,i5,x]" 	/*73*/
, "stock xyz[x4,i5,y]" 	/*74*/
, "stock xyz[x4,i5,z]" 	/*75*/
, "stock xyz[x5,i1,x]" 	/*76*/
, "stock xyz[x5,i1,y]" 	/*77*/
, "stock xyz[x5,i1,z]" 	/*78*/
, "stock xyz[x5,i2,x]" 	/*79*/
, "stock xyz[x5,i2,y]" 	/*80*/
, "stock xyz[x5,i2,z]" 	/*81*/
, "stock xyz[x5,i3,x]" 	/*82*/
, "stock xyz[x5,i3,y]" 	/*83*/
, "stock xyz[x5,i3,z]" 	/*84*/
, "stock xyz[x5,i4,x]" 	/*85*/
, "stock xyz[x5,i4,y]" 	/*86*/
, "stock xyz[x5,i4,z]" 	/*87*/
, "stock xyz[x5,i5,x]" 	/*88*/
, "stock xyz[x5,i5,y]" 	/*89*/
, "stock xyz[x5,i5,z]" 	/*90*/
, "adjusted feedback[x1]" 	/*91*/
, "adjusted feedback[x2]" 	/*92*/
, "adjusted feedback[x3]" 	/*93*/
, "adjusted feedback[x4]" 	/*94*/
, "adjusted feedback[x5]" 	/*95*/
, "aggregate stocks[x1]" 	/*96*/
, "aggregate stocks[x2]" 	/*97*/
, "aggregate stocks[x3]" 	/*98*/
, "aggregate stocks[x4]" 	/*99*/
, "aggregate stocks[x5]" 	/*100*/
, "FINAL TIME" 	/*101*/
, "growth rate a" 	/*102*/
, "growth rate abc[a]" 	/*103*/
, "growth rate abc[b]" 	/*104*/
, "growth rate abc[c]" 	/*105*/
, "INITIAL TIME" 	/*106*/
, "SAVEPER" 	/*107*/
, "\"test =\"" 	/*108*/
, "\"test [\"" 	/*109*/
, "feedback var[x1]" 	/*110*/
, "feedback var[x2]" 	/*111*/
, "feedback var[x3]" 	/*112*/
, "feedback var[x4]" 	/*113*/
, "feedback var[x5]" 	/*114*/
, "g factor" 	/*115*/
, "growth rate b" 	/*116*/
, "growth rate c" 	/*117*/
, "growth rate x" 	/*118*/
, "growth rate xyz[x]" 	/*119*/
, "growth rate xyz[y]" 	/*120*/
, "growth rate xyz[z]" 	/*121*/
, "growth rate y" 	/*122*/
, "growth rate z" 	/*123*/
, "i factor[i1]" 	/*124*/
, "i factor[i2]" 	/*125*/
, "i factor[i3]" 	/*126*/
, "i factor[i4]" 	/*127*/
, "i factor[i5]" 	/*128*/
, "inflow abc[a,x1]" 	/*129*/
, "inflow abc[a,x2]" 	/*130*/
, "inflow abc[a,x3]" 	/*131*/
, "inflow abc[a,x4]" 	/*132*/
, "inflow abc[a,x5]" 	/*133*/
, "inflow abc[b,x1]" 	/*134*/
, "inflow abc[b,x2]" 	/*135*/
, "inflow abc[b,x3]" 	/*136*/
, "inflow abc[b,x4]" 	/*137*/
, "inflow abc[b,x5]" 	/*138*/
, "inflow abc[c,x1]" 	/*139*/
, "inflow abc[c,x2]" 	/*140*/
, "inflow abc[c,x3]" 	/*141*/
, "inflow abc[c,x4]" 	/*142*/
, "inflow abc[c,x5]" 	/*143*/
, "inflow xyz[x1,i1,x]" 	/*144*/
, "inflow xyz[x1,i1,y]" 	/*145*/
, "inflow xyz[x1,i1,z]" 	/*146*/
, "inflow xyz[x1,i2,x]" 	/*147*/
, "inflow xyz[x1,i2,y]" 	/*148*/
, "inflow xyz[x1,i2,z]" 	/*149*/
, "inflow xyz[x1,i3,x]" 	/*150*/
, "inflow xyz[x1,i3,y]" 	/*151*/
, "inflow xyz[x1,i3,z]" 	/*152*/
, "inflow xyz[x1,i4,x]" 	/*153*/
, "inflow xyz[x1,i4,y]" 	/*154*/
, "inflow xyz[x1,i4,z]" 	/*155*/
, "inflow xyz[x1,i5,x]" 	/*156*/
, "inflow xyz[x1,i5,y]" 	/*157*/
, "inflow xyz[x1,i5,z]" 	/*158*/
, "inflow xyz[x2,i1,x]" 	/*159*/
, "inflow xyz[x2,i1,y]" 	/*160*/
, "inflow xyz[x2,i1,z]" 	/*161*/
, "inflow xyz[x2,i2,x]" 	/*162*/
, "inflow xyz[x2,i2,y]" 	/*163*/
, "inflow xyz[x2,i2,z]" 	/*164*/
, "inflow xyz[x2,i3,x]" 	/*165*/
, "inflow xyz[x2,i3,y]" 	/*166*/
, "inflow xyz[x2,i3,z]" 	/*167*/
, "inflow xyz[x2,i4,x]" 	/*168*/
, "inflow xyz[x2,i4,y]" 	/*169*/
, "inflow xyz[x2,i4,z]" 	/*170*/
, "inflow xyz[x2,i5,x]" 	/*171*/
, "inflow xyz[x2,i5,y]" 	/*172*/
, "inflow xyz[x2,i5,z]" 	/*173*/
, "inflow xyz[x3,i1,x]" 	/*174*/
, "inflow xyz[x3,i1,y]" 	/*175*/
, "inflow xyz[x3,i1,z]" 	/*176*/
, "inflow xyz[x3,i2,x]" 	/*177*/
, "inflow xyz[x3,i2,y]" 	/*178*/
, "inflow xyz[x3,i2,z]" 	/*179*/
, "inflow xyz[x3,i3,x]" 	/*180*/
, "inflow xyz[x3,i3,y]" 	/*181*/
, "inflow xyz[x3,i3,z]" 	/*182*/
, "inflow xyz[x3,i4,x]" 	/*183*/
, "inflow xyz[x3,i4,y]" 	/*184*/
, "inflow xyz[x3,i4,z]" 	/*185*/
, "inflow xyz[x3,i5,x]" 	/*186*/
, "inflow xyz[x3,i5,y]" 	/*187*/
, "inflow xyz[x3,i5,z]" 	/*188*/
, "inflow xyz[x4,i1,x]" 	/*189*/
, "inflow xyz[x4,i1,y]" 	/*190*/
, "inflow xyz[x4,i1,z]" 	/*191*/
, "inflow xyz[x4,i2,x]" 	/*192*/
, "inflow xyz[x4,i2,y]" 	/*193*/
, "inflow xyz[x4,i2,z]" 	/*194*/
, "inflow xyz[x4,i3,x]" 	/*195*/
, "inflow xyz[x4,i3,y]" 	/*196*/
, "inflow xyz[x4,i3,z]" 	/*197*/
, "inflow xyz[x4,i4,x]" 	/*198*/
, "inflow xyz[x4,i4,y]" 	/*199*/
, "inflow xyz[x4,i4,z]" 	/*200*/
, "inflow xyz[x4,i5,x]" 	/*201*/
, "inflow xyz[x4,i5,y]" 	/*202*/
, "inflow xyz[x4,i5,z]" 	/*203*/
, "inflow xyz[x5,i1,x]" 	/*204*/
, "inflow xyz[x5,i1,y]" 	/*205*/
, "inflow xyz[x5,i1,z]" 	/*206*/
, "inflow xyz[x5,i2,x]" 	/*207*/
, "inflow xyz[x5,i2,y]" 	/*208*/
, "inflow xyz[x5,i2,z]" 	/*209*/
, "inflow xyz[x5,i3,x]" 	/*210*/
, "inflow xyz[x5,i3,y]" 	/*211*/
, "inflow xyz[x5,i3,z]" 	/*212*/
, "inflow xyz[x5,i4,x]" 	/*213*/
, "inflow xyz[x5,i4,y]" 	/*214*/
, "inflow xyz[x5,i4,z]" 	/*215*/
, "inflow xyz[x5,i5,x]" 	/*216*/
, "inflow xyz[x5,i5,y]" 	/*217*/
, "inflow xyz[x5,i5,z]" 	/*218*/
, "initial stock a" 	/*219*/
, "initial stock abc[a,x1]" 	/*220*/
, "initial stock abc[a,x2]" 	/*221*/
, "initial stock abc[a,x3]" 	/*222*/
, "initial stock abc[a,x4]" 	/*223*/
, "initial stock abc[a,x5]" 	/*224*/
, "initial stock abc[b,x1]" 	/*225*/
, "initial stock abc[b,x2]" 	/*226*/
, "initial stock abc[b,x3]" 	/*227*/
, "initial stock abc[b,x4]" 	/*228*/
, "initial stock abc[b,x5]" 	/*229*/
, "initial stock abc[c,x1]" 	/*230*/
, "initial stock abc[c,x2]" 	/*231*/
, "initial stock abc[c,x3]" 	/*232*/
, "initial stock abc[c,x4]" 	/*233*/
, "initial stock abc[c,x5]" 	/*234*/
, "initial stock b" 	/*235*/
, "initial stock c" 	/*236*/
, "initial stock x[x1]" 	/*237*/
, "initial stock x[x2]" 	/*238*/
, "initial stock x[x3]" 	/*239*/
, "initial stock x[x4]" 	/*240*/
, "initial stock x[x5]" 	/*241*/
, "initial stock xyz[x,x1]" 	/*242*/
, "initial stock xyz[x,x2]" 	/*243*/
, "initial stock xyz[x,x3]" 	/*244*/
, "initial stock xyz[x,x4]" 	/*245*/
, "initial stock xyz[x,x5]" 	/*246*/
, "initial stock xyz[y,x1]" 	/*247*/
, "initial stock xyz[y,x2]" 	/*248*/
, "initial stock xyz[y,x3]" 	/*249*/
, "initial stock xyz[y,x4]" 	/*250*/
, "initial stock xyz[y,x5]" 	/*251*/
, "initial stock xyz[z,x1]" 	/*252*/
, "initial stock xyz[z,x2]" 	/*253*/
, "initial stock xyz[z,x3]" 	/*254*/
, "initial stock xyz[z,x4]" 	/*255*/
, "initial stock xyz[z,x5]" 	/*256*/
, "initial stock y[x1]" 	/*257*/
, "initial stock y[x2]" 	/*258*/
, "initial stock y[x3]" 	/*259*/
, "initial stock y[x4]" 	/*260*/
, "initial stock y[x5]" 	/*261*/
, "initial stock z[x1]" 	/*262*/
, "initial stock z[x2]" 	/*263*/
, "initial stock z[x3]" 	/*264*/
, "initial stock z[x4]" 	/*265*/
, "initial stock z[x5]" 	/*266*/
, "ref stock" 	/*267*/
, "test without max" 	/*268*/
, "test without min" 	/*269*/
, "test without unit" 	/*270*/
, "TIME STEP" 	/*271*/
, "u reference" 	/*272*/
, "x factor[x1]" 	/*273*/
, "x factor[x2]" 	/*274*/
, "x factor[x3]" 	/*275*/
, "x factor[x4]" 	/*276*/
, "x factor[x5]" 	/*277*/
};

int nTypesVector[NUM_VARS] = { 
15	/*0*/
, 8	/*1*/
, 8	/*2*/
, 8	/*3*/
, 8	/*4*/
, 8	/*5*/
, 8	/*6*/
, 8	/*7*/
, 8	/*8*/
, 8	/*9*/
, 8	/*10*/
, 8	/*11*/
, 8	/*12*/
, 8	/*13*/
, 8	/*14*/
, 8	/*15*/
, 8	/*16*/
, 8	/*17*/
, 8	/*18*/
, 8	/*19*/
, 8	/*20*/
, 8	/*21*/
, 8	/*22*/
, 8	/*23*/
, 8	/*24*/
, 8	/*25*/
, 8	/*26*/
, 8	/*27*/
, 8	/*28*/
, 8	/*29*/
, 8	/*30*/
, 8	/*31*/
, 8	/*32*/
, 8	/*33*/
, 8	/*34*/
, 8	/*35*/
, 8	/*36*/
, 8	/*37*/
, 8	/*38*/
, 8	/*39*/
, 8	/*40*/
, 8	/*41*/
, 8	/*42*/
, 8	/*43*/
, 8	/*44*/
, 8	/*45*/
, 8	/*46*/
, 8	/*47*/
, 8	/*48*/
, 8	/*49*/
, 8	/*50*/
, 8	/*51*/
, 8	/*52*/
, 8	/*53*/
, 8	/*54*/
, 8	/*55*/
, 8	/*56*/
, 8	/*57*/
, 8	/*58*/
, 8	/*59*/
, 8	/*60*/
, 8	/*61*/
, 8	/*62*/
, 8	/*63*/
, 8	/*64*/
, 8	/*65*/
, 8	/*66*/
, 8	/*67*/
, 8	/*68*/
, 8	/*69*/
, 8	/*70*/
, 8	/*71*/
, 8	/*72*/
, 8	/*73*/
, 8	/*74*/
, 8	/*75*/
, 8	/*76*/
, 8	/*77*/
, 8	/*78*/
, 8	/*79*/
, 8	/*80*/
, 8	/*81*/
, 8	/*82*/
, 8	/*83*/
, 8	/*84*/
, 8	/*85*/
, 8	/*86*/
, 8	/*87*/
, 8	/*88*/
, 8	/*89*/
, 8	/*90*/
, 17	/*91*/
, 17	/*92*/
, 17	/*93*/
, 17	/*94*/
, 17	/*95*/
, 17	/*96*/
, 17	/*97*/
, 17	/*98*/
, 17	/*99*/
, 17	/*100*/
, 23	/*101*/
, 23	/*102*/
, 17	/*103*/
, 17	/*104*/
, 17	/*105*/
, 23	/*106*/
, 17	/*107*/
, 23	/*108*/
, 23	/*109*/
, 17	/*110*/
, 17	/*111*/
, 17	/*112*/
, 17	/*113*/
, 17	/*114*/
, 23	/*115*/
, 23	/*116*/
, 23	/*117*/
, 23	/*118*/
, 17	/*119*/
, 17	/*120*/
, 17	/*121*/
, 23	/*122*/
, 23	/*123*/
, 23	/*124*/
, 23	/*125*/
, 23	/*126*/
, 23	/*127*/
, 23	/*128*/
, 17	/*129*/
, 17	/*130*/
, 17	/*131*/
, 17	/*132*/
, 17	/*133*/
, 17	/*134*/
, 17	/*135*/
, 17	/*136*/
, 17	/*137*/
, 17	/*138*/
, 17	/*139*/
, 17	/*140*/
, 17	/*141*/
, 17	/*142*/
, 17	/*143*/
, 17	/*144*/
, 17	/*145*/
, 17	/*146*/
, 17	/*147*/
, 17	/*148*/
, 17	/*149*/
, 17	/*150*/
, 17	/*151*/
, 17	/*152*/
, 17	/*153*/
, 17	/*154*/
, 17	/*155*/
, 17	/*156*/
, 17	/*157*/
, 17	/*158*/
, 17	/*159*/
, 17	/*160*/
, 17	/*161*/
, 17	/*162*/
, 17	/*163*/
, 17	/*164*/
, 17	/*165*/
, 17	/*166*/
, 17	/*167*/
, 17	/*168*/
, 17	/*169*/
, 17	/*170*/
, 17	/*171*/
, 17	/*172*/
, 17	/*173*/
, 17	/*174*/
, 17	/*175*/
, 17	/*176*/
, 17	/*177*/
, 17	/*178*/
, 17	/*179*/
, 17	/*180*/
, 17	/*181*/
, 17	/*182*/
, 17	/*183*/
, 17	/*184*/
, 17	/*185*/
, 17	/*186*/
, 17	/*187*/
, 17	/*188*/
, 17	/*189*/
, 17	/*190*/
, 17	/*191*/
, 17	/*192*/
, 17	/*193*/
, 17	/*194*/
, 17	/*195*/
, 17	/*196*/
, 17	/*197*/
, 17	/*198*/
, 17	/*199*/
, 17	/*200*/
, 17	/*201*/
, 17	/*202*/
, 17	/*203*/
, 17	/*204*/
, 17	/*205*/
, 17	/*206*/
, 17	/*207*/
, 17	/*208*/
, 17	/*209*/
, 17	/*210*/
, 17	/*211*/
, 17	/*212*/
, 17	/*213*/
, 17	/*214*/
, 17	/*215*/
, 17	/*216*/
, 17	/*217*/
, 17	/*218*/
, 23	/*219*/
, 17	/*220*/
, 17	/*221*/
, 17	/*222*/
, 17	/*223*/
, 17	/*224*/
, 17	/*225*/
, 17	/*226*/
, 17	/*227*/
, 17	/*228*/
, 17	/*229*/
, 17	/*230*/
, 17	/*231*/
, 17	/*232*/
, 17	/*233*/
, 17	/*234*/
, 23	/*235*/
, 23	/*236*/
, 23	/*237*/
, 23	/*238*/
, 23	/*239*/
, 23	/*240*/
, 23	/*241*/
, 17	/*242*/
, 17	/*243*/
, 17	/*244*/
, 17	/*245*/
, 17	/*246*/
, 17	/*247*/
, 17	/*248*/
, 17	/*249*/
, 17	/*250*/
, 17	/*251*/
, 17	/*252*/
, 17	/*253*/
, 17	/*254*/
, 17	/*255*/
, 17	/*256*/
, 23	/*257*/
, 23	/*258*/
, 23	/*259*/
, 23	/*260*/
, 23	/*261*/
, 23	/*262*/
, 23	/*263*/
, 23	/*264*/
, 23	/*265*/
, 23	/*266*/
, 23	/*267*/
, 23	/*268*/
, 23	/*269*/
, 23	/*270*/
, 23	/*271*/
, 23	/*272*/
, 17	/*273*/
, 17	/*274*/
, 17	/*275*/
, 17	/*276*/
, 17	/*277*/
};

charutf8 *strLookupNames[NUM_LOOKUPS] = { 
"lookup factor" 	/*0*/
};

#include "/Users/Shared/Vensim/comp/wasm/mdl_wasm.h"

void InitConstants()
{
SetConstant (101, "FINAL TIME", 100.000000);
SetConstant (102, "growth rate a", 0.010000);
SetConstant (106, "INITIAL TIME", 0.000000);
SetConstant (108, "\"test =\"", 2.000000);
SetConstant (109, "\"test [\"", 2.000000);
SetConstant (115, "g factor", 50.000000);
SetConstant (116, "growth rate b", 0.015000);
SetConstant (117, "growth rate c", 0.025000);
SetConstant (118, "growth rate x", 0.010000);
SetConstant (122, "growth rate y", 0.015000);
SetConstant (123, "growth rate z", 0.000000);
SetConstant (124, "i factor[i1]", 1.000000);
SetConstant (125, "i factor[i2]", 2.000000);
SetConstant (126, "i factor[i3]", 3.000000);
SetConstant (127, "i factor[i4]", 4.000000);
SetConstant (128, "i factor[i5]", 5.000000);
SetConstant (219, "initial stock a", 100.000000);
SetConstant (235, "initial stock b", 200.000000);
SetConstant (236, "initial stock c", 50.000000);
SetConstant (237, "initial stock x[x1]", 100.000000);
SetConstant (238, "initial stock x[x2]", 100.000000);
SetConstant (239, "initial stock x[x3]", 100.000000);
SetConstant (240, "initial stock x[x4]", 100.000000);
SetConstant (241, "initial stock x[x5]", 100.000000);
SetConstant (257, "initial stock y[x1]", 120.000000);
SetConstant (258, "initial stock y[x2]", 120.000000);
SetConstant (259, "initial stock y[x3]", 120.000000);
SetConstant (260, "initial stock y[x4]", 120.000000);
SetConstant (261, "initial stock y[x5]", 120.000000);
SetConstant (262, "initial stock z[x1]", 80.000000);
SetConstant (263, "initial stock z[x2]", 80.000000);
SetConstant (264, "initial stock z[x3]", 80.000000);
SetConstant (265, "initial stock z[x4]", 80.000000);
SetConstant (266, "initial stock z[x5]", 80.000000);
SetConstant (267, "ref stock", 50.000000);
SetConstant (268, "test without max", 1.000000);
SetConstant (269, "test without min", 1.000000);
SetConstant (270, "test without unit", 0.500000);
SetConstant (271, "TIME STEP", 1.000000);
SetConstant (272, "u reference", 100.000000);
{
	// lookup factor
	REAL fxVals[7];
	REAL fyVals[7];
	fxVals[0] = -0.224033;
	fyVals[0] = 0.327;
	fxVals[1] = 0.386965;
	fyVals[1] = 0.3318;
	fxVals[2] = 1.75153;
	fyVals[2] = 0.3886;
	fxVals[3] = 3.95112;
	fyVals[3] = 0.564;
	fxVals[4] = 6.43585;
	fyVals[4] = 0.8531;
	fxVals[5] = 8.28921;
	fyVals[5] = 0.9242;
	fxVals[6] = 9.73523;
	fyVals[6] = 0.9242;
	SetLookup(0, "lookup factor", 7, fxVals, fyVals);
}
}

long Get_NUM_VARS() { return NUM_VARS; }
long Get_NUM_LEVELS() { return NUM_LEVELS; }
long Get_NUM_DELAYS() { return NUM_DELAYS; }
long Get_NUM_AUX() { return NUM_AUX; }
long Get_NUM_LOOKUPS() { return NUM_LOOKUPS; }
charutf8 *Get_VarName(long nIndex) { return (char*)strVarNames[nIndex]; }
charutf8 *Get_LookupName(long nIndex) { return (char*)strLookupNames[nIndex]; }
int Get_VarType(long nIndex) { return nTypesVector[nIndex]; }
static COMPREAL temp0,temp1,temp2,temp3,temp4,temp5,temp6,temp7,temp8
,temp9,temp10,temp11,temp12,temp13,temp14,temp15,temp16,temp17,temp18
,temp19,temp20,temp21,temp22,temp23,temp24,temp25,temp26,temp27,temp28
,temp29,temp30,temp31,temp32,temp33,temp34,temp35,temp36,temp37,temp38
,temp39,temp40,temp41,temp42,temp43,temp44,temp45,temp46,temp47,temp48
,temp49,temp50,temp51,temp52,temp53,temp54,temp55,temp56,temp57,temp58
,temp59,temp60,temp61,temp62,temp63,temp64,temp65,temp66,temp67,temp68
,temp69,temp70,temp71,temp72,temp73,temp74,temp75,temp76,temp77,temp78
,temp79,temp80,temp81,temp82,temp83,temp84,temp85,temp86,temp87,temp88
,temp89,temp90,temp91,temp92,temp93,temp94,temp95,temp96,temp97,temp98
,temp99,temp100,temp101,temp102,temp103,temp104,temp105,temp106,temp107
,temp108,temp109,temp110,temp111,temp112,temp113,temp114,temp115,temp116
,temp117,temp118,temp119,temp120,temp121,temp122,temp123,temp124,temp125
,temp126,temp127,temp128,temp129,temp130,temp131 ;
static int sumind0,forind0 ; 
static int sumind1,forind1 ; 
static int sumind2,forind2 ; 
static int sumind3,forind3 ; 
static int sumind4,forind4 ; 
static int sumind5,forind5 ; 
static int sumind6,forind6 ; 
static int sumind7,forind7 ; 
static int simultid ;
static int sub0[]  /* abc */ = {0,1,2,-1} ;
static int sub1[]  /* is */ = {0,1,2,3,4,-1} ;
static int sub2[]  /* xs */ = {0,1,2,3,4,-1} ;
static int sub3[]  /* xyz */ = {0,1,2,-1} ;
void SetupDIMS(){
CreateDIMS(8);
SetDIM_INFO(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1);
SetDIM_INFO(1,464,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
5);
SetDIM_INFO(2,618,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
3);
SetDIM_INFO(3,354,0,0,0,0,0,0,0,3,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
3);
SetDIM_INFO(4,662,0,0,0,0,0,0,0,5,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
5);
SetDIM_INFO(5,618,464,0,0,0,0,0,0,3,5,0,0,0,0,0,0,5,1,0,0,0,0,0,0,
2,15);
SetDIM_INFO(6,464,662,354,0,0,0,0,0,5,5,3,0,0,0,0,0,15,3,1,0,0,0,0,
0,3,75);
SetDIM_INFO(7,354,464,0,0,0,0,0,0,3,5,0,0,0,0,0,0,5,1,0,0,0,0,0,0,
2,15);
};
#ifndef LINKEXTERN
#endif
unsigned char *mdl_desc()
{
return("(Fri May 29 20:20:35 2020) From placeholder.mdl") ;
}

/* compute the model rates */
void mdl_func0()
{
double temp[10];
VGV->RATE[0] = 1.0 ;/* this is time */
/* stock abc */
for(forind0=0;forind0<3;forind0++)
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 1+sub0[forind0]*5+sub2[forind1]*1 ;
  VGV->RATE[1+sub0[forind0]*5+sub2[forind1]*1] = VGV->LEVEL[129+sub0[forind0]
*5+sub2[forind1]*1] ;
} /* stock abc */

/* stock xyz */
for(forind0=0;forind0<5;forind0++)
for(forind1=0;forind1<5;forind1++)
for(forind2=0;forind2<3;forind2++)
 {
  VGV->lastpos = 16+sub2[forind0]*15+sub1[forind1]*3+sub3[forind2]
*1 ;
  VGV->RATE[16+sub2[forind0]*15+sub1[forind1]*3+sub3[forind2]*1] = 
VGV->LEVEL[144+sub2[forind0]*15+sub1[forind1]*3+sub3[forind2]*1] ;
} /* stock xyz */

} /* comp_rate */

/* compute the delays */
void mdl_func1()
{
double temp[10];
} /* comp_delay */

/* initialize time */
void mdl_func2()
{
double temp[10];
vec_arglist_init();
VGV->LEVEL[0] = VGV->LEVEL[106] ;
} /* init_time */

/* initialize time step */
void mdl_func3()
{
double temp[10];
/* a constant no need to do anything */
} /* init_tstep */

/* State variable initial value computation*/
void mdl_func4()
{
double temp[10];
/* initial stock abc */
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 220+0*5+sub2[forind1]*1 ;
  VGV->LEVEL[220+0*5+sub2[forind1]*1] = VGV->LEVEL[219] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 220+1*5+sub2[forind1]*1 ;
  VGV->LEVEL[220+1*5+sub2[forind1]*1] = VGV->LEVEL[235] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 220+2*5+sub2[forind1]*1 ;
  VGV->LEVEL[220+2*5+sub2[forind1]*1] = VGV->LEVEL[236] ;
}
/* stock abc */
for(forind0=0;forind0<3;forind0++)
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 1+sub0[forind0]*5+sub2[forind1]*1 ;
  VGV->LEVEL[1+sub0[forind0]*5+sub2[forind1]*1] = VGV->LEVEL[220+sub0[forind0]
*5+sub2[forind1]*1] ;
}
/* initial stock xyz */
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 242+0*5+sub2[forind1]*1 ;
  VGV->LEVEL[242+0*5+sub2[forind1]*1] = VGV->LEVEL[237+sub2[forind1]
*1] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 242+1*5+sub2[forind1]*1 ;
  VGV->LEVEL[242+1*5+sub2[forind1]*1] = VGV->LEVEL[257+sub2[forind1]
*1] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 242+2*5+sub2[forind1]*1 ;
  VGV->LEVEL[242+2*5+sub2[forind1]*1] = VGV->LEVEL[262+sub2[forind1]
*1] ;
}
/* stock xyz */
for(forind0=0;forind0<5;forind0++)
for(forind1=0;forind1<5;forind1++)
for(forind2=0;forind2<3;forind2++)
 {
  VGV->lastpos = 16+sub2[forind0]*15+sub1[forind1]*3+sub3[forind2]
*1 ;
  VGV->LEVEL[16+sub2[forind0]*15+sub1[forind1]*3+sub3[forind2]*1] = 
VGV->LEVEL[242+sub3[forind2]*5+sub2[forind0]*1] ;
}
} /* comp_init */

/* State variable re-initial value computation*/
void mdl_func5()
{
double temp[10];
} /* comp_reinit */

/*  Active Time Step Equation */
void mdl_func6()
{
double temp[10];
} /* comp_tstep */
/*  Auxiliary variable equations*/
void mdl_func7()
{
double temp[10];
/* feedback var */
for(forind0=0;forind0<5;forind0++)
 {
  VGV->lastpos = 110+sub2[forind0]*1 ;
    temp0 = 0.0 ;
for(sumind0=0;sumind0<5;sumind0++)
for(sumind1=0;sumind1<3;sumind1++)
    temp0 += VGV->LEVEL[16+sub2[forind0]*15+sub1[sumind0]*3+sub3[sumind1]
*1] ;
  VGV->LEVEL[110+sub2[forind0]*1] = temp0/(COMPREAL)5/(COMPREAL)3 ;
}
/* adjusted feedback */
for(forind0=0;forind0<5;forind0++)
 {
  VGV->lastpos = 91+sub2[forind0]*1 ;
  VGV->LEVEL[91+sub2[forind0]*1] = TABLE(&VGV->TAB[0],VGV->LEVEL[110
+sub2[forind0]*1]/VGV->LEVEL[272]) ;
}
/* aggregate stocks */
for(forind0=0;forind0<5;forind0++)
 {
  VGV->lastpos = 96+sub2[forind0]*1 ;
    temp0 = 0.0 ;
for(sumind0=0;sumind0<3;sumind0++)
    temp0 += VGV->LEVEL[1+sub0[sumind0]*5+sub2[forind0]*1] ;
  VGV->LEVEL[96+sub2[forind0]*1] = temp0/(COMPREAL)3 ;
}
/* growth rate abc */
 {
  VGV->lastpos = 103+0*1 ;
  VGV->LEVEL[103+0*1] = VGV->LEVEL[102] ;
}
 {
  VGV->lastpos = 103+1*1 ;
  VGV->LEVEL[103+1*1] = VGV->LEVEL[116] ;
}
 {
  VGV->lastpos = 103+2*1 ;
  VGV->LEVEL[103+2*1] = VGV->LEVEL[117] ;
}
/* SAVEPER */
 {
  VGV->lastpos = 107 ;
  VGV->LEVEL[107] = VGV->LEVEL[271] ;
}
/* growth rate xyz */
 {
  VGV->lastpos = 119+0*1 ;
  VGV->LEVEL[119+0*1] = VGV->LEVEL[118] ;
}
 {
  VGV->lastpos = 119+1*1 ;
  VGV->LEVEL[119+1*1] = VGV->LEVEL[122] ;
}
 {
  VGV->lastpos = 119+2*1 ;
  VGV->LEVEL[119+2*1] = VGV->LEVEL[123] ;
}
/* x factor */
for(forind0=0;forind0<5;forind0++)
 {
  VGV->lastpos = 273+sub2[forind0]*1 ;
  VGV->LEVEL[273+sub2[forind0]*1] = RANDOM_UNIFORM(0,1.000000,2323.000000
) ;
}
/* inflow abc */
for(forind0=0;forind0<3;forind0++)
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 129+sub0[forind0]*5+sub2[forind1]*1 ;
  VGV->LEVEL[129+sub0[forind0]*5+sub2[forind1]*1] = VGV->LEVEL[110
+sub2[forind1]*1]*VGV->LEVEL[103+sub0[forind0]*1]*VGV->LEVEL[273+sub2[forind1]
*1]*VGV->LEVEL[91+sub2[forind1]*1] ;
}
/* inflow xyz */
for(forind0=0;forind0<5;forind0++)
for(forind1=0;forind1<5;forind1++)
for(forind2=0;forind2<3;forind2++)
 {
  VGV->lastpos = 144+sub2[forind0]*15+sub1[forind1]*3+sub3[forind2]
*1 ;
  VGV->LEVEL[144+sub2[forind0]*15+sub1[forind1]*3+sub3[forind2]*1] = 
(VGV->LEVEL[267]-VGV->LEVEL[96+sub2[forind0]*1]*VGV->LEVEL[124+sub1[forind1]
*1])*VGV->LEVEL[119+sub3[forind2]*1]*VGV->LEVEL[115] ;
}
/* initial stock abc */
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 220+0*5+sub2[forind1]*1 ;
  VGV->LEVEL[220+0*5+sub2[forind1]*1] = VGV->LEVEL[219] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 220+1*5+sub2[forind1]*1 ;
  VGV->LEVEL[220+1*5+sub2[forind1]*1] = VGV->LEVEL[235] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 220+2*5+sub2[forind1]*1 ;
  VGV->LEVEL[220+2*5+sub2[forind1]*1] = VGV->LEVEL[236] ;
}
/* initial stock xyz */
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 242+0*5+sub2[forind1]*1 ;
  VGV->LEVEL[242+0*5+sub2[forind1]*1] = VGV->LEVEL[237+sub2[forind1]
*1] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 242+1*5+sub2[forind1]*1 ;
  VGV->LEVEL[242+1*5+sub2[forind1]*1] = VGV->LEVEL[257+sub2[forind1]
*1] ;
}
for(forind1=0;forind1<5;forind1++)
 {
  VGV->lastpos = 242+2*5+sub2[forind1]*1 ;
  VGV->LEVEL[242+2*5+sub2[forind1]*1] = VGV->LEVEL[262+sub2[forind1]
*1] ;
}
} /* comp_aux */
int execute_curloop() {return(0);}
static void vec_arglist_init()
{
}
void VEFCC comp_rate(void)
{
mdl_func0();
}

void VEFCC comp_delay(void)
{
mdl_func1();
}

void VEFCC init_time(void)
{
mdl_func2();
}

void VEFCC init_tstep(void)
{
mdl_func3();
}

void VEFCC comp_init(void)
{
mdl_func4();
}

void VEFCC comp_reinit(void)
{
mdl_func5();
}

void VEFCC comp_tstep(void)
{
mdl_func6();
}

void VEFCC comp_aux(void)
{
mdl_func7();
}

