//виды сложности
const easy = [
    "5-1--9---2-973--15-73----28--58--6-2-4--278--7281-3--93-7--6---81-47-396-----21--",
    "581249763269738415473651928135894672946527831728163549357916284812475396694382157"
  ];
  const medium = [
    "1---5-4-9-5----7---6-3-4-255-61--------498516---5-----93----84--4--13------84-3-7",
    "128657439354921768769384125586132974273498516491576283937265841845713692612849357"
  ];
  const hard = [
    "----32-68---5-8--3---7-4--1435-7---2--6--9-8-------3--19-----5----9-----5-4-8-7-9",
    "749132568612598473358764921435871692276349185981256347193427856867915234524683719"
  ];
  const expert = [
    "6--71---23------968-------5--9------------429-7-8----------3-5-13---7----2--54---",
    "694715832357428196812639745269541378581376429473892561946183257135267984728954613"
];
  //переременные
  var timer;
  var timeRemaining;
  var lives;
  var selectedNum;
  var selectedTile;
  var disableSelect;

  window.onload = function(){
      //запуск игры при нажании на кнопку 
    id("start-btn").addEventListener("click", startGame);
    //add event listener для боковых чисел
    for (let i = 0; i< id("number-container").children.length; i++){
        id("number-container").children[i].addEventListener("click", function(){
            //если выбор доступен
            if (!disableSelect){
                //если число уже выбранно/выделено
                if (this.classList.contains("selected")){
                    //убираем выделение
                    this.classList.remove("selected");
                    selectedNum = null;
                }else{
                    //убираем выделение у всех элементов контейнера
                    for (let i =0; i<9;i++){
                        id("number-container").children[i].classList.remove("selected");
                    }
                    //выбираем и обновляем значение у selecctedNum
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                }
            }
        })
    }
  }
function startGame(){
      //выбираем сложность игры
      let board;
      if(id("diff-1").checked) board = easy[0];
      else if(id("diff-2").checked) board = medium[0];
      else if(id("diff-3").checked) board = hard[0];
      else if(id("diff-4").checked) board = expert[0];
      //устанавливаем кол-во жизней 
      lives = 3;
      disableSelect = false;
      id("lives").textContent = "lives remaining: 3";
      //создаем поле исходя из сложности игры
      generateBoard(board);
      //запускаем таймер
      startTimer();
      //устанавливаем тему
      if (id("theme-1").checked){
          qs("body").classList.remove("dark");
      }else{
          qs("body").classList.add("dark");
      }
      //показываем кликабельные
      id("number-container").classList.remove("hidden");
  }

  function startTimer(){
      if (id("time-1").checked) timeRemaining = 300;
      else if (id("time-2").checked) timeRemaining = 600;
      else timeRemaining = 900;
      //устанавливаем таймер на 1 сек
      id("timer").textContent = timeConversion(timeRemaining);
      //обновляем таймер
      timer = setInterval(function(){
          timeRemaining--;
          if (timeRemaining === 0) endGame();
          id("timer").textContent = timeConversion(timeRemaining);
      },1000)
  }
  //изменяем вид из сек в MM:SS
  function timeConversion(time){
    let minutes = Math.floor(time/60);
    if (minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if (seconds < 10) seconds = "0" + seconds
    return minutes + ":" + seconds;
  }
function generateBoard(board){
      //очищаем поле(предыдущие)
      clearPrevious();
      //id счетчик
      let idCount = 0;
      //создаем наши ячейки/плитки
      for (let i =0; i < 81; i++){
          //создаем новые p
          let tile = document.createElement("p");
          //если плитки не должны быть пустыми
          if (board.charAt(i) != "-"){
            //устанавливаем значение в плитку
            tile.textContent = board.charAt(i);
          }else{
            //добавляем click event listener для плиток
            tile.addEventListener("click", function(){
                //если выбор не отключен
                if(!disableSelect){
                    //если плитка уже выбранна
                    if (tile.classList.contains("selected")){
                        //убираем выбор/выделение
                        tile.classList.remove("selected");
                        selectedTile = null;
                    } else{ 
                        for(let i = 0; i<81;i++){
                            qsa(".tile")[i].classList.remove("selected");
                        }
                        //добавляем выделение и обновляем переменные
                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            });
          }
          //назначаем id для плиток
          tile.id =idCount;
          //увеличиваем для следующей плитки
          idCount++;
          //добовляем плиткам class
          tile.classList.add("tile");
          //добавляет жирную горизонтальную линию между плитками(27|54|81)
          if ((tile.id > 17 && tile.id < 27)||(tile.id > 44 && tile.id < 54)){
              tile.classList.add("bottomBorder")
          }
          //добавляет вертикальную жирную линию между плитками(27|54|81)
          if ((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6){
              tile.classList.add("rightBorder");
          }
          //создание плитток на поле
          id("board").appendChild(tile);
       }
  }
function updateMove(){
    // если выбрана ячейка и номер
    if (selectedTile && selectedNum){
        //установить ячейку на правильный номер
        selectedTile.textContent = selectedNum.textContent;
        //если число совпадает с соответствующим числом в решении
        if(checkCorrect(selectedTile)){
            //отменить выбор ячейки
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");
            //очистить выбранную переменную
            selectedNum = null;
            selectedTile = null;
            //проверьте, завершение игры
             if (checkDone()){
                 endGame();
             }
            //если число не соответствует ключу решения
        }else{
            //отключить выбор нового номера на 1 сек
            disableSelect = true;
            //сделать плитку красной
            selectedTile.classList.add("incorrect");
            setTimeout(function (){
                //вычесть одну попытку
                lives--;
                //если не осталось попыток в конце игры
                if (lives === 0){
                    endGame();
                } else{
                //если попыток не равно 0
                 //обновить текст
                 id("lives").textContent = "Количество попыток: " + lives;
                 disableSelect = false;
                }
                //восстановить цвет и удалить выделенное
                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");
                //очистить текст ячейки и выбранную переменную
                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;
            },1000)
        }
    }
}

function checkDone(){
    let tiles = qsa(".tile");
    for (let i = 0; i< tiles.length; i++){
        if (tiles[i].textContent === "") return false;
    }
    return true;
}
function endGame(){
    disableSelect = true;
    clearTimeout(timer);
    // win or loss
    if (lives === 0 || timeRemaining === 0){
        id("lives").textContent = "You Lost";
    } else{
        id("lives").textContent = "You Won";
    }
}
function checkCorrect(tile){
    //установить решение в зависимости от сложности
    let solution;
    if (id("diff-1").checked) solution = easy[1];
    else if(id("diff-2").checked) solution = medium[1];
      else if(id("diff-3").checked) solution = hard[1];
      else solution = expert[1];
      // номер плитки одинаковый с номером решения
      if (solution.charAt(tile.id) === tile.textContent) return true;
      else return false;
}

  function clearPrevious(){
      let tiles = qsa(".tile");
      //убираем плитки
      for(let i = 0; i < tiles.length; i++){
          tiles[i].remove();
      }
      //обнуляем таймер
      if (timer) clearTimeout(timer);
      for (let i=0;i<id("number-container").children.length;i++){
          id("number-container").children[i].classList.remove("selected");
      }
      selectedTile = null;
      selectedNum=null;
  }
  //сокращение для функций
  function id(id){
      return document.getElementById(id);
  }
  function qs(selector){
      return document.querySelector(selector);
  }
  function qsa(selector){
      return document.querySelectorAll(selector);
  }
