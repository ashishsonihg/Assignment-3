var btn = document.querySelector('.add');
var remove = document.querySelector('.draggable');


function dragStart(e) {
  this.style.opacity = '0.4';
  dragSrcEl = this;
  e.dataTransfer.effectAllowed = 'move';
  e.dataTransfer.setData('text', this.innerHTML);
}

function dragEnter(e) {
  this.classList.add('over');
}

function dragLeave(e) {
  e.stopPropagation();
  this.classList.remove('over');
}

function dragOver(e) {
  e.preventDefault();
  e.dataTransfer.dropEffect = 'move';
  return false;
}


function dragDrop(e) {
  if(this.className=="completed over" && dragSrcEl != this){
    var newItem = e.dataTransfer.getData('text');
    var li = document.createElement('li');
    var attr = document.createAttribute('draggable');
    var div = document.querySelector('#completedList');
    li.className = 'draggable-completed';
    attr.value = 'true';
    li.setAttributeNode(attr);
    li.innerHTML=newItem;
    div.appendChild(li);
    addEventsDragAndDrop(li);
    document.getElementById(newItem).remove();
  }
  else if(this.id=="lis" && dragSrcEl.className=="completed"){
    var newItem = e.dataTransfer.getData('text');
    var li = document.createElement('li');
    var attr = document.createAttribute('draggable');
    var div = document.querySelector('#lis');
    li.className = 'draggable';
    attr.value = 'true';
    li.setAttributeNode(attr);
    li.innerHTML=newItem;
    div.appendChild(li);
    addEventsDragAndDrop(li);
    document.getElementById(newItem).remove();
  }
  else if(dragSrcEl.className=="draggable" && this.className=='draggable over') {
    dragSrcEl.innerHTML = this.innerHTML;
    this.innerHTML = e.dataTransfer.getData('text');
  }
  return false;
}

function dragEnd(e) {
  var listItens = document.querySelectorAll('.draggable');
  [].forEach.call(listItens, function(item) {
    item.classList.remove('over');
  });
  this.style.opacity = '1';
}

function addEventsDragAndDrop(el) {
  el.addEventListener('dragstart', dragStart, false);
  el.addEventListener('dragenter', dragEnter, false);
  el.addEventListener('dragover', dragOver, false);
  el.addEventListener('dragleave', dragLeave, false);
  el.addEventListener('drop', dragDrop, false);
  el.addEventListener('dragend', dragEnd, false);
}

var listItens = document.querySelectorAll('.draggable');
[].forEach.call(listItens, function(item) {
  addEventsDragAndDrop(item);
});

function addNewItem() {
  var newItem = document.querySelector('.input').value;
  if (newItem != '') {
    document.querySelector('.input').value = '';
    var li = document.createElement('li');
    var attr = document.createAttribute('draggable');
    var id=document.createAttribute('id');
    var ul = document.querySelector('ul');
    li.className = 'draggable';
    attr.value = 'true';
    id.value=newItem;
    li.setAttributeNode(attr);
    li.setAttributeNode(id);
    li.appendChild(document.createTextNode(newItem));
    ul.appendChild(li);

    addEventsDragAndDrop(li);
  }
}

btn.addEventListener('click', addNewItem);
addEventsDragAndDrop(document.getElementById('completedList'));





function saveList(){
  var listItens = document.getElementsByClassName('draggable');
  var list="";
  for(let i=0;i<listItens.length;i++){
    list+=listItens[i].innerHTML+",";
  }
  list=list.substring(0, list.length - 1);
  localStorage.setItem("todo",list);

  listItens = document.getElementsByClassName('draggable-completed');
  list="";
  for(let i=0;i<listItens.length;i++){
    list+=listItens[i].innerHTML+",";
  }
  list=list.substring(0, list.length - 1);
  localStorage.setItem("completed",list);
}

function clearList()
{
  localStorage.clear();
  populatePage();
}

function populatePage(){

  let pop=document.getElementById('lis');
  let com=document.getElementById('completedList');
  com.innerHTML="";
  pop.innerHTML="";
  let storedValues="";
  if(localStorage.getItem('todo'))
  {
    list=localStorage.getItem('todo').split(',');
    for(let i=0;i<list.length;i++){
      storedValues+="<li class='draggable' draggable='true' id='"+list[i]+"'>"+list[i]+"</li>";
    }
    pop.innerHTML=storedValues;
    var listItens = document.querySelectorAll('.draggable');
    [].forEach.call(listItens, function(item) {
      addEventsDragAndDrop(item);
    });
  }

  if(localStorage.getItem('completed')){
    list=localStorage.getItem('completed').split(',');
    storedValues="";
    for(let i=0;i<list.length;i++){
      storedValues+="<li class='draggable-completed' draggable='true' id='"+list[i]+"'>"+list[i]+"</li>";
    }

    com.innerHTML=storedValues;
    var listItens = document.querySelectorAll('.draggable-completed');
    [].forEach.call(listItens, function(item) {
      addEventsDragAndDrop(item);
    });
  }
}
populatePage();
