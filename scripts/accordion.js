export const accordionData =  [
  {
    id: 1,
    title: 'CSS Grid ',
    description: `
    <p>
      The CSS grid layout module excels at dividing a page into major regions or defining the relationship in terms of size, position, and layer, between parts of a control built from HTML primitives.
    </p>
  `
  },
  {
    id: 2,
    title: 'Flexbox',
    description: `
      <p>
        The flexible box layout module (usually referred to as flexbox) is a one-dimensional layout model for distributing space between items and includes numerous alignment capabilities. This article gives an outline of the main features of flexbox, which we will explore in more detail in the rest of these guides.
      </p>
    `
  },
  {
    id: 3,
    title: 'The HTML box model',
    description: `
      <p>
        In CSS, the term "box model" is used when talking about design and layout. The CSS box model is essentially a box that wraps around every HTML element. It consists of: content, padding, borders and margins.
      </p>
    `
  }
]

export function addAccordionEvents(accordionPanelLms, panelClass, titleClass, keepOthersClosed) {
  accordionPanelLms.forEach(panel => {
  
    panel.addEventListener('click', e => {
      let isPanelActive;
      // Target is accordion title
      if (e.target.closest(titleClass)) {
        const titleLm = e.target.closest(titleClass);
        isPanelActive = panel.classList.toggle('active');
        titleLm.ariaExpanded = isPanelActive;
        titleLm.nextElementSibling.ariaHidden = !isPanelActive;
      }

      keepOthersClosed && accordionPanelLms.forEach(panel => {
        if (panel !== e.target.closest(panelClass)) {
          panel.classList.remove('active');
          // set ariaExpanded and ariaHidden to initial values
          const titleLm = panel.querySelector('.accordion__title-container');
          const contentLm = panel.querySelector('.accordion-content-wrapper');
          titleLm.ariaExpanded = false;
          contentLm.ariaHidden = true;
        }
      });
    })
  });
}