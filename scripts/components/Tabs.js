export const tabsData = [
  {
    id: 1,
    title: 'Advertising',
    content: `
      <h3>Advertising</h3>
      <p>
        Advertising allows a company to reach specific
        audiences based on demographics, interests, and behaviors. This
        can increase the effectiveness of advertising campaigns and
        improve return on investment.
      </p>
    `
  },
  {
    id: 2,
    title: 'Socials',
    content: `
      <h3>Socials</h3>
      <p>
        Social media platforms are used to engage
        with customers and promote products or services. Social media can
        also be used to gather customer feedback and insights to inform
        future marketing strategies.
      </p>
    `
  },
  {
    id: 3,
    title: 'Marketing',
    content: `
      <h3>Marketing</h3>
      <p>
        Marketing is used to attract and
        retain customers by creating and sharing valuable and relevant
        content. This can help to establish the company as a thought
        leader in its industry and build trust with customers.
      </p>
    `
  },
  {
    id: 4,
    title: 'Email',
    content: `
      <h3>Email</h3>
      <p>
        Email campaigns are useful to communicate with
        customers and promote products or services. Email campaigns can be
        personalized and targeted to specific audiences to increase their
        effectiveness.
      </p>
    `
  },
]

export class Tabs {
  constructor(root, tabsData) {
    // Error check to ensure root element and tabsData are provided
    if (!root) throw new Error("Root element is required");
    if (!tabsData || tabsData.length === 0) throw new Error("Tabs Array data element is required and must not be empty");

    // Insert the generated tabs and panels into the root element
    root.innerHTML = Tabs.generateTabs(tabsData);

    // DOM references
    this.lms = {
      tabsLm: root,
      tabTitleListLm: root.querySelector('.tabs__title-list'),
      tabPanelListLm: root.querySelector('.tabs__panel-list'),
      tabTitleLms: root.querySelectorAll('.tabs__title'),
      tabPanelLms: root.querySelectorAll('.tabs__panel')
    }

    this.setInitialActiveTab();

    // Add click event listener to handle tab switching
    this.lms.tabTitleListLm.addEventListener('click', this.handleSwitchTab.bind(this));
  }

  // Toggles active tab based on the currently selected tab
  toggleTitle(currentTab) {
    this.lms.tabTitleLms.forEach(tab => {
      if (tab !== currentTab) {
        // Tab is not the clicked/current one
        tab.setAttribute('aria-selected', false);
        tab.classList.remove('active');
      } 
      else {
        // Tabs is the clicked/current one
        tab.setAttribute('aria-selected', true);
        tab.classList.add('active');
      }
    })
  }

  // Toggles the visibility of the tab panels based on the currently selected tab
  togglePanel(tab) {
    // Get the ID of the active panel from the tab's aria-controls attribute
    const activePanelId = '#' + tab.getAttribute("aria-controls");
    const activePanel = this.lms.tabsLm.querySelector(activePanelId);
  
    // Loop through all tab panels and toggle them based on the active tab
    this.lms.tabPanelLms.forEach(panel => {
      if (panel === activePanel) {
        panel.removeAttribute('hidden'); // Show the active panel
      } 
      else {
        panel.setAttribute('hidden', ''); // Hide other panels
      }
    });
  }

  // Switches to the specified tab and updates the active title and panel
  switchTab(tab) {
    this.toggleTitle(tab);
    this.togglePanel(tab);
  } 

  // Handles click events on tab titles to switch tabs
  handleSwitchTab(e) {
    const clickedTab = e.target.closest('.tabs__title');
    if (clickedTab) {
      this.switchTab(clickedTab);
    }
  }

  // Sets the initial active tab title based on the position parameter
  setInitialActiveTitle(position) {
    const tab = this.lms.tabTitleLms[position]; // Get the tab at the given position
    tab.classList.add('active');
    tab.setAttribute('aria-selected', true);
  }

  // Sets the initial active tab panel based on the position parameter
  setInitialActivePanel(postion) {
    this.togglePanel(this.lms.tabTitleLms[postion])
  }

  setInitialActiveTab(position = 1) {
    // Validate the position argument to ensure it is within the range of the available tabs Array
    if (position > this.lms.tabTitleLms.length || position < 1) {
      throw new Error('Position must be at least 1 and not be greater than the tabs data list length.')
    }
    position--; // Convert the position to an index
    this.setInitialActiveTitle(position)
    this.setInitialActivePanel(position)
  }

  // Generates HTML for the tab titles based on tabsData
  static generateTitles(tabsData) {
    return tabsData.map(tab => (
      `
        <li role="presentation">
          <button 
            aria-selected="false" 
            class="tabs__title" 
            aria-controls="tabs__panel-${tab.id}" 
            role="tab"
          >
            ${tab.title}
          </button>
        </li>
      `
    )).join('');
  }


  // Generates HTML for the tab panels based on tabsData
  static generatePanels(tabsData) {
    return tabsData.map(tab => (
      `
        <div 
          class="tabs__panel" 
          id="tabs__panel-${tab.id}" 
          role="tabpanel"
        >
          ${tab.content}
        </div>
      `
    )).join('');
  }

  // Generates the complete HTML structure for tabs, including titles and panels
  static generateTabs(tabsData) {
    return (
      `
      <ul class="tabs__title-list" aria-labelledby="tabs-title" role="tablist">
        ${Tabs.generateTitles(tabsData)}
      </ul>
  
      <div class="tabs__panel-list" class="tabs__panels flow">
        ${Tabs.generatePanels(tabsData)}
      </div>
      `
    );
  }
}