import { createSlice } from "@reduxjs/toolkit";
import sdeProblems from "/public/data/sdeProblems.json";

// Function to check if problems data needs updating
const needsDataUpdate = (savedProblems, currentProblems) => {
  if (!savedProblems || savedProblems.length !== currentProblems.length) return true;
  
  // Check if any new problems exist in current data
  return currentProblems.some(current => 
    !savedProblems.find(saved => 
      saved.id === current.id && 
      saved.title === current.title && 
      saved.difficulty === current.difficulty &&
      saved.category === current.category
    )
  );
};

// Function to merge saved progress with updated problem data
const mergeProblemsData = (savedProblems, currentProblems) => {
  return currentProblems.map(current => {
    const saved = savedProblems.find(s => s.id === current.id);
    if (saved) {
      return {
        ...current,
        status: saved.status || "Unsolved",
        attempts: saved.attempts || 0,
        lastAttempted: saved.lastAttempted || null,
        completedAt: saved.completedAt || null
      };
    }
    return {
      ...current,
      status: "Unsolved",
      attempts: 0,
      lastAttempted: null,
      completedAt: null
    };
  });
};

const getInitialState = () => {
  if (typeof window !== 'undefined') {
    const savedState = localStorage.getItem('sdeSheetState');
    if (savedState) {
      const parsedState = JSON.parse(savedState);
      
      // Check if data needs updating
      if (needsDataUpdate(parsedState.problems, sdeProblems.problems)) {
        const mergedProblems = mergeProblemsData(parsedState.problems, sdeProblems.problems);
        return {
          problems: mergedProblems,
          filteredProblems: mergedProblems,
          filters: parsedState.filters || {
            difficulty: "all",
            category: "all",
            status: "all",
            search: "",
            sortBy: "default"
          },
          stats: parsedState.stats || {
            totalSolved: 0,
            easy: 0,
            medium: 0,
            hard: 0,
            streak: 0,
            lastSolved: null,
            topicProgress: {}
          }
        };
      }
      return parsedState;
    }
  }
  
  return {
    problems: sdeProblems.problems.map(problem => ({
      ...problem,
      status: "Unsolved",
      attempts: 0,
      lastAttempted: null,
      completedAt: null
    })),
    filteredProblems: sdeProblems.problems,
    filters: {
      difficulty: "all",
      category: "all",
      status: "all",
      search: "",
      sortBy: "default"
    },
    stats: {
      totalSolved: 0,
      easy: 0,
      medium: 0,
      hard: 0,
      streak: 0,
      lastSolved: null,
      topicProgress: {}
    }
  };
};

const sdeSheetSlice = createSlice({
  name: "sdeSheet",
  initialState: getInitialState(),
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
      state.filteredProblems = filterAndSortProblems(state.problems, state.filters);
      saveToLocalStorage(state);
    },
    updateProblemStatus: (state, action) => {
      const { id, status } = action.payload;
      const now = new Date().toISOString();
      
      state.problems = state.problems.map(problem => {
        if (problem.id === id) {
          return {
            ...problem,
            status,
            attempts: problem.attempts + 1,
            lastAttempted: now,
            completedAt: status === 'Solved' ? now : problem.completedAt
          };
        }
        return problem;
      });
      
      state.filteredProblems = filterAndSortProblems(state.problems, state.filters);
      updateStats(state);
      saveToLocalStorage(state);
    },
    sortProblems: (state, action) => {
      state.filters.sortBy = action.payload;
      state.filteredProblems = filterAndSortProblems(state.problems, state.filters);
      saveToLocalStorage(state);
    }
  }
});

function filterAndSortProblems(problems, filters) {
  let filtered = problems.filter(problem => {
    const matchesDifficulty = filters.difficulty === "all" || 
      problem.difficulty.toLowerCase() === filters.difficulty;
    const matchesCategory = filters.category === "all" || 
      problem.category === filters.category;
    const matchesStatus = filters.status === "all" || 
      problem.status.toLowerCase() === filters.status;
    const matchesSearch = !filters.search || 
      problem.title.toLowerCase().includes(filters.search.toLowerCase());
    
    return matchesDifficulty && matchesCategory && matchesStatus && matchesSearch;
  });

  switch (filters.sortBy) {
    case 'difficulty':
      const difficultyOrder = { 'Easy': 1, 'Medium': 2, 'Hard': 3 };
      filtered.sort((a, b) => difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty]);
      break;
    case 'recent':
      filtered.sort((a, b) => new Date(b.lastAttempted || 0) - new Date(a.lastAttempted || 0));
      break;
    case 'attempts':
      filtered.sort((a, b) => b.attempts - a.attempts);
      break;
    default:
      // Keep original order
      break;
  }

  return filtered;
}

function updateStats(state) {
  const solved = state.problems.filter(p => p.status === "Solved");
  const now = new Date();
  const lastSolvedDate = new Date(state.stats.lastSolved || 0);
  const isConsecutiveDay = (
    lastSolvedDate.getDate() === now.getDate() - 1 &&
    lastSolvedDate.getMonth() === now.getMonth() &&
    lastSolvedDate.getFullYear() === now.getFullYear()
  );

  // Update topic progress
  const topicProgress = {};
  state.problems.forEach(problem => {
    if (!topicProgress[problem.category]) {
      topicProgress[problem.category] = { total: 0, solved: 0 };
    }
    topicProgress[problem.category].total++;
    if (problem.status === "Solved") {
      topicProgress[problem.category].solved++;
    }
  });

  state.stats = {
    totalSolved: solved.length,
    easy: solved.filter(p => p.difficulty === "Easy").length,
    medium: solved.filter(p => p.difficulty === "Medium").length,
    hard: solved.filter(p => p.difficulty === "Hard").length,
    streak: isConsecutiveDay ? state.stats.streak + 1 : 1,
    lastSolved: now.toISOString(),
    topicProgress
  };
}

function saveToLocalStorage(state) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('sdeSheetState', JSON.stringify(state));
  }
}

export const { setFilters, updateProblemStatus, sortProblems } = sdeSheetSlice.actions;
export default sdeSheetSlice.reducer;