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