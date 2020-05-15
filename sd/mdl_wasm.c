/*(Thu May 14 18:35:58 2020) From community corona 8.mdl - C equations for the model */

#define _VDFX
#define VDFX

#pragma warning (disable : 4101) //Turn off warning for unreferenced local variable
#pragma warning (disable : 4005) //Turn off warnings for macro redefinition
#pragma warning (disable : 4305) //Turn off warnings for truncation from 'double' to 'REAL'

#define WASM
#define _WASM

typedef unsigned char charutf8;
#define NUM_VARS 57
#define NUM_LEVELS 12
#define NUM_DELAYS 0
#define NUM_AUX 45
#define NUM_LOOKUPS 0


charutf8 *strVarNames[NUM_VARS] = { 
"Time" 	/*0*/
, "#Isolation Effectiveness>SMOOTH3#" 	/*1*/
, "#Isolation Effectiveness>SMOOTH3>LV1#" 	/*2*/
, "#Isolation Effectiveness>SMOOTH3>LV2#" 	/*3*/
, "#Relative Behavioral Risk>SMOOTH3#" 	/*4*/
, "#Relative Behavioral Risk>SMOOTH3>LV1#" 	/*5*/
, "#Relative Behavioral Risk>SMOOTH3>LV2#" 	/*6*/
, "Deaths" 	/*7*/
, "Exposed" 	/*8*/
, "Infected" 	/*9*/
, "Recovered" 	/*10*/
, "Susceptible" 	/*11*/
, "#Isolation Effectiveness>SMOOTH3>DL#" 	/*12*/
, "#Relative Behavioral Risk>SMOOTH3>DL#" 	/*13*/
, "Active Infected" 	/*14*/
, "Advancing" 	/*15*/
, "Behavior Reaction Time" 	/*16*/
, "Behavioral Risk Reduction" 	/*17*/
, "Confirmed" 	/*18*/
, "Contact Density Decline" 	/*19*/
, "Dying" 	/*20*/
, "Effect of Season" 	/*21*/
, "Fatality Rate" 	/*22*/
, "FINAL TIME" 	/*23*/
, "Fraction Requiring Hospitalization" 	/*24*/
, "Fraction Susceptible" 	/*25*/
, "Hospital Capacity" 	/*26*/
, "Hospital Capacity Sensitivity" 	/*27*/
, "Hospital Strain" 	/*28*/
, "Import Time" 	/*29*/
, "Importing Infected" 	/*30*/
, "Incubation Time" 	/*31*/
, "Infecting" 	/*32*/
, "Infection Duration" 	/*33*/
, "Initial Population" 	/*34*/
, "INITIAL TIME" 	/*35*/
, "Initial Uncontrolled Transmission Rate" 	/*36*/
, "Isolation Effectiveness" 	/*37*/
, "Isolation Reaction Time" 	/*38*/
, "N Imported Infections" 	/*39*/
, "Peak Season" 	/*40*/
, "Potential Isolation Effectiveness" 	/*41*/
, "Public Health Capacity" 	/*42*/
, "Public Health Capacity Sensitivity" 	/*43*/
, "Public Health Strain" 	/*44*/
, "R0" 	/*45*/
, "Recovering" 	/*46*/
, "Relative Behavioral Risk" 	/*47*/
, "Relative Contact Density" 	/*48*/
, "SAVEPER" 	/*49*/
, "Seasonal Amplitude" 	/*50*/
, "Seasonal Period" 	/*51*/
, "Serious Cases" 	/*52*/
, "TIME STEP" 	/*53*/
, "Transmission Rate" 	/*54*/
, "Treated Fatality Rate" 	/*55*/
, "Untreated Fatality Rate" 	/*56*/
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
, 17	/*12*/
, 17	/*13*/
, 17	/*14*/
, 17	/*15*/
, 23	/*16*/
, 23	/*17*/
, 17	/*18*/
, 23	/*19*/
, 17	/*20*/
, 17	/*21*/
, 17	/*22*/
, 23	/*23*/
, 23	/*24*/
, 17	/*25*/
, 23	/*26*/
, 23	/*27*/
, 17	/*28*/
, 23	/*29*/
, 17	/*30*/
, 23	/*31*/
, 17	/*32*/
, 23	/*33*/
, 23	/*34*/
, 23	/*35*/
, 17	/*36*/
, 17	/*37*/
, 23	/*38*/
, 23	/*39*/
, 23	/*40*/
, 23	/*41*/
, 23	/*42*/
, 23	/*43*/
, 17	/*44*/
, 23	/*45*/
, 17	/*46*/
, 17	/*47*/
, 17	/*48*/
, 17	/*49*/
, 23	/*50*/
, 23	/*51*/
, 17	/*52*/
, 23	/*53*/
, 17	/*54*/
, 23	/*55*/
, 23	/*56*/
};

charutf8 *strLookupNames = 0; 
#include "/Users/Shared/Vensim/comp/wasm/mdl_wasm.h"

void InitConstants()
{
SetConstant (16, "Behavior Reaction Time", 50.000000);
SetConstant (17, "Behavioral Risk Reduction", 0.000000);
SetConstant (19, "Contact Density Decline", 0.000000);
SetConstant (23, "FINAL TIME", 365.000000);
SetConstant (24, "Fraction Requiring Hospitalization", 0.100000);
SetConstant (26, "Hospital Capacity", 200000.000000);
SetConstant (27, "Hospital Capacity Sensitivity", 2.000000);
SetConstant (29, "Import Time", 20.000000);
SetConstant (31, "Incubation Time", 5.000000);
SetConstant (33, "Infection Duration", 7.000000);
SetConstant (34, "Initial Population", 66575200.000000);
SetConstant (35, "INITIAL TIME", 0.000000);
SetConstant (38, "Isolation Reaction Time", 5.000000);
SetConstant (39, "N Imported Infections", 5.000000);
SetConstant (40, "Peak Season", 0.000000);
SetConstant (41, "Potential Isolation Effectiveness", 0.000000);
SetConstant (42, "Public Health Capacity", 1000000.000000);
SetConstant (43, "Public Health Capacity Sensitivity", 2.000000);
SetConstant (45, "R0", 2.400000);
SetConstant (50, "Seasonal Amplitude", 0.000000);
SetConstant (51, "Seasonal Period", 365.000000);
SetConstant (53, "TIME STEP", 0.125000);
SetConstant (55, "Treated Fatality Rate", 0.200000);
SetConstant (56, "Untreated Fatality Rate", 0.400000);
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
void SetupDIMS(){
CreateDIMS(1);
SetDIM_INFO(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1);
};
#ifndef LINKEXTERN
#endif
unsigned char *mdl_desc()
{
return("(Thu May 14 18:35:58 2020) From community corona 8.mdl") ;
}

/* compute the model rates */
void mdl_func0()
{
double temp[10];
VGV->RATE[0] = 1.0 ;/* this is time */
/* #Isolation Effectiveness>SMOOTH3# */
 {
  VGV->lastpos = 1 ;
  VGV->RATE[1] = (VGV->LEVEL[3]-VGV->LEVEL[1])/VGV->LEVEL[12] ;
} /* #Isolation Effectiveness>SMOOTH3# */

/* #Isolation Effectiveness>SMOOTH3>LV1# */
 {
  VGV->lastpos = 2 ;
  VGV->RATE[2] = ((STEP(VGV->LEVEL[41],VGV->LEVEL[29]))-VGV->LEVEL[2
])/VGV->LEVEL[12] ;
} /* #Isolation Effectiveness>SMOOTH3>LV1# */

/* #Isolation Effectiveness>SMOOTH3>LV2# */
 {
  VGV->lastpos = 3 ;
  VGV->RATE[3] = (VGV->LEVEL[2]-VGV->LEVEL[3])/VGV->LEVEL[12] ;
} /* #Isolation Effectiveness>SMOOTH3>LV2# */

/* #Relative Behavioral Risk>SMOOTH3# */
 {
  VGV->lastpos = 4 ;
  VGV->RATE[4] = (VGV->LEVEL[6]-VGV->LEVEL[4])/VGV->LEVEL[13] ;
} /* #Relative Behavioral Risk>SMOOTH3# */

/* #Relative Behavioral Risk>SMOOTH3>LV1# */
 {
  VGV->lastpos = 5 ;
  VGV->RATE[5] = ((1.000000-STEP(VGV->LEVEL[17],VGV->LEVEL[29]))-VGV->LEVEL[5
])/VGV->LEVEL[13] ;
} /* #Relative Behavioral Risk>SMOOTH3>LV1# */

/* #Relative Behavioral Risk>SMOOTH3>LV2# */
 {
  VGV->lastpos = 6 ;
  VGV->RATE[6] = (VGV->LEVEL[5]-VGV->LEVEL[6])/VGV->LEVEL[13] ;
} /* #Relative Behavioral Risk>SMOOTH3>LV2# */

/* Deaths */
 {
  VGV->lastpos = 7 ;
  VGV->RATE[7] = VGV->LEVEL[20] ;
} /* Deaths */

/* Exposed */
 {
  VGV->lastpos = 8 ;
  VGV->RATE[8] = VGV->LEVEL[32]-VGV->LEVEL[15] ;
} /* Exposed */

/* Infected */
 {
  VGV->lastpos = 9 ;
  VGV->RATE[9] = VGV->LEVEL[15]+VGV->LEVEL[30]-VGV->LEVEL[20]-VGV->LEVEL[46
] ;
} /* Infected */

/* Recovered */
 {
  VGV->lastpos = 10 ;
  VGV->RATE[10] = VGV->LEVEL[46] ;
} /* Recovered */

/* Susceptible */
 {
  VGV->lastpos = 11 ;
  VGV->RATE[11] = (-VGV->LEVEL[32]) ;
} /* Susceptible */

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
VGV->LEVEL[0] = VGV->LEVEL[35] ;
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
/* #Isolation Effectiveness>SMOOTH3# */
 {
  VGV->lastpos = 1 ;
  VGV->LEVEL[1] = (STEP(VGV->LEVEL[41],VGV->LEVEL[29])) ;
}
/* #Isolation Effectiveness>SMOOTH3>LV1# */
 {
  VGV->lastpos = 2 ;
  VGV->LEVEL[2] = (STEP(VGV->LEVEL[41],VGV->LEVEL[29])) ;
}
/* #Isolation Effectiveness>SMOOTH3>LV2# */
 {
  VGV->lastpos = 3 ;
  VGV->LEVEL[3] = (STEP(VGV->LEVEL[41],VGV->LEVEL[29])) ;
}
/* #Relative Behavioral Risk>SMOOTH3# */
 {
  VGV->lastpos = 4 ;
  VGV->LEVEL[4] = (1.000000-STEP(VGV->LEVEL[17],VGV->LEVEL[29])) ;
}
/* #Relative Behavioral Risk>SMOOTH3>LV1# */
 {
  VGV->lastpos = 5 ;
  VGV->LEVEL[5] = (1.000000-STEP(VGV->LEVEL[17],VGV->LEVEL[29])) ;
}
/* #Relative Behavioral Risk>SMOOTH3>LV2# */
 {
  VGV->lastpos = 6 ;
  VGV->LEVEL[6] = (1.000000-STEP(VGV->LEVEL[17],VGV->LEVEL[29])) ;
}
/* Deaths */
 {
  VGV->lastpos = 7 ;
  VGV->LEVEL[7] = 0 ;
}
/* Exposed */
 {
  VGV->lastpos = 8 ;
  VGV->LEVEL[8] = 0 ;
}
/* Infected */
 {
  VGV->lastpos = 9 ;
  VGV->LEVEL[9] = 0 ;
}
/* Recovered */
 {
  VGV->lastpos = 10 ;
  VGV->LEVEL[10] = 0 ;
}
/* Susceptible */
 {
  VGV->lastpos = 11 ;
  VGV->LEVEL[11] = VGV->LEVEL[34] ;
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
/* #Isolation Effectiveness>SMOOTH3>DL# */
 {
  VGV->lastpos = 12 ;
  VGV->LEVEL[12] = VGV->LEVEL[38]/3.000000 ;
}
/* #Relative Behavioral Risk>SMOOTH3>DL# */
 {
  VGV->lastpos = 13 ;
  VGV->LEVEL[13] = VGV->LEVEL[16]/3.000000 ;
}
/* Public Health Strain */
 {
  VGV->lastpos = 44 ;
  VGV->LEVEL[44] = MAX(0,VGV->LEVEL[9]/VGV->LEVEL[42]) ;
}
/* Isolation Effectiveness */
 {
  VGV->lastpos = 37 ;
  VGV->LEVEL[37] = VGV->LEVEL[1]/(1.000000+POWER(VGV->LEVEL[44],VGV->LEVEL[43
])) ;
}
/* Active Infected */
 {
  VGV->lastpos = 14 ;
  VGV->LEVEL[14] = VGV->LEVEL[9]*(1.000000-VGV->LEVEL[37]) ;
}
/* Advancing */
 {
  VGV->lastpos = 15 ;
  VGV->LEVEL[15] = VGV->LEVEL[8]/VGV->LEVEL[31] ;
}
/* Confirmed */
 {
  VGV->lastpos = 18 ;
  VGV->LEVEL[18] = VGV->LEVEL[7]+VGV->LEVEL[8]+VGV->LEVEL[9]+VGV->LEVEL[10
] ;
}
/* Serious Cases */
 {
  VGV->lastpos = 52 ;
  VGV->LEVEL[52] = VGV->LEVEL[9]*VGV->LEVEL[24] ;
}
/* Hospital Strain */
 {
  VGV->lastpos = 28 ;
  VGV->LEVEL[28] = VGV->LEVEL[52]/VGV->LEVEL[26] ;
}
/* Fatality Rate */
 {
  VGV->lastpos = 22 ;
  VGV->LEVEL[22] = VGV->LEVEL[56]+(VGV->LEVEL[55]-VGV->LEVEL[56])/
(1.000000+POWER(VGV->LEVEL[28],VGV->LEVEL[27])) ;
}
/* Dying */
 {
  VGV->lastpos = 20 ;
  VGV->LEVEL[20] = VGV->LEVEL[9]*VGV->LEVEL[22]/VGV->LEVEL[33] ;
}
/* Effect of Season */
 {
  VGV->lastpos = 21 ;
  VGV->LEVEL[21] = 1.000000-VGV->LEVEL[50]+VGV->LEVEL[50]*(1.000000
+COS(2.000000*3.141590*(VGV->LEVEL[0]-VGV->LEVEL[40])/VGV->LEVEL[51
]))/2.000000 ;
}
/* Fraction Susceptible */
 {
  VGV->lastpos = 25 ;
  VGV->LEVEL[25] = VGV->LEVEL[11]/VGV->LEVEL[34] ;
}
/* Importing Infected */
 {
  VGV->lastpos = 30 ;
  VGV->LEVEL[30] = VGV->LEVEL[39]*PULSE(VGV->LEVEL[29],VGV->LEVEL[53
])/VGV->LEVEL[53] ;
}
/* Initial Uncontrolled Transmission Rate */
 {
  VGV->lastpos = 36 ;
  VGV->LEVEL[36] = VGV->LEVEL[45]/VGV->LEVEL[33] ;
}
/* Relative Behavioral Risk */
 {
  VGV->lastpos = 47 ;
  VGV->LEVEL[47] = VGV->LEVEL[4] ;
}
/* Relative Contact Density */
 {
  VGV->lastpos = 48 ;
  VGV->LEVEL[48] = 1.000000/(1.000000+VGV->LEVEL[19]*(1.000000-VGV->LEVEL[25
])) ;
}
/* Transmission Rate */
 {
  VGV->lastpos = 54 ;
  VGV->LEVEL[54] = VGV->LEVEL[36]*VGV->LEVEL[47]*VGV->LEVEL[25]*VGV->LEVEL[48
] ;
}
/* Infecting */
 {
  VGV->lastpos = 32 ;
  VGV->LEVEL[32] = VGV->LEVEL[14]*VGV->LEVEL[54]*VGV->LEVEL[21] ;
}
/* Recovering */
 {
  VGV->lastpos = 46 ;
  VGV->LEVEL[46] = VGV->LEVEL[9]/VGV->LEVEL[33]*(1.000000-VGV->LEVEL[22
]) ;
}
/* SAVEPER */
 {
  VGV->lastpos = 49 ;
  VGV->LEVEL[49] = VGV->LEVEL[53] ;
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

