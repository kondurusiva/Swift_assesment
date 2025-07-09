# Assignment Summary: React Dashboard

## Objective

Build a responsive React dashboard with:
- **Profile Screen** (first user from dummy API, read-only)
- **Comments Dashboard** (custom paginated/sortable/searchable table for 500 dummy comments)
- **Persistence** (search, sort, page, and page size preserved via local storage)
- **UI/UX** matching wireframes (see images), with enhancements permitted
- **Responsiveness** and **cross-browser support** (Edge, Firefox, Chrome)
- **Core logic** for pagination, sort, and search must be self-implemented

---

## Key Requirements

### 1. Project Setup
- React project (Create React App or similar)
- Routing between Profile & Dashboard

### 2. Profile Screen
- Fetch users from dummy API: `https://jsonplaceholder.typicode.com/users`
- Use only the **first user**
- Display: User ID, Name, Email, Address, Phone (see wireframe)
- Not editable, navigation back to dashboard

### 3. Comments Dashboard
- Fetch comments: `https://jsonplaceholder.typicode.com/comments` (500 records)
- Table displays: Post ID, Name, Email, Comment
- **Custom Pagination** (NOT using library):
  - Page sizes: 10, 50, 100
  - Current page, page size, and search state persisted in local storage
- **Custom Search** (partial, case-insensitive):
  - Search by name, email, comment
- **Custom Sorting**:
  - Columns: Post ID, Name, Email
  - Sort cycle: no sort → ascending → descending → no sort
  - Only one active sort
- **All state persisted**

### 4. UI/UX & Responsiveness
- Design matches wireframes (see image 1)
- Responsive for mobile and desktop
- Use **custom components** for table, pagination, and sort control

### 5. Code Quality
- Plain JavaScript (TypeScript optional)
- No core logic from UI/table libraries for pagination/sort/search
- Test on Edge, Firefox, Chrome

---

## Dummy APIs

- **Users**: https://jsonplaceholder.typicode.com/users
- **Comments**: https://jsonplaceholder.typicode.com/comments

---

## Example Wireframes

![image1](image1)

---

## Evaluation Criteria

- Complete requirement coverage
- Clean, correct implementation of search, sort, and pagination logic
- UI/UX quality and wireframe adherence (with enhancements permitted)
- Responsiveness and mobile optimization
- Routing and navigation
- Persistence of filters/sort/page
- Cross-browser functionality
- Use of custom/self-implemented components for core logic

---

## Next Steps

If you need a file/folder structure or starter code, let me know!