{
  pixels = document.getElementById("p1");
  Rec = pixels.getBoundingClientRect();
  x1 = Rec.left;
  y1 = Rec.top;
  pixels = document.getElementById("p2");
  Rec = pixels.getBoundingClientRect();
  x2 = Rec.left;
  y2 = Rec.top;
  pixels = document.getElementById("p3");
  Rec = pixels.getBoundingClientRect();
  x3 = Rec.left;
  y3 = Rec.top;
  pixels = document.getElementById("p4");
  Rec = pixels.getBoundingClientRect();
  x4 = Rec.left;
  y4 = Rec.top;
  pixels = document.getElementById("p5");
  Rec = pixels.getBoundingClientRect();
  x5 = Rec.left;
  y5 = Rec.top;
  pixels = document.getElementById("p6");
  Rec = pixels.getBoundingClientRect();
  x6 = Rec.left;
  y6 = Rec.top;
  pixels = document.getElementById("p7");
  Rec = pixels.getBoundingClientRect();
  x7 = Rec.left;
  y7 = Rec.top;
  pixels = document.getElementById("p8");
  Rec = pixels.getBoundingClientRect();
  x8 = Rec.left;
  y8 = Rec.top;
  pixels = document.getElementById("p9");
  Rec = pixels.getBoundingClientRect();
  x9 = Rec.left;
  y9 = Rec.top;
  pixels = document.getElementById("p10");
  Rec = pixels.getBoundingClientRect();
  x10 = Rec.left;
  y10 = Rec.top;
  // $('#line1').line(x1 + 24, y1 + 35, x2 + 32, y2, { color: "black", stroke: 2, zindex: 1001 });
  // $('#line2').line(x1 + 24, y1 + 35, x3 + 20, y3, { color: "black", stroke: 2, zindex: 1001 });
  $('#line3').line(x4 + 23, y4 + 30, x5 + 24, y5 + 23, { color: "black", stroke: 2, zindex: 1001 });
  $('#line4').line(x4 + 23, y4 + 30, x6 + 23, y6 + 23, { color: "black", stroke: 2, zindex: 1001 });
  $('#line5').line(x5 + 24, y5 + 26, x7 + 23, y7 + 23, { color: "black", stroke: 2, zindex: 1001 });
  // $('#line6').line(x2 + 23, y2 + 30, x6 + 23, y6 + 23, { color: "black", stroke: 2, zindex: 1001 });
  // $('#line7').line(x3 + 26, y3 + 30, x7 + 23, y7 + 23, { color: "black", stroke: 2, zindex: 1001 });
  $('#line8').line(x7 + 23, y7 + 24, x8 + 23, y8 + 28, { color: "black", stroke: 2, zindex: 1001 });
  $('#line9').line(x6 + 23, y6 + 24, x8 + 23, y8 + 28, { color: "black", stroke: 2, zindex: 1001 });
  // $('#line10').line(x6 + 23, y6 + 30, x9 + 23, y9 + 23, { color: "black", stroke: 2, zindex: 1001 });
  $('#line11').line(x8 + 23, y8 + 30, x9 + 23, y9 + 23, { color: "black", stroke: 2, zindex: 1001 });
  $('#line12').line(x8 + 23, y8 + 30, x10 + 23, y10 + 23, { color: "black", stroke: 2, zindex: 1001 });
  // $('#line13').line(x7 + 26, y7 + 27, x10 + 23, y10 + 23, { color: "black", stroke: 2, zindex: 1001 });
  $('#line14').line(x1 + 24, y1 + 35, x10 + 24, y10 + 20, { color: "black", stroke: 2, zindex: 1001 });
  $('#line15').line(x1 + 24, y1 + 35, x9 + 25, y9 + 20, { color: "black", stroke: 2, zindex: 1001 });
}

// star_id - bird_id
var star_data = new Map([["p1", -1], ["p2", -1], ["p3", -1], ["p4", -1], ["p5", -1], ["p6", -1], ["p7", -1], ["p8", -1], ["p9", -1], ["p10", -1]]);

// bird-id - star-id
var birds_data = new Map([[0, "-1"], [1, "-1"], [2, "-1"], [3, "-1"], [4, "-1"], [5, "-1"], [6, "-1"], [7, "-1"]])

win = -1; // win = -1 => none; win = 1 => crows won; win = 0 => vulture won
turn = 1; // turn = 1 => crow; turn = 0 => vulture
count = 0; // to maintain the number of playing birds 
captured = 0; // to maintain the no of crows captured

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  if (win != -1)
    return;
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {

  if (win != -1)
    return;

  ev.preventDefault();
  var player_id = ev.dataTransfer.getData("text");

  var star_id = ev.target.id;
  // if vacant 
  if (star_data.get(star_id) == -1) {

    // turn vulture
    if (turn == 0 && player_id == 0) {

      // document.getElementById("v_turn").style.visibility = "hidden";
      // document.getElementById("c_turn").style.visibility = "visible";

      // loc of vulture
      var loc = birds_data.get(parseInt(player_id));

      // 1st arrival 
      if (loc == "-1") {
        ev.target.appendChild(document.getElementById(player_id));
        var star_id = ev.target.id;
        star_data.set(star_id, parseInt(player_id));
        var prev_loc = loc;
        birds_data.set(parseInt(player_id), star_id);
        star_data.set(prev_loc, -1);
        document.getElementById("v_turn").style.visibility = "hidden";
        document.getElementById("c_turn").style.visibility = "visible";
        turn = 1;
        count++;
      }
      // capture crow if possible or move to adjacent
      // vul at p1
      else if (loc == "p1") {
        // jump to p6
        if (star_data.get("p2") != -1 && star_data.get("p3") == -1 && star_data.get("p6") == -1) {
          if (star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p7" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p2");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p2", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p7
        else if (star_data.get("p3") != -1 && star_data.get("p2") == -1 && star_data.get("p7") == -1) {
          if (star_id == "p2" || star_id == "p4" || star_id == "p5" || star_id == "p6" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p3");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p3", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p6 or p7
        else if (star_data.get("p2") != -1 && star_data.get("p3") != -1 && (star_data.get("p6") == -1 || star_data.get("p7") == -1)) {
          if (star_id == "p4" || star_id == "p5" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p6") != -1) { // jumped to p6
              captured_crow_id = star_data.get("p2");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p2", -1); // crow captured p2
            }
            else if (star_data.get("p7") != -1) { // jumped to p7
              captured_crow_id = star_data.get("p3");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p3", -1); // crow captured p3
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p2" || star_id == "p3") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p4
      else if (loc == "p4") {
        // jump to p3
        if (star_data.get("p2") != -1 && star_data.get("p6") == -1 && star_data.get("p3") == -1) {
          if (star_id == "p1" || star_id == "p5" || star_id == "p6" || star_id == "p7" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p2");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p2", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p8
        else if (star_data.get("p6") != -1 && star_data.get("p2") == -1 && star_data.get("p8") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p5" || star_id == "p7" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p6");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p6", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p3 or p8
        else if (star_data.get("p2") != -1 && star_data.get("p6") != -1 && (star_data.get("p3") == -1 || star_data.get("p8") == -1)) {
          if (star_id == "p1" || star_id == "p5" || star_id == "p7" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p3") != -1) { // jumped to p3
              captured_crow_id = star_data.get("p2");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p2", -1); // crow captured p2
            }
            else if (star_data.get("p8") != -1) { // jumped to p8
              captured_crow_id = star_data.get("p6");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p6", -1); // crow captured p6
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p2" || star_id == "p6") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p5
      else if (loc == "p5") {
        // jump to p2
        if (star_data.get("p3") != -1 && star_data.get("p7") == -1 && star_data.get("p2") == -1) {
          if (star_id == "p1" || star_id == "p4" || star_id == "p6" || star_id == "p7" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p3");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p3", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p8
        else if (star_data.get("p7") != -1 && star_data.get("p3") == -1 && star_data.get("p8") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p4" || star_id == "p6" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p7");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p7", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p2 or p8
        else if (star_data.get("p3") != -1 && star_data.get("p7") != -1 && (star_data.get("p2") == -1 || star_data.get("p8") == -1)) {
          if (star_id == "p1" || star_id == "p4" || star_id == "p6" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p2") != -1) { // jumped to p2
              captured_crow_id = star_data.get("p3");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p3", -1); // crow captured p3
            }
            else if (star_data.get("p8") != -1) { // jumped to p8
              captured_crow_id = star_data.get("p7");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p7", -1); // crow captured p7
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p3" || star_id == "p7") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p9
      else if (loc == "p9") {
        // jump to p2
        if (star_data.get("p6") != -1 && star_data.get("p8") == -1 && star_data.get("p2") == -1) {
          if (star_id == "p1" || star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p7" || star_id == "p8" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p6");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p6", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p7
        else if (star_data.get("p8") != -1 && star_data.get("p6") == -1 && star_data.get("p7") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p6" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p8");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p8", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p2 or p7
        else if (star_data.get("p6") != -1 && star_data.get("p8") != -1 && (star_data.get("p2") == -1 || star_data.get("p7") == -1)) {
          if (star_id == "p1" || star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p2") != -1) { // jumped to p2
              captured_crow_id = star_data.get("p6");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p6", -1); // crow captured p6
            }
            else if (star_data.get("p7") != -1) { // jumped to p7
              captured_crow_id = star_data.get("p8");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p8", -1); // crow captured p8
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p6" || star_id == "p8") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p10
      else if (loc == "p10") {
        // jump to p3
        if (star_data.get("p7") != -1 && star_data.get("p8") == -1 && star_data.get("p3") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p4" || star_id == "p5" || star_id == "p6" || star_id == "p8" || star_id == "p9") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p7");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p7", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p6
        else if (star_data.get("p8") != -1 && star_data.get("p7") == -1 && star_data.get("p6") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p7" || star_id == "p9") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p8");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p8", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p3 or p6
        else if (star_data.get("p7") != -1 && star_data.get("p8") != -1 && (star_data.get("p3") == -1 || star_data.get("p6") == -1)) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p4" || star_id == "p5" || star_id == "p9") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p3") != -1) { // jumped to p3
              captured_crow_id = star_data.get("p7");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p7", -1); // crow captured p7
            }
            else if (star_data.get("p6") != -1) { // jumped to p6
              captured_crow_id = star_data.get("p8");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p8", -1); // crow captured p8
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p7" || star_id == "p8") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p2
      else if (loc == "p2") {
        // jump to p5
        if (star_data.get("p3") != -1 && star_data.get("p6") == -1 && star_data.get("p5") == -1) {
          if (star_id == "p1" || star_id == "p4" || star_id == "p6" || star_id == "p7" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p3");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p3", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p9
        else if (star_data.get("p6") != -1 && star_data.get("p3") == -1 && star_data.get("p9") == -1) {
          if (star_id == "p1" || star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p7" || star_id == "p8" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p6");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p6", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p5 or p9
        else if (star_data.get("p3") != -1 && star_data.get("p6") != -1 && (star_data.get("p5") == -1 || star_data.get("p9") == -1)) {
          if (star_id == "p1" || star_id == "p4" || star_id == "p7" || star_id == "p8" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p5") != -1) { // jumped to p5
              captured_crow_id = star_data.get("p3");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p3", -1); // crow captured p3
            }
            else if (star_data.get("p9") != -1) { // jumped to p9
              captured_crow_id = star_data.get("p6");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p6", -1); // crow captured p6
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p3" || star_id == "p6") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p3
      else if (loc == "p3") {
        // jump to p4
        if (star_data.get("p2") != -1 && star_data.get("p7") == -1 && star_data.get("p4") == -1) {
          if (star_id == "p1" || star_id == "p5" || star_id == "p6" || star_id == "p7" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p2");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p2", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p10
        else if (star_data.get("p7") != -1 && star_data.get("p2") == -1 && star_data.get("p10") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p4" || star_id == "p5" || star_id == "p6" || star_id == "p8" || star_id == "p9") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p7");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p7", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p4 or p10
        else if (star_data.get("p2") != -1 && star_data.get("p7") != -1 && (star_data.get("p4") == -1 || star_data.get("p10") == -1)) {
          if (star_id == "p1" || star_id == "p5" || star_id == "p6" || star_id == "p8" || star_id == "p9") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p4") != -1) { // jumped to p4
              captured_crow_id = star_data.get("p2");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p2", -1); // crow captured p2
            }
            else if (star_data.get("p10") != -1) { // jumped to p10
              captured_crow_id = star_data.get("p7");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p7", -1); // crow captured p7
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p2" || star_id == "p7") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p6
      else if (loc == "p6") {
        // jump to p1
        if (star_data.get("p2") != -1 && star_data.get("p8") == -1 && star_data.get("p1") == -1) {
          if (star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p7" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p2");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p2", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p10
        else if (star_data.get("p8") != -1 && star_data.get("p2") == -1 && star_data.get("p10") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p7" || star_id == "p9") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p8");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p8", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p1 or p10
        else if (star_data.get("p2") != -1 && star_data.get("p8") != -1 && (star_data.get("p1") == -1 || star_data.get("p10") == -1)) {
          if (star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p7" || star_id == "p9") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p1") != -1) { // jumped to p1
              captured_crow_id = star_data.get("p2");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p2", -1); // crow captured p2
            }
            else if (star_data.get("p10") != -1) { // jumped to p10
              captured_crow_id = star_data.get("p8");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p8", -1); // crow captured p8
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p2" || star_id == "p8") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p7
      else if (loc == "p7") {
        // jump to p1
        if (star_data.get("p3") != -1 && star_data.get("p8") == -1 && star_data.get("p1") == -1) {
          if (star_id == "p2" || star_id == "p4" || star_id == "p5" || star_id == "p6" || star_id == "p8" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p3");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p3", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p9
        else if (star_data.get("p8") != -1 && star_data.get("p3") == -1 && star_data.get("p9") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p4" || star_id == "p5" || star_id == "p6" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p8");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p8", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p1 or p9
        else if (star_data.get("p3") != -1 && star_data.get("p8") != -1 && (star_data.get("p1") == -1 || star_data.get("p9") == -1)) {
          if (star_id == "p2" || star_id == "p4" || star_id == "p5" || star_id == "p6" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p1") != -1) { // jumped to p1
              captured_crow_id = star_data.get("p3");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p3", -1); // crow captured p3
            }
            else if (star_data.get("p9") != -1) { // jumped to p9
              captured_crow_id = star_data.get("p8");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p8", -1); // crow captured p8
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p3" || star_id == "p8") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
      // vul at p8
      else if (loc == "p8") {
        // jump to p4
        if (star_data.get("p6") != -1 && star_data.get("p7") == -1 && star_data.get("p4") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p5" || star_id == "p7" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p6");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p6", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p5
        else if (star_data.get("p7") != -1 && star_data.get("p6") == -1 && star_data.get("p5") == -1) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p4" || star_id == "p6" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged
            captured_crow_id = star_data.get("p7");
            birds_data.set(parseInt(captured_crow_id), "captured");
            star_data.set("p7", -1); // crow captured

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // jump to p4 or p5
        else if (star_data.get("p6") != -1 && star_data.get("p7") != -1 && (star_data.get("p4") == -1 || star_data.get("p5") == -1)) {
          if (star_id == "p1" || star_id == "p2" || star_id == "p3" || star_id == "p9" || star_id == "p10") {
            //alert("Capture the crow");
            return;
          }
          else {
            ev.target.appendChild(document.getElementById(player_id));
            var star_id = ev.target.id;
            star_data.set(star_id, parseInt(player_id));
            var prev_loc = loc;
            birds_data.set(parseInt(player_id), star_id);
            star_data.set(prev_loc, -1);  // vulture dragged

            if (star_data.get("p4") != -1) { // jumped to p4
              captured_crow_id = star_data.get("p6");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p6", -1); // crow captured p6
            }
            else if (star_data.get("p5") != -1) { // jumped to p5
              captured_crow_id = star_data.get("p7");
              birds_data.set(parseInt(captured_crow_id), "captured");
              star_data.set("p7", -1); // crow captured p7
            }

            const element = document.getElementById(captured_crow_id);
            element.remove(); // remove captured crow div

            document.getElementById("v_turn").style.visibility = "hidden";
            document.getElementById("c_turn").style.visibility = "visible";
            turn = 1;
            captured++;
            if (captured == 1)
              document.getElementById("cc1").style.visibility = "visible";
            else if (captured == 2)
              document.getElementById("cc2").style.visibility = "visible";
            else if (captured == 3)
              document.getElementById("cc3").style.visibility = "visible";
            else if (captured == 4) {
              win = 0;
              document.getElementById("cc4").style.visibility = "visible";
              document.getElementById("v_won").style.visibility = "visible";
            }
          }
        }
        // no jump.. move to adjacent
        else if (star_id == "p6" || star_id == "p7") {
          ev.target.appendChild(document.getElementById(player_id));
          var star_id = ev.target.id;
          star_data.set(star_id, parseInt(player_id));
          var prev_loc = loc;
          birds_data.set(parseInt(player_id), star_id);
          star_data.set(prev_loc, -1);
          document.getElementById("v_turn").style.visibility = "hidden";
          document.getElementById("c_turn").style.visibility = "visible";
          turn = 1;
        }
      }
    }

    // turn crow
    else if (turn == 1 && (player_id == 1 || player_id == 2 || player_id == 3 || player_id == 4 || player_id == 5 || player_id == 6 || player_id == 7)) {

      // document.getElementById("c_turn").style.visibility = "hidden";
      // document.getElementById("v_turn").style.visibility = "visible";

      var loc = birds_data.get(parseInt(player_id));

      // 1st arrival
      if (loc == "-1") {
        ev.target.appendChild(document.getElementById(player_id));
        var star_id = ev.target.id;
        star_data.set(star_id, parseInt(player_id));
        var prev_loc = loc;
        birds_data.set(parseInt(player_id), star_id);
        star_data.set(prev_loc, -1);
        document.getElementById("c_turn").style.visibility = "hidden";
        document.getElementById("v_turn").style.visibility = "visible";
        turn = 0;
        count++;
      }
      // move only to adjacent location only when all the 8 birds are playing ie count=8
      else if (count == 8 &&
        ((loc == "p1" && (star_id == "p2" || star_id == "p3"))
          || (loc == "p2" && (star_id == "p1" || star_id == "p3" || star_id == "p4" || star_id == "p6"))
          || (loc == "p3" && (star_id == "p1" || star_id == "p2" || star_id == "p5" || star_id == "p7"))
          || (loc == "p4" && (star_id == "p2" || star_id == "p6"))
          || (loc == "p5" && (star_id == "p3" || star_id == "p7"))
          || (loc == "p6" && (star_id == "p2" || star_id == "p4" || star_id == "p8" || star_id == "p9"))
          || (loc == "p7" && (star_id == "p3" || star_id == "p5" || star_id == "p8" || star_id == "p10"))
          || (loc == "p8" && (star_id == "p6" || star_id == "p7" || star_id == "p9" || star_id == "p10"))
          || (loc == "p9" && (star_id == "p6" || star_id == "p8"))
          || (loc == "p10" && (star_id == "p7" || star_id == "p8")))) {

        ev.target.appendChild(document.getElementById(player_id));
        var star_id = ev.target.id;
        star_data.set(star_id, parseInt(player_id));
        var prev_loc = loc;
        birds_data.set(parseInt(player_id), star_id);
        star_data.set(prev_loc, -1);
        document.getElementById("c_turn").style.visibility = "hidden";
        document.getElementById("v_turn").style.visibility = "visible";
        turn = 0;
      }

      // check winning condition
      var vul_loc = birds_data.get(0);

      if ((vul_loc == "p1" && star_data.get("p2") != -1 && star_data.get("p3") != -1 && star_data.get("p6") != -1 && star_data.get("p7") != -1)
        || (vul_loc == "p2" && star_data.get("p1") != -1 && star_data.get("p3") != -1 && star_data.get("p4") != -1 && star_data.get("p5") != -1 && star_data.get("p6") != -1 && star_data.get("p9") != -1)
        || (vul_loc == "p3" && star_data.get("p1") != -1 && star_data.get("p2") != -1 && star_data.get("p4") != -1 && star_data.get("p5") != -1 && star_data.get("p7") != -1 && star_data.get("p10") != -1)
        || (vul_loc == "p4" && star_data.get("p2") != -1 && star_data.get("p3") != -1 && star_data.get("p6") != -1 && star_data.get("p8") != -1)
        || (vul_loc == "p5" && star_data.get("p2") != -1 && star_data.get("p3") != -1 && star_data.get("p7") != -1 && star_data.get("p8") != -1)
        || (vul_loc == "p6" && star_data.get("p1") != -1 && star_data.get("p2") != -1 && star_data.get("p4") != -1 && star_data.get("p8") != -1 && star_data.get("p9") != -1 && star_data.get("p10") != -1)
        || (vul_loc == "p7" && star_data.get("p1") != -1 && star_data.get("p3") != -1 && star_data.get("p5") != -1 && star_data.get("p8") != -1 && star_data.get("p9") != -1 && star_data.get("p10") != -1)
        || (vul_loc == "p8" && star_data.get("p4") != -1 && star_data.get("p5") != -1 && star_data.get("p6") != -1 && star_data.get("p7") != -1 && star_data.get("p9") != -1 && star_data.get("p10") != -1)
        || (vul_loc == "p9" && star_data.get("p2") != -1 && star_data.get("p6") != -1 && star_data.get("p7") != -1 && star_data.get("p8") != -1)
        || (vul_loc == "p10" && star_data.get("p3") != -1 && star_data.get("p6") != -1 && star_data.get("p7") != -1 && star_data.get("p8") != -1)) {
        win = 1;
        //alert("Crows won");
        document.getElementById("c_won").style.visibility = "visible";
      }
    }
  }
}