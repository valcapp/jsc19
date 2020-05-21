/*(Tue May 19 11:55:18 2020) From placeholder.mdl - C equations for the model */

#define _VDFX
#define VDFX

#pragma warning (disable : 4101) //Turn off warning for unreferenced local variable
#pragma warning (disable : 4005) //Turn off warnings for macro redefinition
#pragma warning (disable : 4305) //Turn off warnings for truncation from 'double' to 'REAL'

#define WASM
#define _WASM

typedef unsigned char charutf8;
#define NUM_VARS 17
#define NUM_LEVELS 3
#define NUM_DELAYS 0
#define NUM_AUX 14
#define NUM_LOOKUPS 0


charutf8 *strVarNames[NUM_VARS] = { 
"Time" 	/*0*/
, "stock[a]" 	/*1*/
, "stock[b]" 	/*2*/
, "FINAL TIME" 	/*3*/
, "growth rate[a]" 	/*4*/
, "growth rate[b]" 	/*5*/
, "growth rate a" 	/*6*/
, "growth rate b" 	/*7*/
, "inflow[a]" 	/*8*/
, "inflow[b]" 	/*9*/
, "initial stock[a]" 	/*10*/
, "initial stock[b]" 	/*11*/
, "initial stock a" 	/*12*/
, "initial stock b" 	/*13*/
, "INITIAL TIME" 	/*14*/
, "SAVEPER" 	/*15*/
, "TIME STEP" 	/*16*/
};

int nTypesVector[NUM_VARS] = { 
15	/*0*/
, 8	/*1*/
, 8	/*2*/
, 23	/*3*/
, 17	/*4*/
, 17	/*5*/
, 23	/*6*/
, 23	/*7*/
, 17	/*8*/
, 17	/*9*/
, 17	/*10*/
, 17	/*11*/
, 23	/*12*/
, 23	/*13*/
, 23	/*14*/
, 17	/*15*/
, 23	/*16*/
};

charutf8 *strLookupNames = 0; 
#include "/Users/Shared/Vensim/comp/wasm/mdl_wasm.h"

void InitConstants()
{
SetConstant (3, "FINAL TIME", 100.000000);
SetConstant (6, "growth rate a", 0.010000);
SetConstant (7, "growth rate b", -0.010000);
SetConstant (12, "initial stock a", 100.000000);
SetConstant (13, "initial stock b", 200.000000);
SetConstant (14, "INITIAL TIME", 0.000000);
SetConstant (16, "TIME STEP", 1.000000);
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
static int sub0[]  /* subs */ = {0,1,-1} ;
void SetupDIMS(){
CreateDIMS(2);
SetDIM_INFO(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1);
SetDIM_INFO(1,442,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,
2);
};
#ifndef LINKEXTERN
#endif
unsigned char *mdl_desc()
{
return("(Tue May 19 11:55:18 2020) From placeholder.mdl") ;
}

/* compute the model rates */
void mdl_func0()
{
double temp[10];
VGV->RATE[0] = 1.0 ;/* this is time */
/* stock */
for(forind0=0;forind0<2;forind0++)
 {
  VGV->lastpos = 1+sub0[forind0]*1 ;
  VGV->RATE[1+sub0[forind0]*1] = VGV->LEVEL[8+sub0[forind0]*1] ;
} /* stock */

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
VGV->LEVEL[0] = VGV->LEVEL[14] ;
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
/* initial stock */
 {
  VGV->lastpos = 10+0*1 ;
  VGV->LEVEL[10+0*1] = VGV->LEVEL[12] ;
}
 {
  VGV->lastpos = 10+1*1 ;
  VGV->LEVEL[10+1*1] = VGV->LEVEL[13] ;
}
/* stock */
for(forind0=0;forind0<2;forind0++)
 {
  VGV->lastpos = 1+sub0[forind0]*1 ;
  VGV->LEVEL[1+sub0[forind0]*1] = VGV->LEVEL[10+sub0[forind0]*1] ;
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
/* growth rate */
 {
  VGV->lastpos = 4+0*1 ;
  VGV->LEVEL[4+0*1] = VGV->LEVEL[6] ;
}
 {
  VGV->lastpos = 4+1*1 ;
  VGV->LEVEL[4+1*1] = VGV->LEVEL[7] ;
}
/* inflow */
for(forind0=0;forind0<2;forind0++)
 {
  VGV->lastpos = 8+sub0[forind0]*1 ;
  VGV->LEVEL[8+sub0[forind0]*1] = VGV->LEVEL[1+sub0[forind0]*1]*VGV->LEVEL[4
+sub0[forind0]*1] ;
}
/* initial stock */
 {
  VGV->lastpos = 10+0*1 ;
  VGV->LEVEL[10+0*1] = VGV->LEVEL[12] ;
}
 {
  VGV->lastpos = 10+1*1 ;
  VGV->LEVEL[10+1*1] = VGV->LEVEL[13] ;
}
/* SAVEPER */
 {
  VGV->lastpos = 15 ;
  VGV->LEVEL[15] = VGV->LEVEL[16] ;
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

