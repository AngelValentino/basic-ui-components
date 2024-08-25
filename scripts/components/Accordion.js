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

export class Accordion {
  constructor(root, accordionData, keepOthersClosed = true) {
    // Error check to ensure root element and accordionData are provided
    if (!root) throw new Error("Root element is required");
    if (!accordionData || accordionData.length === 0) throw new Error("Accordion Array Data element is required and must not be empty");

    // Generate the HTML for the accordion panels and insert it into the root element
    root.innerHTML = Accordion.generateAccordionPanels(accordionData);

    // DOM references
    this.lms = {
      accordionPanelLms: root.querySelectorAll('.accordion-panel')
    }

    // Add event listener
    this.addAccordionEvents(this.lms.accordionPanelLms, keepOthersClosed);
  }

  addAccordionEvents(accordionPanelLms, keepOthersClosed) {
    accordionPanelLms.forEach(panel => {
    
      panel.addEventListener('click', e => {
        let isPanelActive;
        
        // Check if the click target is an accordion title
        if (e.target.closest('.accordion__title-container')) {
          const titleLm = e.target.closest('.accordion__title-container');

          // Toggle the 'active' class on the clicked panel
          isPanelActive = panel.classList.toggle('active');

          // Update ARIA attributes based on the panel's state
          titleLm.ariaExpanded = isPanelActive;
          titleLm.nextElementSibling.ariaHidden = !isPanelActive;
        }
  
        // If `keepOthersClosed` is true, close other panels
        keepOthersClosed && accordionPanelLms.forEach(panel => {
          if (panel !== e.target.closest('.accordion-panel')) {
            // Remove the 'active' class from the inactive pannels
            panel.classList.remove('active');

            // Set ARIA attributes to initial values
            const titleLm = panel.querySelector('.accordion__title-container');
            const contentLm = panel.querySelector('.accordion__content-wrapper');
            titleLm.ariaExpanded = false;
            contentLm.ariaHidden = true;
          }
        });
      })
    });
  }

  // Generates the HTML for the accordion panels based on the provided data
  static generateAccordionPanels(accordionData) {
    return accordionData.map(({ id, title, description }) => (
      `
        <li class="accordion-panel">
          <div aria-controls="accordion__content-wrapper-${id}" aria-expanded="false" class="accordion__title-container">
            <h2 class="accordion-title">
              ${title}
            </h2>
            <svg aria-hidden="true" focusable="false" role="presentation" class="accordion__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 328l144-144l144 144" />
            </svg>
          </div>
          <div id="accordion__content-wrapper-${id}" class="accordion__content-wrapper" aria-hidden="true">
            <div>
              <div class="accordion__content">
              ${description}
              </div>
            </div>
          </div>
        </li>
      ` 
    )).join('');
  }
}