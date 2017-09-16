//globals
var chatHis = [ '', '', '', ''],
    chatHisColor = [ 'black', 'black', 'black', 'black'],
    command = '';

//socket.io
socket.on('chat listen', function(params){
  chatHis = params.msg;
  chatHisColor = params.color;
});

//prompt
function attChat(){
  ctx.fillStyle = chatHisColor[0];
  ctx.fillText(chatHis[0], 20, 470);
  ctx.fillStyle = chatHisColor[1];
  ctx.fillText(chatHis[1], 20, 490);
  ctx.fillStyle = chatHisColor[2];
  ctx.fillText(chatHis[2], 20, 510);
  ctx.fillStyle = chatHisColor[3];
  ctx.fillText(chatHis[3], 20, 530);
  if (prompt) ctx.fillStyle = 'blue';
  else ctx.fillStyle = 'black';
  ctx.fillText('> '+command, 5, 550);
}

//inputs
function inputs(){

  //enter
  if (key[13]){
    key[13] = false;
    prompt = !prompt;

    if (!prompt){
      socket.emit('chat push', command);
      command = '';
    }

  }

  if (prompt){

    //backspace
    if (key[8]){
      command = command.substring(0, command.length-1);
      key[8] = false;
    }

    if(command.length < 50){
      //a~z
      for(var i=65; i<=90; ++i){
        if (!key[18]) addCommand(i);
      }

      //space
      addCommand(32);

      //'?'
      if (key[18] && key[87] || key[16] && key[193]){
        command = command+'?';
        key[87] = false;
        key[193] = false;
      }
    }

  } else {
    //n
    if(key[78]){
      key[78] = false;
      prompt = true;
      command = '?';
    }
  }
}

/******************************************************************************
*                                   Aux                                       *
******************************************************************************/

//write the key in the prompt
function addCommand(code){
  if (key[code]){
    command = command+String.fromCharCode(code).toLowerCase();
    key[code] = false;
  }
}
