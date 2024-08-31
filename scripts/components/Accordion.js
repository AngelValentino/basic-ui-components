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
];

export class Accordion {
  constructor(root, accordionData, keepOthersClosed = true) {
    // Error check to ensure root element and accordionData are provided
    if (!root) throw new Error("Root element is required");
    if (!accordionData || accordionData.length === 0) throw new Error("Accordion Array Data element is required and must not be empty");

    // Generate the HTML for the accordion panels and insert it into the root element
    root.innerHTML = Accordion.generateAccordionPanels(accordionData);

    // Class variables
    this.keepOthersClosed = keepOthersClosed;
    
    // DOM references
    this.lms = {
      accordionPanelLms: root.querySelectorAll('.accordion__content-wrapper'),
      accordionLm: root
    }

    // Add event listener
    this.lms.accordionLm.addEventListener('click', this.switchPanel.bind(this))    
  }


  // Toggles the visibility of the panel associated with the clicked title
  togglePanel(title) {
    // Clear any previous timeouts for hiding panels
    clearTimeout(this.activePanelHideTimId);
    clearTimeout(this.othersPanelsHideTimId);
    
     // Get the ID of the active panel from the title's aria-controls attribute
    const activePanelId = '#' + title.getAttribute("aria-controls");
    const activePanel = this.lms.accordionLm.querySelector(activePanelId);
    
    // Loop through all the accordion panels and toggle them based on the active class
    this.lms.accordionPanelLms.forEach(panel => {
      if (panel === activePanel) {
        // Toggle the active class on the parent element of the active panel
        const isPanelActive = panel.parentElement.classList.toggle('active');
      
        // Update ARIA attributes to reflect the panel's state
        panel.setAttribute('aria-hidden', !isPanelActive);
        title.setAttribute('aria-expanded', isPanelActive);
      } 
      else {
        if (this.keepOthersClosed) {
          // Close the remaining open panels
          panel.parentElement.classList.remove('active');

          // Add ARIA attributes
          panel.setAttribute('aria-hidden', true);
          title.setAttribute('aria-expanded', false);
        }
      }
    });
  }

  // Handles panel switching when an accordion title is clicked
  switchPanel(e) {
    const clickedTitle = e.target.closest('.accordion__title');
    if (clickedTitle) {
      this.togglePanel(clickedTitle);
    }
  }

  // Generates the HTML for the accordion panels based on the provided data
  static generateAccordionPanels(accordionData) {
    return accordionData.map(({ id, title, description }) => (
      `
        <li class="accordion-panel">
          <button aria-controls="accordion__content-wrapper-${id}" aria-expanded="false" class="accordion__title">
            <p class="accordion-title">
              ${title}
            </p>
            <svg focusable="false" role="presentation" class="accordion__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="48" d="m112 328l144-144l144 144" />
            </svg>
          </button>
          <div aria-hidden="true" id="accordion__content-wrapper-${id}" class="accordion__content-wrapper">
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