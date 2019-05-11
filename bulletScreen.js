//************************
//待確認:
//  刪除功能?
//
//************************
let btn = document.getElementById("submit");
let text = document.getElementById("text");
let container = document.getElementById("bulletContainer");
let bulletContainer = document.getElementById("bulletContainer");
let bulletMain = document.getElementsByClassName("bulletMain");
let comment = document.getElementsByClassName("comment");

let scrleft = [0];
const sizeSet = ["verySmall", "small", "middle", "large", "veryLarge"];
const colorSet = [
  "red",
  "yellow",
  "pink",
  "chartreuse",
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

      scrleft.unshift(d.content.length * 10);
      comment[0].textContent = d.content;
      comment[0].classList = "comment";
      comment[0].classList.add(d.size);
      comment[0].classList.add(d.color);
      comment[0].style.transform = "translateX(" + scrleft[0] + "px" + ")";
      numberOfComments++;
    }
  }
}; //初始化page

let wholeSpeed = 10; //整體速度,越小越快
let selfSpeed = 15; //根據字數的速度
function marquee() {
  for (let i = 0; i < numberOfComments; i++) {
    if (comment[i].offsetWidth <= -scrleft[i]) {
      scrleft[i] = bulletContainer.offsetWidth;
      comment[i].style.transform = "translateX(" + scrleft[i] + "px" + ")";
    } else {
      scrleft[i] -= 1 + comment[i].textContent.length / selfSpeed;
      comment[i].style.transform = "translateX(" + scrleft[i] + "px" + ")";
    }
  }
} //跑馬燈
let myMarquee = setInterval(marquee, wholeSpeed);

btn.onclick = function() {
  if (text.value.trim() == "") {
    alert("說點什麼吧！");
    return false;
  }

  let clone = bulletMain[0].cloneNode(true);
  container.insertBefore(clone, bulletMain[0]);
  scrleft.unshift(bulletContainer.offsetWidth);

  let data = new Object();
  let random = Math.floor(Math.random() * 5);
  data.content = text.value;
  data.size = sizeSet[random];
  random = Math.floor(Math.random() * 7);
  data.color = colorSet[random];

  comment[0].textContent = data.content;
  comment[0].classList = "comment";
  comment[0].classList.add(data.size);
  comment[0].classList.add(data.color);

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
