/**
 * Makes an element draggable.
 * @param elmnt - The element to make draggable
 * @param header - Optional header element to use as the drag handle
 */
export function dragElement(elmnt: HTMLElement, header?: HTMLElement) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  
  const dragHandle = header || elmnt;
  
  if (dragHandle) {
    // if present, the header is where you move the DIV from:
    dragHandle.onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e: MouseEvent) {
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e: MouseEvent) {
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    
    // set the element's new position ensuring it stays within viewport:
    const newTop = elmnt.offsetTop - pos2;
    const newLeft = elmnt.offsetLeft - pos1;
    
    // Simple boundary checks (adjust as needed)
    if (newTop > 0 && newTop < window.innerHeight - 100) {
      elmnt.style.top = newTop + "px";
    }
    
    if (newLeft > 0 && newLeft < window.innerWidth - 100) {
      elmnt.style.left = newLeft + "px";
    }
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}
