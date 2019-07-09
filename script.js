var currentPlayer = "player1";
var column = $(".column");
var holes = $(".cell");
var box = $(".box.hole");
var mouseId = 0;
var key = 0;
/////////////Event Listening
$(".choices .player1").on("click", function() {
  currentPlayer = "player1";
  $(".choices").css("visibility", "hidden");
  $("main").addClass("visible");
  box.addClass(currentPlayer);
});
$(".choices .player2").on("click", function() {
  currentPlayer = "player2";
  $(".choices").css("visibility", "hidden");
  $("main").addClass("visible");
  box.addClass(currentPlayer);
});

$(document).on("mousemove", function(evt) {
  box.css("left", evt.clientX + 10 + "px");
  box.css("top", evt.clientY - 160 + "px");
});

//////MOUSEOVER
column.on("mouseover", function(col) {
  var cells = $(col.currentTarget).find(".cell");
  mouseId = $(col.currentTarget).index();
  for (var i = cells.length - 1; i >= 0; i--) {
    if (!cells.eq(i).hasClass("player1") && !cells.eq(i).hasClass("player2")) {
      holes.removeClass("over");
      cells.eq(i).addClass("over");
      break;
    }
  }
});

/////////////////KEYDOWN event
// $(document).on("keydown", function(cod) {
//     var cells = $(".column")
//         .eq(key)
//         .find(".cell");
//     console.log("Starting keydown ", cells);
//     console.log("First ID" + mouseId);
//     if (cod.keyCode === 39) {
//         for (var i = cells.length - 1; i > 0; i--) {
//             if (
//                 !cells.eq(i).hasClass("player1") &&
//                 !cells.eq(i).hasClass("player2") &&
//                 key < 6
//             ) {
//                 console.log("In the if ", cells.eq(i));
//                 holes.removeClass("over");
//                 key++;
//                 console.log(
//                     "i just increased ",
//                     $(".column")
//                         .eq(mouseId)
//                         .children()
//                 );
//                 $(".column")
//                     .eq(mouseId)
//                     .children()
//                     .eq(i)
//                     .addClass("over");
//                 console.log("Checking " + i);
//                 console.log(
//                     $(".column")
//                         .eq(mouseId)
//                         .index() +
//                         "   " +
//                         cells.eq(i).index()
//                 );
//                 break;
//             }
//         }
//     } else if (cod.keyCode === 37) {
//         for (var i = cells.length - 1; i > 0; i--) {
//             if (
//                 !cells.eq(i).hasClass("player1") &&
//                 !cells.eq(i).hasClass("player2") &&
//                 mouseId > 0
//             ) {
//                 holes.removeClass("over");
//                 mouseId--;
//                 $(".column")
//                     .eq(mouseId)
//                     .children()
//                     .eq(i)
//                     .addClass("over");
//                 console.log(
//                     $(".column")
//                         .eq(mouseId)
//                         .index() +
//                         "   " +
//                         cells.eq(i).index()
//                 );
//                 break;
//             }
//         }
//     } else if (cod.keyCode === 13) {
//         console.log(mouseId);
//         console.log(
//             column
//                 .eq(mouseId)
//                 .find(".cell")
//                 .hasClass("over")
//         );
//         if (cells.hasClass("over")) {
//             //holes.removeClass("over");
//             console.log();
//             $(".over")
//                 .addClass(currentPlayer)
//                 .removeClass("over");
//             switchPlayer();
//         }
//     }
// });
//////CLICK
column.on("click", function(col) {
  var cells = $(col.currentTarget).find(".cell");

  for (var i = cells.length - 1; i >= 0; i--) {
    if (!cells.eq(i).hasClass("player1") && !cells.eq(i).hasClass("player2")) {
      cells.eq(i).addClass(currentPlayer);
      cells.eq(i).removeClass("over");

      //console.log(holes.index(cells.eq(i)));
      break;
    }
  }
  //console.log($(".row" + i));

  if (theWinner(cells)) {
    $("#winner").css("visibility", "visible");
    $("#winner").addClass(currentPlayer);
    box.removeClass("player1").removeClass("player2");
    setTimeout(function() {
      $("main").removeClass("visible");
    }, 3000);

    return;
  } else if (theWinner($(".row" + i))) {
    $("#winner").css("visibility", "visible");
    $("#winner").addClass(currentPlayer);
    box.removeClass("player1").removeClass("player2");
    setTimeout(function() {
      $("main").removeClass("visible");
    }, 3000);
    return;
  }
  theWinnerDiag();
  switchPlayer();
  //.find(".hole").addClass(currentPlayer);
});

$("button").on("click", function() {
  reset();
});

/////////////////////functions Definition
function switchPlayer() {
  if (currentPlayer == "player1") {
    currentPlayer = "player2";
    box.addClass(currentPlayer).removeClass("player1");
  } else {
    currentPlayer = "player1";
    box.addClass(currentPlayer).removeClass("player2");
  }
}

function theWinner(cells) {
  var win = "";
  // var ids = [];
  for (var i = 0; i < cells.length; i++) {
    if (cells.eq(i).hasClass(currentPlayer)) {
      win += "w";
      // ids.push(holes.index(cells.eq(i)));
    } else {
      win += "l";
      // ids = [];
    }
  }
  //console.log(win);
  var index = win.indexOf("wwww");
  if (index > -1) {
    console.log(index);
    cells.eq(index).addClass("win");
    cells.eq(index + 1).addClass("win");
    cells.eq(index + 2).addClass("win");
    cells.eq(index + 3).addClass("win");

    return true;
    //console.log(win);
  }
}
function theWinnerDiag() {
  for (var i = 0; i < diagonals.length; i++) {
    if (
      holes.eq(diagonals[i][0]).hasClass(currentPlayer) &&
      holes.eq(diagonals[i][1]).hasClass(currentPlayer) &&
      holes.eq(diagonals[i][2]).hasClass(currentPlayer) &&
      holes.eq(diagonals[i][3]).hasClass(currentPlayer)
    ) {
      $("#winner").css("visibility", "visible");
      $("#winner").addClass(currentPlayer);
      holes.eq(diagonals[i][0]).addClass("win");
      holes.eq(diagonals[i][1]).addClass("win");
      holes.eq(diagonals[i][2]).addClass("win");
      holes.eq(diagonals[i][3]).addClass("win");
      setTimeout(function() {
        $("main").removeClass("visible");
      }, 3000);
    }
  }
}
function reset() {
  $(".cell")
    .removeClass("player1")
    .removeClass("player2")
    .removeClass("win");
  $("#winner")
    .css("visibility", "hidden")
    .removeClass("player1")
    .removeClass("player2")
    .removeClass("win");
  //currentPlayer = "player1";

  box.removeClass("player1").removeClass("player2");
  $("main").removeClass("visible");
  //.addClass(currentPlayer);

  $(".choices").css("visibility", "visible");
}
//////////// Array diagonals

var diagonals = [
  [0, 7, 14, 21],
  [1, 8, 15, 22],
  [2, 9, 16, 23],
  [3, 8, 13, 18],
  [4, 9, 14, 19],
  [5, 10, 15, 20],
  [6, 13, 20, 27],
  [7, 14, 21, 28],
  [8, 15, 22, 29],
  [9, 14, 19, 24],
  [10, 15, 20, 25],
  [11, 16, 21, 26],
  [12, 19, 26, 33],
  [13, 20, 27, 34],
  [14, 21, 28, 35],
  [15, 20, 25, 30],
  [16, 21, 26, 31],
  [17, 22, 27, 32],
  [18, 25, 32, 39],
  [19, 26, 33, 40],
  [20, 27, 34, 41],
  [21, 26, 31, 36],
  [22, 27, 32, 37],
  [23, 28, 33, 38]
];
