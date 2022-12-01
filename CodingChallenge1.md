# Coding Challenge 1
## Scenario
You are developing an application that will show a list of companies along with company and employee details. You have all the data you need, but the data still needs to be retrieved and displayed for your users.

## Already Built
- [x] A table of all companies available at route `/` or `/companies`

## Requirements
- [ ] Clicking on a row of the companies table should navigate the user to that company's page.
  - [ ] The company’s page should be a view of a single company at the route `/companies/:companyId`.
  - [ ] View should show the metadata fields for the company (Segment, Region, and Industry).
  - [ ] View should show each department name in that company along with the number of employees in that department.
  - [ ] Per department, the view should include a list of every employee with avatar image, name, title, and country associated with that department.
  - [ ] Breadcrumbs should be updated to reflect the new route added.
- [ ] Somewhere of your choosing in the UI, the application should have the ability to edit the name of a company and save it to the database.

### Design
- UI does not need to be a work of art, but we expect any new UI to follow a similar design style to what already exists.
- UX will be evaluated. Specifically, we want to see if added elements are easy to use and make sense where they are placed.

## Getting Started
Refer to `README.md` to get the app up and running