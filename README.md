# Covalent Sales
Welcome to the Customer Resource Management Platform Project built using MERN (MongoDB, Express.js, React, Node.js) Stack. This project provides a full-featured and robust online customer resource management system with various functionalities.

Live App : https://frontent-covalent-sales.vercel.app/

## Features
### 0) Side Bar
  - Provides Side bar to navigate between different pages.
  
### 1) Dashboard
  - Showcase all the leads.
  - Leads count grouped by status, each record navigates user to leads by status page.
  - Filter leads dropdown to filter leads by their status.

### 2) Leads List
  - Showcase all the leads.
  - Lead record navigates user to Lead Management Page.
  - Multi-filter
    - Filter by status.
    - Filter by sales agent.
  - Multi-sort 
    - Sort by priority.
    - Sort by time to close.
    (if both sorts are selected then leads will be first sorted by priority, then the leads having equal priority will be then sorted by Time to close.)
    ** displays "Unknown" for sales agents that have been removed **
    
### 3) Lead Management
  - Details of selected Lead.
  - Option to edit selected Lead.
  - Showcase all the comments on that Lead along with the author, date and time.
  - Field to add a new comment.

### 4) Lead by Status
  - Showcase selected status.
  - Showcase all the leads that comes under selected status.
  - Multi-filter
    - Filter by sales sgent.
    - Filter by priority.
  - Sort by time to close.

### 5) Sales Agents
  - Lists all the sales agents with their name and email address.
  - Each record navigates user to leads by sales agent page.
  - Option to add a new sales agent.

### 6) Leads by Sales Agent
  - Lists all the leads assigned to that sales agent.
  - Multi-filter
    - Filter by status.
    - Filter by priority.
  - Sort by time to close.

### 7) Reports
  - Pie chart for Total leads in pipeline VS close leads.
  - Bar chart for leads closed by each agent.
  - Pir chart for leads by status.

### 8) Settings
  - Lists all the leads with button to delete each lead.
  - Lists all the sales agents with button to delete each sales agent.
