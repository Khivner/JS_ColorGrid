//answer board
var row1 = [2,9,5,7,4,3,8,6,1];
var row2 = [4,3,1,8,6,5,9,2,7];
var row3 = [8,7,6,1,9,2,5,4,3];
var row4 = [3,8,7,4,5,9,2,1,6];
var row5 = [6,1,2,3,8,7,4,9,5];
var row6 = [5,4,9,2,1,6,7,3,8];
var row7 = [7,6,3,5,2,4,1,8,9];
var row8 = [9,2,8,6,7,1,3,5,4];
var row9 = [1,5,4,9,3,8,6,7,2];
var matrix = [row1,row2,row3,row4,row5,row6,row7,row8,row9];
//blank board to be populated with user input to be set in generateNewBoard()
checkMatrix = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];

//color currently chosen by user
var currentColornumber = 0;
var currentColor = "";
var colors = ["","red","green","blue","cyan","purple","pink","yellow","orange","brown"];

//counter for number of games played or attempted
var gameCount =0;
//counter for checking win condition
var colortry = 0;

//matrix operations
function randomRowSwap(){
	n = Math.floor(Math.random()*9);
	m = Math.floor(Math.random()*9);
	hold = matrix[n].slice();
	
	matrix[n] = matrix[m].slice();
	matrix[m] = hold.slice();
}
function randomColumnSwap(){
	n = Math.floor(Math.random()*9);
	m = Math.floor(Math.random()*9);
	hold = 0;
	
	for(var i=0;i<9;i++)
	{
		hold = matrix[i][n];
		matrix[i][n] = matrix[i][m];
		matrix[i][m] = hold;
	}
}
//end matrix operations

//if multiple games are played resets onclick for cells that were previously prepopulated and static
function set_onClick()
{
	var id_string = "";
	for(var i=0;i<9;i++)
	{
		for(var j=0;j<9;j++)
		{
			id_string = (i+1).toString()+"-"+(j+1).toString();
			$("#"+id_string).attr("onclick","setColor('"+id_string+"')");
		}
	}
}

function setGivencell(cell)
{
	$("#"+cell).addClass("given-cell");
}
//Check to see if user won the game
function winConditionCheck()
{
	function sortNumber(a,b) {return a - b;}
	var rowCompare;
	var colCompare;
	
	for(var i=0;i<9;i++)
	{
		//generate arrays representing row i and column i
		rowCompare = checkMatrix[i].slice();
		colCompare = [];
		for(var j=0;j<9;j++)
		{
			colCompare.push(checkMatrix[j][i]);
		}
		//numerically sort row and column
		rowCompare.sort(sortNumber);
		colCompare.sort(sortNumber)
		//check to see if sorted row and column are both numbers 1-9 (win condition)
		for(var j=0;j<9;j++)
		{
			if(((j+1) !== rowCompare[j]) || ((j+1) !== colCompare[j]))
			{
				return false;
			}
		}
	}
	return true;
}

//functions to choose and set cell colors
function getColor(color, number)
{
	currentColor = color;
	currentColornumber = number;
	colortry++;
	setPaletteSelector(color);
}

function setColor(cellID)
{
	var checkIndices = cellID.split("-");
	
	$("#"+cellID).removeClass();	
	$("#"+cellID).addClass(currentColor);
	//updates the checkMatrix which tracks the game progress
	checkMatrix[parseInt(checkIndices[0])-1][parseInt(checkIndices[1])-1] = currentColornumber;
	//check for win condition
	if(colortry > 0)
	{
		if(winConditionCheck())
		{
			alert("Congratulations you win!");
		}
	}
}

function setPaletteSelector(color) {
	$('#palette tr').removeClass('selected-palette');
	$('#palette .label').removeClass('selected-palette-label');
	$('#palette').find('.' + color).parents('tr').addClass('selected-palette');
	$('#palette').find('.' + color).siblings('.label').addClass('selected-palette-label');
}		

//populates html board
function populateBoard()
{
	var cell = "";
	for(var i=0;i<9;i++)
	{
		for(var j=0;j<9;j++)
		{
			currentColor = colors[checkMatrix[i][j]];
			currentColornumber = checkMatrix[i][j];
			cell = (i+1).toString()+"-"+(j+1).toString();
			//$("#"+cell).html(checkMatrix[i][j]);
			setColor(cell);
			if(checkMatrix[i][j] !== 0)
			{
				setGivencell(cell);
			}
		}
	}
	//clears currentColor so user cannot fill cells until they choose from palette
	currentColor = "";
}
//generates the matrix for the board the user will fill in
function hideCells(given)
{
	var index;
	var randomIndex
	var indices = [];
	var numbers = 81;
	var n = 0;
	for(var i=0;i<9;i++)
	{
		for(var j=0;j<9;j++)
		{
			indices.push(i.toString()+','+j.toString());
		}
	}
	
	while(n<given)
	{
		randomIndex = Math.floor(Math.random()*numbers);
		index = indices[randomIndex].split(',');
		indices.splice(randomIndex,1);
		checkMatrix[parseInt(index[0])][parseInt(index[1])] = matrix[parseInt(index[0])][parseInt(index[1])];
		given--;
		numbers--;
		//makes prepopulated cells static so users can't change them accidentally
		$("#"+(parseInt(index[0])+1).toString()+"-"+(parseInt(index[1])+1).toString()).attr("onclick",null);
	}
}
//scramble base answer board
function generateNewBoard(difficulty)
{
	checkMatrix = [[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0]];
	var given = 0;
	gameCount++;
	colortry = 0;
	if(gameCount>1)
	{
		set_onClick();
	}
	switch(difficulty){
		case "easy":
			given = 35;
			break;
		case "medium":
			given = 20;
			break;
		case "hard":
			given = 10;
			break;
	}
	
	for(var i=0;i<500;i++)
	{
		var pick = Math.random();
		
		if(pick > 0.5)
		{
			randomColumnSwap();
		}
		else
		{
			randomRowSwap();
		}
	}
	
	$(document).ready(function(){
		hideCells(given);
		populateBoard();
	});
}