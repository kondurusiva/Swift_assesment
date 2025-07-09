import React, { useEffect, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

// Custom hook for localStorage persistence
function usePersistedState(key, initial) {
  const [state, setState] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);
  return [state, setState];
}

const PAGE_SIZE_OPTIONS = [10, 50, 100];

export default function DashboardPage() {
  const [comments, setComments] = useState([]);
  const [search, setSearch] = usePersistedState("search", "");
  const [sortBy, setSortBy] = usePersistedState("sortBy", null);
  const [sortOrder, setSortOrder] = usePersistedState("sortOrder", null);
  const [page, setPage] = usePersistedState("page", 1);
  const [pageSize, setPageSize] = usePersistedState("pageSize", 10);

  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/comments")
      .then((res) => res.json())
      .then(setComments);
  }, []);

  // Custom sort logic per requirement
  function handleSort(column) {
    if (sortBy !== column) {
      setSortBy(column);
      setSortOrder("asc");
    } else if (sortOrder === "asc") {
      setSortOrder("desc");
    } else if (sortOrder === "desc") {
      setSortBy(null);
      setSortOrder(null);
    } else {
      setSortOrder("asc");
    }
    setPage(1);
  }

  // Filtering, sorting, and slicing for pagination
  const filteredData = useMemo(() => {
    let data = comments;
    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(q) ||
          item.email.toLowerCase().includes(q) ||
          item.body.toLowerCase().includes(q)
      );
    }
    if (sortBy && sortOrder) {
      data = [...data].sort((a, b) => {
        let v1 = a[sortBy];
        let v2 = b[sortBy];
        if (typeof v1 === "string") v1 = v1.toLowerCase();
        if (typeof v2 === "string") v2 = v2.toLowerCase();
        if (v1 < v2) return sortOrder === "asc" ? -1 : 1;
        if (v1 > v2) return sortOrder === "asc" ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [comments, search, sortBy, sortOrder]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const pagedData = filteredData.slice((page - 1) * pageSize, page * pageSize);

  function handlePageChange(newPage) {
    if (newPage < 1 || newPage > totalPages) return;
    setPage(newPage);
  }

  function handlePageSizeChange(e) {
    setPageSize(Number(e.target.value));
    setPage(1);
  }

  return (
    <div className="dashboard-wrapper">
      <div className="navbar">
        <div className="logo"><img alt="logo" src="https://res.cloudinary.com/dfll49x4h/image/upload/v1752037272/swift_logo.png"/></div>
        <div className="profile-initials" onClick={() => navigate("/profile")}>EH</div>
      </div>
      <div className="dashboard-content">
        <div className="dashboard-controls">
          <button onClick={() => handleSort("postId")}>
            Sort Post ID {sortBy === "postId" ? (sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "") : ""}
          </button>
          <button onClick={() => handleSort("name")}>
            Sort Name {sortBy === "name" ? (sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "") : ""}
          </button>
          <button onClick={() => handleSort("email")}>
            Sort Email {sortBy === "email" ? (sortOrder === "asc" ? "▲" : sortOrder === "desc" ? "▼" : "") : ""}
          </button>
          <input
            className="search-input"
            placeholder="Search name, email, comment"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
          />
        </div>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th>Post ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Comment</th>
              </tr>
            </thead>
            <tbody>
              {pagedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.postId}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.body.slice(0, 40)}...</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pagination-controls">
          <span>
            Page{" "}
            <select value={page} onChange={e => handlePageChange(Number(e.target.value))}>
              {Array.from({ length: totalPages }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>{" "}
            of {totalPages}
          </span>
          <span>
            | Rows per page:{" "}
            <select value={pageSize} onChange={handlePageSizeChange}>
              {PAGE_SIZE_OPTIONS.map(sz => (
                <option key={sz} value={sz}>{sz}</option>
              ))}
            </select>
          </span>
          <span style={{ marginLeft: 12 }}>
            <button disabled={page === 1} onClick={() => handlePageChange(page - 1)}>Previous</button>
            <button disabled={page === totalPages} onClick={() => handlePageChange(page + 1)}>Next</button>
          </span>
        </div>
      </div>
    </div>
  );
}
