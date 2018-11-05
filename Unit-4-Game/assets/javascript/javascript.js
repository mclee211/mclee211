$( document ).ready(function(){
  var Random=Math.floor(Math.random()*101+19)
  
  $('#randomNumber').text(Random);

  var num1= Math.floor(Math.random()*11+1)
  var num2= Math.floor(Math.random()*11+1)
  var num3= Math.floor(Math.random()*11+1)
  var num4= Math.floor(Math.random()*11+1)
  
  var Total= 0; 
  var wins= 0;
  var losses = 0;
  
$('#Wins').text(wins);
$('#Losses').text(losses);

function reset(){
      Random=Math.floor(Math.random()*101+19);
      console.log(Random)
      $('#randomNumber').text(Random);
      num1= Math.floor(Math.random()*11+1);
      num2= Math.floor(Math.random()*11+1);
      num3= Math.floor(Math.random()*11+1);
      num4= Math.floor(Math.random()*11+1);
      Total= 0;
      $('#grandTotal').text(Total);
      } 

function winner(){
alert("You won!");
  wins++; 
  $('#Wins').text(wins);
  reset();
}

function loser(){
alert ("You lose!");
  losses++;
  $('#Losses').text(losses);
  reset()
}

  $('#one').on ('click', function(){
    Total = Total + num1;
    console.log("New Total= " + Total);
    $('#grandTotal').text(Total); 
          
        if (Total == Random){
          winner();
        }
        else if ( Total > Random){
          loser();
        }   
  })  
  $('#two').on ('click', function(){
    Total = Total + num2;
    console.log("New Total= " + Total);
    $('#finalTotal').text(Total); 
        if (Total == Random){
          winner();
        }
        else if ( Total > Random){
          loser();
        } 
  })  
  $('#three').on ('click', function(){
    Total = Total + num3;
    console.log("New Total= " + Total);
    $('#grandTotal').text(Total);

          if (Total == Random){
            winner();
        }
        else if ( Total > Random){
          loser();
        } 
  })  
  $('#four').on ('click', function(){
    Total = Total + num4;
    console.log("New Total= " + Total);
    $('#grandTotal').text(Total); 
      
          if (Total == Random){
          winner();
        }
        else if ( Total > Random){
          loser();
        }
  });   
}); 