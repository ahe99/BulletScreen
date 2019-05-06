//************************
//待確認:
//  刪除功能?
//
//************************
let btn = document.getElementById("submit");
let text = document.getElementById("text");
let container = document.getElementById("bulletContainer");
let bulletMain = document.getElementsByClassName("bulletMain");
let bullet1 = document.getElementsByClassName("bullet1");
let bullet2 = document.getElementsByClassName("bullet2");
let comment1 = document.getElementsByClassName("comment1");

let scrleft = [0];
const sizeSet = ["verySmall", "small", "middle", "large", "veryLarge"];
const colorSet = [
  "chartreuse",
  "crimson",
  "yellow",
  "pink",
  "green",
  "orange",
  "blue",
  "purple"
];
let numberOfComments = 1; //數目,預設一個

let xhr = new XMLHttpRequest();
xhr.open("GET", "http://localhost:3000/comments");
xhr.send(null);
xhr.onload = function() {
  if (xhr.status == 200) {
    let data = JSON.parse(xhr.responseText);
    for (let d of data) {
      let clone = bulletMain[0].cloneNode(true);
      container.insertBefore(clone, bulletMain[0]);
      scrleft.unshift(d.content.length * 100);
      comment1[0].textContent = d.content;
      comment1[0].classList = "comment1";
      comment1[0].classList.add(d.size);
      comment1[0].classList.add(d.color);
      bullet2[0].innerHTML = bullet1[0].innerHTML;
      comment1[1].classList.remove("comment1");
      numberOfComments++;
    }
  }
}; //初始化page

let wholeSpeed = 15; //整體速度,越小越快
let selfSpeed = 10;
function marquee() {
  for (let i = 0; i < numberOfComments; i++) {
    if (bullet1[i].offsetWidth - bulletMain[i].scrollLeft <= 0) {
      bulletMain[i].scrollLeft -= bullet1[i].offsetWidth;
      scrleft[i] = bulletMain[i].scrollLeft;
    } else {
      scrleft[i] += Math.floor(1 + comment1[i].textContent.length / selfSpeed);
      bulletMain[i].scrollLeft = scrleft[i];
    }
  }
} //跑馬燈
let myMarquee = setInterval(marquee, wholeSpeed);

btn.onclick = function() {
  if (text.value.trim() == "") {
    alert("說點什麼吧！");
    return false;
  } else if (text.value.trim().length > 30) {
    alert("最多輸入30字 目前字數" + text.value.trim().length);
    return false;
  }

  let clone = bulletMain[0].cloneNode(true);
  container.insertBefore(clone, bulletMain[0]);
  scrleft.unshift(0);

  let data = new Object();
  let random = Math.floor(Math.random() * 5);
  data.content = text.value;
  data.size = sizeSet[random];
  random = Math.floor(Math.random() * 8);
  data.color = colorSet[random];

  comment1[0].textContent = data.content;
  comment1[0].classList = "comment1";
  comment1[0].classList.add(data.size);
  comment1[0].classList.add(data.color);
  bullet2[0].innerHTML = bullet1[0].innerHTML;
  comment1[1].classList.remove("comment1");

  text.value = "";
  numberOfComments++;
  xhr.open("POST", "http://localhost:3000/comments");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(JSON.stringify(data));
}; //新增留言
function submitByEnter() {
  if (event.keyCode == 13) {
    btn.click();
  }
}
