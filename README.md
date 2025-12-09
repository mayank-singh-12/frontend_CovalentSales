# Covalent Sales

A Full stack Customer Resource Management App with the structured workflow of lead management, including sales agent assignment, comments for tracking progress, and reporting features based on leads, status, and sales representatives.

Built with React frontend,Chartjs charts, Express/Node backend and MongoDB database.

---

# Demo Link

[Live Demo](https://frontent-covalent-sales.vercel.app/)

---

# Quick Start

```
git clone https://github.com/mayank-singh-12/frontend_CovalentSales.git
cd frontend_CovalentSales
npm install
npm run dev
```

---

# Technologies

- React
- React Router
- React-Toastify
- React-Chartjs-2
- Node.js
- Express.js
- MongoDB
- Mongoose
- Bootstrap
- CSS

---

Watch a walkthrough (5 minutes 45 seconds) to walk through major features of this app: <br>
[YouTube Video](https://youtu.be/3cj1JVqXiuM)

---

## Features
**Side Bar**

- Provides Side bar to navigate between different pages.

**Dashboard**

- Showcase all the leads.
- Leads count grouped by status, each record navigates user to leads by status page.
- Filter leads dropdown to filter leads by their status.

**Leads List**

- Showcase all the leads.
  > Displays "Unknown" for sales agents that have been removed.
- Lead record navigates user to Lead Management Page.
- Multi-filter
  - Filter by status.
  - Filter by sales agent.
- Multi-sort
  - Sort by priority.
  - Sort by time to close.
    > (if both sorts are selected then leads will be first sorted by priority, then the leads having equal priority will be then sorted by Time to close.)<br>

**Lead Management**

- Details of selected Lead.
- Option to edit selected Lead.
- Showcase all the comments on that Lead along with the author, date and time.
- Field to add a new comment.

**Lead by Status**

- Showcase selected status.
- Showcase all the leads that comes under selected status.
- Multi-filter
  - Filter by sales sgent.
  - Filter by priority.
- Sort by time to close.

**Sales Agents**

- Lists all the sales agents with their name and email address.
- Each record navigates user to leads by sales agent page.
- Option to add a new sales agent.

**Leads by Sales Agent**

- Lists all the leads assigned to that sales agent.
- Multi-filter
  - Filter by status.
  - Filter by priority.
- Sort by time to close.

**Reports**

- Pie chart for Total leads in pipeline VS close leads.
- Bar chart for leads closed by each agent.
- Pir chart for leads by status.

**Settings**

- Lists all the leads with button to delete each lead.
- Lists all the sales agents with button to delete each sales agent.

---

## API Reference

Link to Backend Repo:
[API Repo](https://github.com/mayank-singh-12/backend_CovalentSales.git)

## Base API: https://backend-covalent-sales.vercel.app/

### GET /leads

Get all leads.<br>
Sample response:

```
[
  {
    _id: ...,
    name: ...,
    source: ...,
    salesAgent: { _id: ..., name: ..., email: ..., createdAt: ... },
    status: ...,
    tags: [...],
    timeToClose: ...,
    priority: ...,
    createdAt: ...,
    updatedAt: ...,
    closedAt: ...,
  }, ...
]
```

### GET /leads/:id

Get details for a lead.<br>
Sample response:

```
{
  _id: ...,
  name: ...,
  source: ...,
  salesAgent: { _id: ..., name: ..., email: ..., createdAt: ... },
  status: ...,
  tags: [...],
  timeToClose: ...,
  priority: ...,
  createdAt: ...,
  updatedAt: ...,
  closedAt: ...,
}

```

### GET /leads/:id/comments

Get all comments for a lead.<br>
Sample response:

```
[
  {
    _id: ...,
    lead: ...,
    author: ...,
    commentText: ...,
    createdAt: ...
  }, ...
]
```

### GET /tags

Get all tags.<br>
Sample response:

```
[
  {
    _id: ...,
    name: ...,
    createdAt: ...,
  }, ...
]
```

### GET /agents

Get all leads.<br>
Sample response:

```
[
  {
    _id: ...,
    name: ...,
    email: ...,
    createdAt: ...
  }, ...
]
```

### GET /agents/:id

Get an agent.<br>
Sample response:

```
{
    _id: ...,
    name: ...,
    email: ...,
    createdAt: ...
}
```

### GET /report/last-week

Get leads that were closed last week.<br>
Sample response:

```
[
  {
    _id: ...,
    name: ...,
    source: ...,
    salesAgent: { _id: ..., name: ..., email: ..., createdAt: ... },
    status: Closed,
    tags: [...],
    timeToClose: ...,
    priority: ...,
    createdAt: ...,
    updatedAt: ...,
    closedAt: ...,
  }, ...
]
```

### GET /report/pipeline

Get count of leads that are still in pipeline.

```
{ totalLeadsInPipeline: ... }
```

### POST /leads

Create a new lead.<br>
Sample response:

```
{
  _id: ...,
  name: ...,
  source: ...,
  salesAgent: { _id: ..., name: ..., email: ..., createdAt: ... },
  status: Closed,
  tags: [...],
  timeToClose: ...,
  priority: ...,
  createdAt: ...,
  updatedAt: ...,
  closedAt: ...,
}
```

### POST /leads/:id/update

Update a lead.<br>
Sample response:

```
{
  _id: ...,
  name: ...,
  source: ...,
  salesAgent: { _id: ..., name: ..., email: ..., createdAt: ... },
  status: ...,
  tags: [...],
  timeToClose: ...,
  priority: ...,
  createdAt: ...,
  updatedAt: ...,
  closedAt: ...,
}
```

### POST /agents

Create a new agent.<br>
Sample response:

```
{
  message: "New Agent added!",
  newAgent: { _id: ..., name: ..., email: ..., createdAt: ... }
}
```

### POST /tags

Add a new tag.<br>
Sample response:

```
{
  _id: ...,
  name: ...,
  createdAt: ...,
}
```

### POST /leads/:id/comments

Add new comment to a lead.<br>
Sample response:

```
{
  message: "Comment added successfully!",
  comment: { _id: ..., lead: ..., author: ..., commentText: ..., createdAt: ... }
}
```

### DELETE /leads/:id

Delete a lead.<br>
Sample response:

```
{ message: "Lead deleted successfully." }
```

### DELETE /agents/:id

Delete a sales agent.<br>
Sample response:

```
{ message: "Sales Agent deleted successfully!" }
```

---

For bugs or feature request, please reach out to dev.by.mayank@gmail.com
