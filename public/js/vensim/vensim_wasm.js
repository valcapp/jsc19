//Vensim wrapper functions
function SetConstant(strParameter, fValue)
{
	var ptr  = allocate(intArrayFromString(strParameter), 'i8', ALLOC_NORMAL);
	return _SetConstant(-1, ptr, fValue);
}

function GetVariableIndex(strParameter)
{
	var ptr  = allocate(intArrayFromString(strParameter), 'i8', ALLOC_NORMAL);
	return _GetVariableIndex(ptr);
}

function SetConstantUsingIndex(nIndex, fValue)
{
	return _SetConstant(nIndex, "", fValue);
}

function GetNumVariables()
{
	return _GetNumVariables();
}

function GetVariableName(nIndex)
{
	var tempptr = _GetVariableName(nIndex);
	var strVarName = UTF8ToString(tempptr);
	return strVarName;
}

function GetVariableType(nIndex)
{
	return _GetVariableType(nIndex);
}

function InitializeModel()
{
	return _InitializeModel();
}

function GetNumberOfSubscriptElements(strParameter)
{
	var ptr  = allocate(intArrayFromString(strVarName), 'i8', ALLOC_NORMAL);
	return _GetNumberOfSubscriptElements(ptr);
}

function RunSim()
{
	return _RunSim();
}

function GetSeriesNumVals(strVarName)
{
	var ptr  = allocate(intArrayFromString(strVarName), 'i8', ALLOC_NORMAL);
	return _GetTimeSeriesNumVals(ptr);
}

function GetSeries(strVarName)
{
	var nNumVals = GetSeriesNumVals(strVarName);
	var ptr  = allocate(intArrayFromString(strVarName), 'i8', ALLOC_NORMAL);
	var nNumValsReturned = nNumVals;
	var fResultsArray = ccallArrays("GetSeries", "array", ["intArray"], [ptr], {heapIn: "HEAPF64", heapOut: "HEAPF64", returnArraySize: nNumValsReturned});
	return fResultsArray;
}

function GetValueAtTime(strVarName, fTime)
{
	var ptr  = allocate(intArrayFromString(strVarName), 'i8', ALLOC_NORMAL);
	return _GetValueAtTime(ptr, fTime);
}

