//TODO: implement your own max heap
//Time it! Goal: <2 hours

class MaxHeap {
  constructor(root) {
    this.data = [root];
  }

  //Add a new node and put it in the correct place
  addNode(data) {
    //Add the new node to the very end
    this.data.push(data);
    //Check the parent. If the parent data is less than the newNode data, swap.
    //If it's greater, we're done
    let currentIndex = this.data.length - 1;
    while (this.data[this.parent(currentIndex)] < this.data[currentIndex]) {
      this.swapNodes(this.parent(currentIndex), currentIndex);
      currentIndex = this.parent(currentIndex);
    }
  }

  //Remove the max node and then heapify
  removeMax(index = 0) {
    const returnThis = this.data[0];
    const leftIndex = this.leftChild(index);
    const rightIndex = this.rightChild(index);
    let leftData = this.data[leftIndex];
    let rightData = this.data[rightIndex];

    if (!rightData && !leftData) {
      return;
    }
    if (!rightData || leftData > rightData) {
      this.data[index] = leftData;
      this.data[leftIndex] = undefined;
      this.removeMax(leftIndex);
    } else {
      this.data[index] = rightData;
      this.data[rightIndex] = undefined;
      this.removeMax(rightIndex);
    }

    return returnThis;
  }

  parent(i) {
    return Math.ceil(i / 2) - 1;
  }

  leftChild(i) {
    return i * 2 + 1;
  }

  rightChild(i) {
    return i * 2 + 2;
  }

  swapNodes(index1, index2) {
    const temp = this.data[index2];
    this.data[index2] = this.data[index1];
    this.data[index1] = temp;
  }

  breadthPrint(level = 0) {
    let start = level * level - 1;
    if (level === 0 || level === 1) {
      start = level;
    }
    const finish = start * 2;
    let empty = true;
    for (let i = start; i <= finish; i++) {
      if (this.data[i]) {
        let newString = "";
        for (let i = 0; i !== level; i++) {
          newString = newString.concat("--");
        }
        const print = newString.concat(this.data[i]);
        console.log(print);
        empty = false;
      }
    }
    if (empty) {
      return;
    }
    this.print(level + 1);
  }

  depthPrint(index = 0, level = 0) {
    let newString = "";
    for (let i = 0; i !== level; i++) {
      newString = newString.concat("--");
    }
    console.log(newString + this.data[index]);
    if (this.data[this.leftChild(index)]) {
      this.depthPrint(this.leftChild(index), level + 1);
    }
    if (this.data[this.rightChild(index)]) {
      this.depthPrint(this.rightChild(index), level + 1);
    }
  }
}

const myMaxHeap = new MaxHeap(42);
myMaxHeap.addNode(24);
myMaxHeap.addNode(12);
myMaxHeap.addNode(9);
myMaxHeap.addNode(99);
myMaxHeap.addNode(1222);
myMaxHeap.depthPrint();
myMaxHeap.removeMax();
myMaxHeap.depthPrint();
