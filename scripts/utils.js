let lastFocusedLmBeforeModalOpened;

export function toggleModalFocus(focusBehaviour, firstFocusableLm) {
  if (focusBehaviour === 'add') {
    lastFocusedLmBeforeModalOpened = document.activeElement;
    firstFocusableLm.focus();
  } 
  else if (focusBehaviour === 'return') {
    lastFocusedLmBeforeModalOpened.focus();
  }
}

export function trapFocus(e, element) {
  const focusableLms = element.querySelectorAll('a[href]:not([disabled]), button:not([disabled]), textarea:not([disabled]), input[type="text"]:not([disabled]), input[type="radio"]:not([disabled]), input[type="checkbox"]:not([disabled]), select:not([disabled])');
  const firstFocusableLm = focusableLms[0]; 
  const lastFocusableLm = focusableLms[focusableLms.length - 1];

  const isTabPressed = (e.key === 'Tab');
  
  if (!isTabPressed) { 
    return; 
  }

  if (e.shiftKey) /* shift + tab */ {
    if (document.activeElement === firstFocusableLm ) {
      lastFocusableLm.focus();
      e.preventDefault();
    }
  } 
  else /* tab */ {
    if (document.activeElement === lastFocusableLm) {
      firstFocusableLm.focus();
      e.preventDefault();
    }
  }
}

// Event handler function for closing modal on Escape key
const handleModalCloseAtEscapeKey = closeFun => e => {
  if (e.key === 'Escape') closeFun();
};

// Event handler function for closing modal on outside click
const handleModalOutsideClick = (closeFun, matchingClass) => e => {
  if (e.target.matches(matchingClass)) {
    closeFun();
  }
};

// Event handler function for trapping focus within the modal content
const handleTrapFocus = modalContentLm => e => {
  trapFocus(e, modalContentLm);
  console.log('trap focus')
}


// Toggle modal events (add or remove event listeners)
export function toggleModalEvents(eventsHandler, action, closeFun, closeLms, modalContentLm, modalContainerLm, matchingClass) {
  // Create bound event handler functions
  function addEventListeners() {
    const escKeyHandler = handleModalCloseAtEscapeKey(closeFun);
    const outsideClickHandler = handleModalOutsideClick(closeFun, matchingClass);
    const trapFocusHandler = handleTrapFocus(modalContentLm);

    // Add event listeners if elements exist
    document.body.addEventListener('keydown', escKeyHandler);
    modalContentLm?.addEventListener('keydown', trapFocusHandler);
    modalContainerLm?.addEventListener('click', outsideClickHandler);

    if (closeLms) {
      // An array of elements
      if (Array.isArray(closeLms)) {
        closeLms.forEach(closeLm => {
          closeLm.addEventListener('click', closeFun);
        });
      } 
      // Only one element
      else {
        closeLms.addEventListener('click', closeFun);
      }
    }

    // Store handlers on the eventsHandler object to remove them later
    eventsHandler.escKeyHandler = escKeyHandler;
    modalContentLm && (eventsHandler.trapFocusHandler = trapFocusHandler);
    modalContainerLm && (eventsHandler.outsideClickHandler = outsideClickHandler);
    closeLms && (eventsHandler.closeFun = closeFun);
  }

  function removeEventListeners() {
    // Remove event listeners if elements exist
    document.body.removeEventListener('keydown', eventsHandler.escKeyHandler);
    modalContentLm?.removeEventListener('keydown', eventsHandler.trapFocusHandler);
    modalContainerLm?.removeEventListener('click', eventsHandler.outsideClickHandler);

    if (closeLms) {
      // An array of elements
      if (Array.isArray(closeLms)) {
        closeLms.forEach(closeLm => {
          closeLm.removeEventListener('click', eventsHandler.closeFun);
        });
      } 
      // Only one element
      else {
        closeLms.removeEventListener('click', eventsHandler.closeFun);
      }
    }

    // Clean up stored handlers
    delete eventsHandler.escKeyHandler;
    modalContentLm && delete eventsHandler.trapFocusHandler;
    modalContainerLm && delete eventsHandler.outsideClickHandler;
    closeLms && delete eventsHandler.closeFun;
  }

  if (action === 'add') {
    addEventListeners();
  } 
  else if (action === 'remove') {
    removeEventListeners();
  }
}

export function handleSwipe(onSwipeLeft, onSwipeRight, minSwipeDistance = 25) {
  let touchStartX = null;
  let touchStartY = null;
  let touchEndX = null;
  let touchEndY = null;

  function handleTouchStart(e) {
    touchStartX = e.targetTouches[0].clientX;
    touchStartY = e.targetTouches[0].clientY;
  }

  function handleTouchMove(e) {
    touchEndX = e.targetTouches[0].clientX;
    touchEndY = e.targetTouches[0].clientY;
  }

  function handleTouchEnd() {
    if (touchStartX === null || touchEndX === null || touchStartY === null || touchEndY === null) return;

    const distanceX = touchStartX - touchEndX;
    const distanceY = touchStartY - touchEndY;
    const isLeftSwipe = distanceX > minSwipeDistance;
    const isRightSwipe = distanceX < -minSwipeDistance;

    if (isRightSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      onSwipeRight();
    }

    if (isLeftSwipe && Math.abs(distanceX) > Math.abs(distanceY)) {
      onSwipeLeft();
    }

    // Reset touch positions
    touchStartX = null;
    touchStartY = null;
    touchEndX = null;
    touchEndY = null;
  }

  return {
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
}