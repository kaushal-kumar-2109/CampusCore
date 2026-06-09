import { useState, useEffect } from "react";
import {
  notifySuccess,
  notifyError,
  notifyInfo,
} from "../../utils/notification.js";

import Sidebar from "../../components/admin/Sidebar";
import TopNavbar from "../../components/admin/TopNavbar";
import StudentCard from "../../components/admin/studentManagement/studentCard.jsx";

import { getStudentsData } from "../../api/controller/admin.controller.js";

import "../../styles/admin/admin.css";
import "../../styles/theam.css";

const StudentHandle = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [studentsData, setStudentsData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");
  const [semesterFilter, setSemesterFilter] = useState("All");
  const [batchYearFilter, setBatchYearFilter] = useState("All");

  const [currentPage, setCurrentPage] = useState(1);
  const [totalStudents, setTotalStudents] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(false);

  const studentsPerPage = 10;

  const getAllStudentsData = async () => {
    notifyInfo("Fetching data from server...");
    setLoading(true);
    const tokenData = JSON.parse(localStorage.getItem("CampusCoreData"));
    const filters = {
      token: tokenData.token,
      page: currentPage,
      limit: studentsPerPage,
      search: debouncedSearch,
      status: statusFilter,
      semester: semesterFilter,
      batchYear: batchYearFilter,
    };

    const response = await getStudentsData(filters);

    if (response.status === 200) {
      notifySuccess("fetch successful!");
      setStudentsData(response.data.data || []);
      setTotalStudents(response.data.pagination.totalStudents || 0);
      setTotalPages(response.data.pagination.totalPages || 1);
    } else {
      notifyError("Error in fetching data!");
      notifyError(response.data.message || "Failed to fetch students data");
    }

    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchText);
      setCurrentPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchText]);

  useEffect(() => {
    getAllStudentsData();
  }, [
    currentPage,
    debouncedSearch,
    statusFilter,
    semesterFilter,
    batchYearFilter,
  ]);

  const handleStatusChange = (value) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleSemesterChange = (value) => {
    setSemesterFilter(value);
    setCurrentPage(1);
  };

  const handleBatchYearChange = (value) => {
    setBatchYearFilter(value);
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setSearchText("");
    setDebouncedSearch("");
    setStatusFilter("All");
    setSemesterFilter("All");
    setBatchYearFilter("All");
    setCurrentPage(1);
  };

  const semesters = [1, 2, 3, 4, 5, 6, 7, 8];

  const batchYears = [];
  for (let year = 2026; year >= 2012; year--) {
    batchYears.push(year);
  }

  return (
    <div className="admin-layout">
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={() => setIsSidebarOpen(false)}
      />

      <main className="admin-main">
        <TopNavbar
          title={"Student Management"}
          openSidebar={() => setIsSidebarOpen(true)}
        />

        <section className="admin-page-content">
          
          <div className="student-filter-bar">
            <input
              type="text"
              placeholder="Search name, email, number, roll no..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
            />

            <select
              value={statusFilter}
              onChange={(e) => handleStatusChange(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
              <option value="Suspended">Suspended</option>
              <option value="Graduated">Graduated</option>
              <option value="Dropped">Dropped</option>
            </select>

            <select
              value={semesterFilter}
              onChange={(e) => handleSemesterChange(e.target.value)}
            >
              <option value="All">All Semesters</option>

              {semesters.map((semester) => (
                <option key={semester} value={semester}>
                  Semester {semester}
                </option>
              ))}
            </select>

            <select
              value={batchYearFilter}
              onChange={(e) => handleBatchYearChange(e.target.value)}
            >
              <option value="All">All Years</option>

              {batchYears.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>

            <button className="reset-filter-btn" onClick={resetFilters}>
              Reset
            </button>
          </div>

          <div className="student-result-info">
            Showing {studentsData.length} of {totalStudents} students
          </div>

          {loading ? (
            <div className="student-loading-box">
              Loading students...
            </div>
          ) : studentsData.length > 0 ? (
            studentsData.map((student, index) => (
              <StudentCard
                key={student._id || index}
                student={student}
              />
            ))
          ) : (
            <div className="no-students-found">
              No students found
            </div>
          )}

          {totalPages > 1 && (
            <div className="pagination">
              <button
                disabled={currentPage === 1 || loading}
                onClick={() => setCurrentPage((prev) => prev - 1)}
              >
                Previous
              </button>

              <span>
                Page {currentPage} of {totalPages}
              </span>

              <button
                disabled={currentPage === totalPages || loading}
                onClick={() => setCurrentPage((prev) => prev + 1)}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default StudentHandle;